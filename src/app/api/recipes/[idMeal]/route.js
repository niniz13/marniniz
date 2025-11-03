import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * @fileoverview
 * Route API **GET /api/recipes/[idMeal]** — Récupère une recette unique selon son identifiant MongoDB.
 *
 * Cette route permet de récupérer les détails d’une recette spécifique depuis la base de données
 * (`recipes_fr` ou `recipes_en` selon la locale).
 *
 * **Paramètres requis :**
 * - `idMeal` *(paramètre dynamique)* → identifiant MongoDB de la recette
 * - `locale` *(query param facultatif)* → "fr" (par défaut) ou "en"
 *
 * **Collections MongoDB :**
 * - `recipes_fr`
 * - `recipes_en`
 *
 * **Codes de réponse :**
 * - ✅ 200 : recette trouvée → retourne un objet complet
 * - ⚠️ 400 : `id manquant` → paramètre absent ou invalide
 * - ⚠️ 404 : `Recette non trouvée` → aucun document correspondant
 * - ❌ 500 : `Erreur serveur` → problème interne (Mongo ou autre)
 */

/**
 * Récupère une recette unique à partir de son identifiant MongoDB.
 *
 * @async
 * @function GET
 * @param {Request} req - Requête HTTP entrante (contenant la locale dans l’URL)
 * @param {{ params: { idMeal: string } }} context - Contexte de la route Next.js, contenant l'identifiant dynamique
 * @returns {Promise<Response>} Objet JSON représentant la recette, ou un message d’erreur
 *
 * @example
 * ```js
 * // Exemple de requête côté client
 * const res = await fetch("/api/recipes/6717abc123?locale=en");
 * if (res.ok) {
 *   const recipe = await res.json();
 *   console.log(recipe.strMeal); // Nom de la recette
 * }
 * ```
 */
export async function GET(req, context) {
  try {
    // Extraction des paramètres dynamiques et de la locale
    const params = await context.params;
    const { idMeal } = params;

    const url = new URL(req.url);
    const locale = url.searchParams.get("locale") || "fr";

    // --- Vérification des paramètres ---
    if (!idMeal) {
      return new Response(JSON.stringify({ message: "id manquant" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // --- Connexion MongoDB ---
    const client = await clientPromise;
    const db = client.db();

    // Choix de la collection selon la locale
    const collectionName = locale === "en" ? "recipes_en" : "recipes_fr";

    // Recherche de la recette par ObjectId
    const recipe = await db
      .collection(collectionName)
      .findOne({ _id: new ObjectId(idMeal) });

    // --- Si la recette n’existe pas ---
    if (!recipe) {
      return new Response(JSON.stringify({ message: "Recette non trouvée" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // --- Réponse OK ---
    return new Response(JSON.stringify(recipe), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Erreur API /recipes/[idMeal] :", err);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
