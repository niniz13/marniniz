import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * @fileoverview
 * Route API **DELETE /api/user/delete-account** — Supprime définitivement le compte utilisateur
 * et toutes les données associées (favoris, comptes OAuth, etc.) de la base MongoDB.
 *
 * Cette route est sécurisée et nécessite une session active via `next-auth`.
 *
 * **Suppression en cascade :**
 * - Collection `users` → suppression du document utilisateur
 * - Collection `favorites` → suppression des favoris liés
 * - Collection `accounts` → suppression des comptes OAuth liés
 *
 * **Codes de réponse :**
 * - ✅ 200 : "User and related data deleted"
 * - ⚠️ 401 : "Unauthorized" → utilisateur non connecté
 * - ⚠️ 404 : "User not found" → aucun utilisateur trouvé avec cet email
 * - ❌ 500 : "Internal Server Error" → erreur MongoDB ou autre
 *
 * **⚠️ Cette opération est irréversible.**
 */

/**
 * Supprime l'utilisateur connecté et toutes ses données liées.
 *
 * @async
 * @function DELETE
 * @returns {Promise<Response>} Réponse HTTP avec message de confirmation ou d'erreur
 *
 * @example
 * ```js
 * // Exemple côté client :
 * const res = await fetch("/api/user/delete-account", {
 *   method: "DELETE",
 *   credentials: "include",
 * });
 *
 * if (res.ok) {
 *   console.log("Compte supprimé !");
 *   // Rediriger l'utilisateur vers la page d'accueil ou de déconnexion
 * } else {
 *   const message = await res.text();
 *   console.error("Erreur :", message);
 * }
 * ```
 */
export async function DELETE() {
  // Vérifie si l'utilisateur est authentifié
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  try {
    const client = await clientPromise;
    const db = client.db();

    // Recherche de l'utilisateur via son email (issu de la session)
    const user = await db
      .collection("users")
      .findOne({ email: session.user.email }, { projection: { _id: 1 } });

    if (!user?._id) {
      return new Response("User not found", { status: 404 });
    }

    const userObjectId = new ObjectId(user._id);

    // Suppression en cascade : favoris, comptes OAuth et utilisateur
    await Promise.all([
      db.collection("favorites").deleteMany({ userId: userObjectId }),
      db.collection("accounts").deleteMany({ userId: userObjectId }),
      db.collection("users").deleteOne({ _id: userObjectId }),
    ]);

    return new Response("User and related data deleted", { status: 200 });
  } catch (err) {
    console.error("Error deleting user:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
