import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";

/**
 * @fileoverview
 * Route API **POST /api/register** — Crée un nouvel utilisateur dans la base MongoDB.
 *
 * Cette route reçoit les informations du formulaire d’inscription depuis le front-end,
 * vérifie si l’adresse email est déjà utilisée, puis stocke un nouvel utilisateur
 * avec un mot de passe **haché avec bcrypt**.
 *
 * **Champs requis :**
 * - `name` *(string)* → Nom complet de l’utilisateur
 * - `email` *(string)* → Adresse email unique
 * - `password` *(string)* → Mot de passe brut à hacher
 * - `image` *(string, optionnel)* → URL d’image de profil
 *
 * **Sécurité :**
 * - Le mot de passe est haché via `bcryptjs` avant insertion.
 * - Aucune donnée sensible n’est renvoyée dans la réponse.
 *
 * **Réponses possibles :**
 * - ✅ 201 : `{ success: true }` → Utilisateur créé avec succès
 * - ⚠️ 400 : `{ error: "User already exists" }` → Email déjà enregistré
 * - ❌ 500 : `{ message: "Erreur serveur" }` → Erreur inattendue
 */

/**
 * Crée un nouvel utilisateur dans la collection `users`.
 *
 * @async
 * @function POST
 * @param {Request} req - Requête HTTP contenant le corps JSON avec les informations utilisateur
 * @returns {Promise<Response>} Réponse JSON indiquant le succès ou une erreur
 *
 * @example
 * ```js
 * // Exemple d'appel côté client
 * const res = await fetch("/api/register", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify({
 *     name: "Alice Dupont",
 *     email: "alice@example.com",
 *     password: "secret123",
 *   }),
 * });
 *
 * const data = await res.json();
 * if (data.success) console.log("Utilisateur créé !");
 * ```
 */
export async function POST(req) {
  try {
    // Lecture du corps JSON
    const { name, email, password, image } = await req.json();

    // Vérification des champs requis
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Champs manquants" }), {
        status: 400,
      });
    }

    // Connexion à MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Vérifie si l'utilisateur existe déjà
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }

    // Hachage du mot de passe
    const hashed = await hash(password, 10);

    // Insertion du nouvel utilisateur
    await db.collection("users").insertOne({
      name,
      email,
      password: hashed,
      image: image || null,
      createdAt: new Date(),
    });

    // Réponse succès
    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Erreur API /register :", err);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
    });
  }
}
