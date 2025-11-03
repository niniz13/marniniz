import { MongoClient } from "mongodb";

/**
 * @fileoverview
 * Configuration et initialisation du client MongoDB pour l’application Next.js.
 *
 * Ce module gère la connexion à la base MongoDB de manière **optimisée** :
 * - En **développement**, il réutilise la connexion via une variable globale (`global._mongoClientPromise`)
 *   afin d’éviter les multiples connexions lors du rechargement à chaud (Hot Reload).
 * - En **production**, il établit une seule connexion persistante.
 *
 * ---
 * ⚙️ **Configuration requise :**
 * - Variable d’environnement `MONGODB_URI` définie dans `.env.local`
 *   ```env
 *   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database
 *   ```
 *
 * ---
 * 💡 **Utilisation typique :**
 * ```js
 * import clientPromise from "@/lib/mongodb";
 *
 * export async function getData() {
 *   const client = await clientPromise;
 *   const db = client.db("myDatabase");
 *   return await db.collection("users").find().toArray();
 * }
 * ```
 *
 * ---
 * 🧩 **Gestion des erreurs :**
 * - Si `MONGODB_URI` n’est pas définie, une erreur explicite est levée au démarrage.
 * - Si la connexion échoue, MongoClient génère une exception capturable dans les routes API.
 */

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

// Vérifie que la variable d’environnement MongoDB est configurée
if (!process.env.MONGODB_URI) {
  throw new Error("❌ Please add your Mongo URI to .env.local");
}

/**
 * 🔄 Gestion du cache global :
 * - En développement : réutilise la même promesse de connexion (évite les fuites de sockets)
 * - En production : crée une seule instance du client MongoDB
 */
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

/**
 * Promesse résolue contenant le client MongoDB connecté.
 * @type {Promise<MongoClient>}
 */
export default clientPromise;
