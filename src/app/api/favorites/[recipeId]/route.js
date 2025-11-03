import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * @fileoverview
 * Route API **GET /api/favorites/[recipeId]** — Vérifie si une recette donnée
 * est présente dans les favoris de l'utilisateur connecté.
 *
 * **Fonctionnement :**
 * - Requiert une session NextAuth valide
 * - Recherche un document correspondant dans la collection `favorites`
 * - Retourne `favorite: true` si trouvé, sinon `favorite: false`
 *
 * **Authentification requise :**
 * ✅ Oui — l'utilisateur doit être connecté
 *
 * **Base de données :**
 * - Collection MongoDB : `favorites`
 * - Filtrée par :
 *   ```json
 *   {
 *     "userId": ObjectId,
 *     "recipeId": ObjectId
 *   }
 *   ```
 *
 * **Réponses possibles :**
 * - ✅ 200 : `{ favorite: true | false }`
 * - ⚠️ 401 : `{ favorite: false }` → utilisateur non connecté
 * - ❌ 500 : `Erreur serveur` (via `catch`)
 */

/**
 * Vérifie si une recette est dans les favoris de l'utilisateur connecté.
 *
 * @async
 * @function GET
 * @param {Request} req - Requête HTTP entrante
 * @param {{ params: { recipeId: string } }} context - Contexte de la route (paramètres dynamiques)
 * @returns {Promise<Response>} Réponse JSON indiquant l’état du favori (`favorite: true | false`)
 *
 * @example
 * ```js
 * // Exemple d'appel client
 * const res = await fetch(`/api/favorites/${recipeId}`);
 * const data = await res.json();
 * console.log(data.favorite); // true ou false
 * ```
 */
export async function GET(req, { params }) {
  try {
    // Vérification de la session utilisateur
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ favorite: false }), { status: 401 });
    }

    // Récupération du paramètre dynamique [recipeId]
    const { recipeId } = await params;

    // Connexion à MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Recherche du favori correspondant
    const found = await db.collection("favorites").findOne({
      userId: new ObjectId(session.user.id),
      recipeId: new ObjectId(recipeId),
    });

    // Retour du statut de favori
    return new Response(JSON.stringify({ favorite: !!found }), { status: 200 });
  } catch (err) {
    console.error("Erreur /api/favorites/[recipeId] :", err);
    return new Response("Erreur serveur", { status: 500 });
  }
}
