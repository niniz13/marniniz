import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * @fileoverview
 * Route API **GET /api/user/favorites** — Récupère la liste des recettes
 * favorites de l’utilisateur actuellement connecté.
 *
 * Cette route :
 * - vérifie que l’utilisateur est authentifié via `next-auth`
 * - récupère ses favoris depuis la collection `favorites`
 * - renvoie les recettes correspondantes selon la locale demandée (`fr` ou `en`)
 *
 * **Paramètres de requête :**
 * - `locale` *(string, optionnel)* — Définit la langue des recettes (par défaut : `"fr"`)
 *
 * **Collections utilisées :**
 * - `favorites` → contient les ID de recettes marquées par l’utilisateur
 * - `recipes_fr` / `recipes_en` → collections de recettes localisées
 *
 * **Codes de réponse :**
 * - ✅ 200 : `{ recipes: [...] }` → Liste des recettes favorites
 * - ⚠️ 401 : `"Non autorisé"` → utilisateur non connecté
 * - ❌ 500 : `"Erreur serveur"`
 */

/**
 * Récupère les recettes favorites de l’utilisateur connecté.
 *
 * @async
 * @function GET
 * @param {Request} req - Requête HTTP, contenant la locale en query string (ex: `?locale=en`)
 * @returns {Promise<Response>} Réponse JSON avec les recettes favorites ou un message d’erreur
 *
 * @example
 * ```js
 * // Exemple d'appel côté client
 * const res = await fetch("/api/user/favorites?locale=fr", {
 *   credentials: "include",
 * });
 *
 * if (res.ok) {
 *   const data = await res.json();
 *   console.log("Recettes favorites :", data.recipes);
 * }
 * ```
 */
export async function GET(req) {
  try {
    // Vérifie la session active
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
      return new Response("Non autorisé", { status: 401 });

    const client = await clientPromise;
    const db = client.db();

    // Récupère la locale (ex: /api/user/favorites?locale=en)
    const url = new URL(req.url);
    const locale = url.searchParams.get("locale") || "fr";

    // Sélectionne la bonne collection de recettes
    const collectionName = locale === "en" ? "recipes_en" : "recipes_fr";

    // Récupère les favoris liés à l'utilisateur
    const favorites = await db
      .collection("favorites")
      .find({ userId: new ObjectId(session.user.id) })
      .toArray();

    // Aucun favori : retourne un tableau vide
    if (favorites.length === 0) {
      return new Response(JSON.stringify({ recipes: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Extrait les IDs de recettes
    const recipeIds = favorites.map((f) => f.recipeId);

    // Recherche les recettes correspondantes dans la collection localisée
    const recipes = await db
      .collection(collectionName)
      .find({ _id: { $in: recipeIds } })
      .toArray();

    // Renvoie la réponse complète
    return new Response(JSON.stringify({ recipes }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Erreur API /user/favorites :", err);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
