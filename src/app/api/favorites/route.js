import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * @fileoverview
 * Route API **POST /api/favorites** — Gestion des favoris utilisateur pour MealMind.
 *
 * Cette route permet de **basculer (toggle)** une recette en favori pour l'utilisateur connecté :
 * - Si la recette est déjà dans les favoris → elle est **supprimée**
 * - Sinon → elle est **ajoutée**
 *
 * **Authentification requise :**
 * - L'utilisateur doit être connecté via NextAuth (session valide)
 *
 * **Base de données :**
 * - Collection MongoDB : `favorites`
 * - Structure du document :
 *   ```json
 *   {
 *     "_id": ObjectId,
 *     "userId": ObjectId,
 *     "recipeId": ObjectId,
 *     "createdAt": Date
 *   }
 *   ```
 *
 * **Réponses possibles :**
 * - ✅ 200 : `{ favorite: true }` → favori ajouté
 * - ✅ 200 : `{ favorite: false }` → favori supprimé
 * - ⚠️ 400 : `recipeId manquant` → corps de requête invalide
 * - ⚠️ 401 : `Non autorisé` → utilisateur non connecté
 * - ❌ 500 : `Erreur serveur` → problème interne ou MongoDB
 */

/**
 * Gère la méthode HTTP **POST** pour l’ajout ou la suppression d’un favori.
 *
 * @async
 * @function POST
 * @param {Request} req - Requête HTTP contenant l'identifiant de la recette (`recipeId`)
 * @returns {Promise<Response>} Réponse HTTP JSON indiquant l’état du favori (`favorite: true/false`)
 *
 * @example
 * ```js
 * // Exemple de requête côté client
 * await fetch("/api/favorites", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify({ recipeId: "65fdabc123..." })
 * });
 * ```
 */
export async function POST(req) {
  try {
    // Vérification de la session utilisateur
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
      return new Response("Non autorisé", { status: 401 });

    // Extraction du recipeId depuis le corps JSON
    const { recipeId } = await req.json();
    if (!recipeId) return new Response("recipeId manquant", { status: 400 });

    // Connexion à MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Conversion en ObjectId
    const userId = new ObjectId(session.user.id);
    const recipeObjectId = new ObjectId(recipeId);

    // Vérifie si la recette est déjà dans les favoris
    const existing = await db
      .collection("favorites")
      .findOne({ userId, recipeId: recipeObjectId });

    if (existing) {
      // Si déjà en favori → suppression
      await db.collection("favorites").deleteOne({ _id: existing._id });
      return new Response(JSON.stringify({ favorite: false }), { status: 200 });
    } else {
      // Sinon → ajout du favori
      await db.collection("favorites").insertOne({
        userId,
        recipeId: recipeObjectId,
        createdAt: new Date(),
      });
      return new Response(JSON.stringify({ favorite: true }), { status: 200 });
    }
  } catch (err) {
    console.error("Erreur /api/favorites :", err);
    return new Response("Erreur serveur", { status: 500 });
  }
}
