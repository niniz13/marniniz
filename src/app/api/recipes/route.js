import clientPromise from "@/lib/mongodb";

function parseTime(timeStr) {
  if (!timeStr) return null;
  const matchHr = timeStr.match(/(\d+)\s*hr/i);
  const hours = matchHr ? parseInt(matchHr[1]) : 0;
  const matchMin = timeStr.match(/(\d+)\s*min/i);
  const mins = matchMin ? parseInt(matchMin[1]) : 0;
  return hours * 60 + mins;
}

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { searchParams } = new URL(req.url);

    // Pagination
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    // Filtres
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

    if (name) filter.strMeal = { $regex: name, $options: "i" };
    if (difficulty) filter.strDifficulty = difficulty;
    if (subCategory) filter.strSubCategory = subCategory;

    const allRecipes = await db.collection("recipes").find(filter).toArray();

    const filteredRecipes = allRecipes.filter((r) => {
      const ingredientCount = Array.isArray(r.strIngredients)
        ? r.strIngredients.filter((ing) => ing && ing.trim() !== "").length
        : 0;

      if (minIngredients && ingredientCount < minIngredients) return false;
      if (maxIngredients && ingredientCount > maxIngredients) return false;

      const prep = parseTime(r.strPrepTime);
      const cook = parseTime(r.strCookTime);

      if (prepTimeMin && (prep === null || prep < prepTimeMin)) return false;
      if (prepTimeMax && (prep === null || prep > prepTimeMax)) return false;
      if (cookTimeMin && (cook === null || cook < cookTimeMin)) return false;
      if (cookTimeMax && (cook === null || cook > cookTimeMax)) return false;

      // Filtre nutrition
      if (nutritionKey && !isNaN(nutritionValue) && r.strNutrition) {
        let rawVal = r.strNutrition[nutritionKey];
        if (!rawVal || typeof rawVal !== "string") return false;

        rawVal = rawVal.replace(/[^\d.-]/g, ""); // Supprime g, kcal, etc.
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

    // Pagination
    const totalRecipes = filteredRecipes.length;
    const totalPages = Math.ceil(totalRecipes / limit);
    const paginatedRecipes = filteredRecipes.slice(skip, skip + limit);

    const recipesWithStringId = paginatedRecipes.map((r) => ({
      ...r,
      _id: r._id.toString(),
    }));

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
