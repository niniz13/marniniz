import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

/**
 * @fileoverview
 * Route API **POST /api/user/change-password** — Permet à un utilisateur connecté
 * de changer son mot de passe en toute sécurité.
 *
 * Cette route vérifie :
 *  - que l’utilisateur est authentifié via `next-auth`
 *  - que l’ancien mot de passe est correct
 *  - et met à jour le mot de passe dans MongoDB après hachage
 *
 * Les utilisateurs connectés via Google (OAuth) **ne peuvent pas changer de mot de passe**,
 * car leur compte n’a pas de champ `password` stocké.
 *
 * **Sécurité :**
 * - Authentification requise (`getServerSession`)
 * - Vérification de l’ancien mot de passe
 * - Nouveau mot de passe haché avec `bcrypt`
 *
 * **Codes de réponse :**
 * - ✅ 200 : "Mot de passe mis à jour"
 * - ⚠️ 400 : "Missing fields" ou "Impossible de changer le mot de passe pour les comptes Google"
 * - ⚠️ 401 : "Unauthorized"
 * - ⚠️ 403 : "Ancien mot de passe incorrect"
 * - ⚠️ 404 : "User not found"
 * - ❌ 500 : "Erreur serveur"
 */

/**
 * Met à jour le mot de passe d’un utilisateur connecté.
 *
 * @async
 * @function POST
 * @param {Request} req - Requête HTTP contenant l’ancien et le nouveau mot de passe au format JSON
 * @returns {Promise<Response>} Réponse HTTP avec un message de statut
 *
 * @example
 * ```js
 * // Exemple côté client :
 * const res = await fetch("/api/user/change-password", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify({
 *     oldPassword: "ancien123",
 *     newPassword: "nouveau456",
 *   }),
 * });
 *
 * const message = await res.text();
 * console.log(message); // "Mot de passe mis à jour"
 * ```
 */
export async function POST(req) {
  try {
    // Vérifie que l'utilisateur est connecté
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });

    // Lecture des champs envoyés
    const { oldPassword, newPassword } = await req.json();
    if (!oldPassword || !newPassword)
      return new Response("Missing fields", { status: 400 });

    // Connexion à MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Récupère l'utilisateur actuel
    const user = await db
      .collection("users")
      .findOne({ email: session.user.email });
    if (!user) return new Response("User not found", { status: 404 });

    // Comptes OAuth : pas de mot de passe stocké
    if (!user.password) {
      return new Response(
        "Impossible de changer le mot de passe pour les comptes Google",
        { status: 400 }
      );
    }

    // Vérifie l’ancien mot de passe
    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid)
      return new Response("Ancien mot de passe incorrect", { status: 403 });

    // Hache le nouveau mot de passe
    const hashed = await bcrypt.hash(newPassword, 10);

    // Met à jour le mot de passe
    await db
      .collection("users")
      .updateOne({ email: session.user.email }, { $set: { password: hashed } });

    return new Response("Mot de passe mis à jour", { status: 200 });
  } catch (err) {
    console.error("Erreur API /user/change-password :", err);
    return new Response("Erreur serveur", { status: 500 });
  }
}
