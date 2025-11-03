import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";

/**
 * @fileoverview
 * Route API **PUT /api/user/update** — Permet à un utilisateur authentifié
 * de mettre à jour ses informations de profil (nom, email, image).
 *
 * Cette route est sécurisée et ne met à jour que les champs explicitement fournis.
 * Aucun champ n’est obligatoire.
 *
 * **Champs acceptés dans le body (JSON) :**
 * - `name` *(string, optionnel)* — Nouveau nom d’affichage
 * - `email` *(string, optionnel)* — Nouvelle adresse email
 * - `image` *(string, optionnel)* — Nouvelle URL d’image de profil
 *
 * **Codes de réponse :**
 * - ✅ 200 : `"Updated"` → profil mis à jour
 * - ⚠️ 401 : `"Unauthorized"` → utilisateur non connecté
 * - ❌ 500 : `"Erreur serveur"` → problème interne (ex. MongoDB)
 *
 * **Sécurité :**
 * - Authentification requise via `next-auth`
 * - Validation serveur : seuls les champs fournis sont modifiés
 */

/**
 * Met à jour les informations du profil utilisateur connecté.
 *
 * @async
 * @function PUT
 * @param {Request} req - Requête HTTP contenant les champs à mettre à jour
 * @returns {Promise<Response>} Réponse avec le statut de mise à jour
 *
 * @example
 * ```js
 * // Exemple côté client :
 * await fetch("/api/user/update", {
 *   method: "PUT",
 *   headers: { "Content-Type": "application/json" },
 *   credentials: "include",
 *   body: JSON.stringify({
 *     name: "Nouveau nom",
 *     image: "https://cdn.mealmind.com/profile.jpg",
 *   }),
 * });
 * ```
 */
export async function PUT(req) {
  try {
    // Vérifie si l'utilisateur est connecté
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });

    // Lecture des champs envoyés
    const { name, email, image } = await req.json();

    // Prépare l’objet de mise à jour (seulement les champs définis)
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (image !== undefined) updateFields.image = image;
    if (email !== undefined) updateFields.email = email;

    // Connexion à MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Met à jour l'utilisateur correspondant à la session actuelle
    await db
      .collection("users")
      .findOneAndUpdate(
        { email: session.user.email },
        { $set: updateFields },
        { returnDocument: "after" }
      );

    return new Response("Updated", { status: 200 });
  } catch (err) {
    console.error("Erreur API /user/update :", err);
    return new Response("Erreur serveur", { status: 500 });
  }
}
