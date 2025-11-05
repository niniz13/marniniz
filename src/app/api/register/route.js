import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { z } from "zod";

/**
 * @fileoverview
 * Route API **POST /api/register** — Crée un nouvel utilisateur dans la base MongoDB.
 *
 * Cette route reçoit les informations du formulaire d’inscription depuis le front-end,
 * valide les données avec **Zod**, vérifie si l’adresse email est déjà utilisée,
 * puis stocke un nouvel utilisateur avec un mot de passe **haché avec bcrypt**.
 *
 * **Champs requis :**
 * - `name` *(string)* → Nom complet de l’utilisateur
 * - `email` *(string)* → Adresse email unique
 * - `password` *(string)* → Mot de passe brut à hacher (doit respecter certaines contraintes)
 * - `image` *(string, optionnel)* → URL d’image de profil
 *
 * **Validation Zod :**
 * - Le nom doit contenir au moins 2 caractères.
 * - L'email doit être valide.
 * - Le mot de passe doit contenir :
 *   - au moins 8 caractères,
 *   - une majuscule,
 *   - un chiffre,
 *   - un caractère spécial.
 *
 * **Sécurité :**
 * - Le mot de passe est haché via `bcryptjs` avant insertion.
 * - Aucune donnée sensible n’est renvoyée dans la réponse.
 *
 * **Réponses possibles :**
 * - ✅ 201 : `{ success: true }` → Utilisateur créé avec succès
 * - ⚠️ 400 : `{ error: "User already exists" }` → Email déjà enregistré
 * - ⚠️ 400 : `{ error: "Validation error", details: { field: message } }` → Données invalides
 * - ❌ 500 : `{ message: "Erreur serveur" }` → Erreur inattendue
 */

/**
 * Schéma de validation Zod pour les données d'inscription utilisateur.
 */
const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("Adresse email invalide."),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
    .regex(/[A-Z]/, "Le mot de passe doit contenir une majuscule.")
    .regex(/[0-9]/, "Le mot de passe doit contenir un chiffre.")
    .regex(
      /[^A-Za-z0-9]/,
      "Le mot de passe doit contenir un caractère spécial."
    ),
  image: z.string().optional(),
});

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
 *     password: "SuperPass1!",
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
    const body = await req.json();

    // Validation des données avec Zod
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      // Regroupe les erreurs par champ
      const fieldErrors = {};
      parsed.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });

      return new Response(
        JSON.stringify({
          error: "Validation error",
          details: fieldErrors,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { name, email, password, image } = parsed.data;

    // Connexion à MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Vérifie si l'utilisateur existe déjà
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
    });
  }
}
