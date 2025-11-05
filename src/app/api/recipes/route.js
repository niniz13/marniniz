import clientPromise from "@/lib/mongodb";

/**
 * @fileoverview
 * Route API **GET /api/recipes** — Récupère la liste des recettes filtrées et paginées.
 *
 * Cette route interroge la base MongoDB (`recipes_fr` ou `recipes_en`) en fonction de la locale
 * et applique une série de filtres dynamiques envoyés depuis le front :
 * - **Nom de recette**, **difficulté**, **sous-catégorie**
 * - **Nombre d’ingrédients** min/max
 * - **Temps de préparation / cuisson** min/max
 * - **Valeurs nutritionnelles** (par opérateur : lt, gt, eq)
 *
 * Elle retourne les résultats paginés (12 recettes par page par défaut).
 *
 * **Collections MongoDB :**
 * - `recipes_fr` : données localisées en français
 * - `recipes_en` : données localisées en anglais
 *
 * **Réponses :**
 * - ✅ 200 : `{ recipes, totalPages, currentPage }`
 * - ❌ 500 : `{ message: "Erreur serveur" }`
 *
 * @see Utilisée par la page /recipes du front MealMind
 */

/**
 * Convertit une chaîne de durée (ex: `"1 hr 20 min"`) en nombre total de minutes.
 *
 * @param {string} timeStr - Chaîne indiquant le temps ("1 hr", "45 min", etc.)
 * @returns {number|null} Temps total en minutes, ou `null` si la valeur est invalide
 */
function parseTime(timeStr) {
  if (!timeStr) return null;
  const matchHr = timeStr.match(/(\d+)\s*hr/i);
  const hours = matchHr ? parseInt(matchHr[1]) : 0;
  const matchMin = timeStr.match(/(\d+)\s*min/i);
  const mins = matchMin ? parseInt(matchMin[1]) : 0;
  return hours * 60 + mins;
}

/**
 * Supprime les accents d'une chaîne pour permettre une recherche accent-insensible.
 *
 * @param {string} str - Chaîne à normaliser
 * @returns {string} Chaîne sans accents
 */
function normalizeString(str) {
  return str
    .normalize("NFD") // décompose les lettres accentuées (é → e +  ́)
    .replace(/[\u0300-\u036f]/g, ""); // supprime les diacritiques
}

/**
 * Récupère les recettes depuis MongoDB selon les filtres et la pagination.
 *
 * @async
 * @function GET
 * @param {Request} req - Requête HTTP contenant les paramètres de recherche dans l'URL
 * @returns {Promise<Response>} Liste paginée de recettes filtrées au format JSON
 *
 * @example
 * ```js
 * // Exemple d'appel côté client
 * const res = await fetch("/api/recipes?locale=fr&page=2&difficulty=Easy");
 * const data = await res.json();
 * console.log(data.recipes);
 * ```
 */
export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { searchParams } = new URL(req.url);

    /** @type {string} Locale de la requête (fr ou en) */
    const locale = searchParams.get("locale") || "fr";
    const collectionName = locale === "en" ? "recipes_en" : "recipes_fr";

    // --- Pagination ---
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    // --- Filtres de recherche ---
    const name = searchParams.get("name");
    const difficulty = searchParams.get("difficulty");
    const subCategory = searchParams.get("subCategory");
    const minIngredients = parseInt(searchParams.get("minIngredients"));
    const maxIngredients = parseInt(searchParams.get("maxIngredients"));
    const prepTimeMin = parseInt(searchParams.get("prepTimeMin"));
    const prepTimeMax = parseInt(searchParams.get("prepTimeMax"));
    const cookTimeMin = parseInt(searchParams.get("cookTimeMin"));
    const cookTimeMax = parseInt(searchParams.get("cookTimeMax"));
    const nutritionKey = searchParams.get("nutritionKey");
    const nutritionOp = searchParams.get("nutritionOp");
    const nutritionValue = parseFloat(searchParams.get("nutritionValue"));

    const filter = {};
    if (difficulty) filter.strDifficulty = difficulty;
    if (subCategory) filter.strSubCategory = subCategory;

    // --- Récupération initiale ---
    const allRecipes = await db
      .collection(collectionName)
      .find(filter)
      .toArray();

    // --- Filtrage avancé en mémoire (y compris accent-insensible) ---
    const filteredRecipes = allRecipes.filter((r) => {
      // --- Nom de recette ---
      if (name) {
        const searchNorm = normalizeString(name.toLowerCase());
        const recipeNameNorm = normalizeString((r.strMeal || "").toLowerCase());
        if (!recipeNameNorm.includes(searchNorm)) return false;
      }

      // --- Ingrédients ---
      const ingredientCount = Array.isArray(r.strIngredients)
        ? r.strIngredients.filter((ing) => ing && ing.trim() !== "").length
        : 0;

      if (minIngredients && ingredientCount < minIngredients) return false;
      if (maxIngredients && ingredientCount > maxIngredients) return false;

      // --- Temps de préparation / cuisson ---
      const prep = parseTime(r.strPrepTime);
      const cook = parseTime(r.strCookTime);

      if (prepTimeMin && (prep === null || prep < prepTimeMin)) return false;
      if (prepTimeMax && (prep === null || prep > prepTimeMax)) return false;
      if (cookTimeMin && (cook === null || cook < cookTimeMin)) return false;
      if (cookTimeMax && (cook === null || cook > cookTimeMax)) return false;

      // --- Filtrage nutritionnel ---
      if (nutritionKey && !isNaN(nutritionValue) && r.strNutrition) {
        let rawVal = r.strNutrition[nutritionKey];
        if (!rawVal || typeof rawVal !== "string") return false;

        rawVal = rawVal.replace(/[^\d.-]/g, ""); // Supprime les unités (g, kcal, etc.)
        const numericVal = parseFloat(rawVal);
        if (isNaN(numericVal)) return false;

        switch (nutritionOp) {
          case "lt":
            if (numericVal >= nutritionValue) return false;
            break;
          case "gt":
            if (numericVal <= nutritionValue) return false;
            break;
          case "eq":
            if (numericVal !== nutritionValue) return false;
            break;
        }
      }

      return true;
    });

    // --- Pagination finale ---
    const totalRecipes = filteredRecipes.length;
    const totalPages = Math.ceil(totalRecipes / limit);
    const paginatedRecipes = filteredRecipes.slice(skip, skip + limit);

    const recipesWithStringId = paginatedRecipes.map((r) => ({
      ...r,
      _id: r._id.toString(),
    }));

    // --- Réponse ---
    return new Response(
      JSON.stringify({
        recipes: recipesWithStringId,
        totalPages,
        currentPage: page,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Erreur API /recipes :", err);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
