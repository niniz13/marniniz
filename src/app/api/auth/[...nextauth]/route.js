import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcryptjs";

/**
 * @fileoverview
 * Configuration d'authentification **NextAuth.js** pour le projet MealMind.
 *
 * Cette configuration gère l'authentification via :
 * - **Email + mot de passe** (avec vérification bcrypt)
 * - **Compte Google** (OAuth 2.0)
 *
 * Les utilisateurs sont stockés dans une base **MongoDB**, via l’adaptateur officiel `@auth/mongodb-adapter`.
 *
 * **Fonctionnalités clés :**
 * - Sécurité renforcée avec `bcryptjs` pour le hachage des mots de passe
 * - Sessions JWT (stateless)
 * - Récupération des informations utilisateur depuis MongoDB à chaque session
 * - Redirection automatique après connexion
 *
 * @see https://next-auth.js.org/
 * @see https://www.mongodb.com/
 * @see https://www.npmjs.com/package/bcryptjs
 */

/**
 * Options principales de configuration pour NextAuth.
 *
 * @type {import("next-auth").NextAuthOptions}
 */
export const authOptions = {
  /** Adaptateur MongoDB pour la persistance des utilisateurs */
  adapter: MongoDBAdapter(clientPromise),

  /** Liste des fournisseurs d'authentification */
  providers: [
    /**
     * Authentification par identifiants (email + mot de passe)
     */
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      /**
       * Vérifie les identifiants fournis lors de la connexion.
       *
       * @async
       * @function authorize
       * @param {Record<string, string>} credentials - Email et mot de passe envoyés par l'utilisateur
       * @returns {Promise<Object|null>} L'utilisateur authentifié ou `null` si échec
       * @throws {Error} Si aucun utilisateur trouvé ou mot de passe invalide
       */
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();

        // Recherche de l’utilisateur dans la collection MongoDB
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) throw new Error("No user found");

        // Vérification du mot de passe via bcrypt
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),

    /**
     * Authentification via Google OAuth 2.0
     * @see https://console.cloud.google.com/
     */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  /** Configuration des sessions (JWT stateless) */
  session: { strategy: "jwt" },

  /** Page personnalisée pour la connexion */
  pages: { signIn: "/login" },

  /** Clé secrète pour la signature JWT */
  secret: process.env.NEXTAUTH_SECRET,

  /**
   * Callbacks permettant de personnaliser le comportement de NextAuth
   */
  callbacks: {
    /**
     * Redirection après authentification.
     * @param {{ url: string, baseUrl: string }} params
     * @returns {Promise<string>} URL finale de redirection
     */
    async redirect({ url, baseUrl }) {
      return baseUrl + "/";
    },

    /**
     * Callback pour la création / mise à jour du JWT.
     * @param {{ token: import("next-auth/jwt").JWT, user?: any, account?: any }} params
     * @returns {Promise<import("next-auth/jwt").JWT>}
     */
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id || user._id?.toString() || token.sub;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },

    /**
     * Callback pour enrichir la session côté client.
     * Récupère les données utilisateur depuis MongoDB.
     *
     * @param {{ session: import("next-auth").Session, token: import("next-auth/jwt").JWT }} params
     * @returns {Promise<import("next-auth").Session>}
     */
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      if (token?.provider) {
        session.user.provider = token.provider;
      }

      // Synchronisation des informations utilisateur avec MongoDB
      const client = await clientPromise;
      const db = client.db();

      try {
        const { ObjectId } = require("mongodb");
        const dbUser = await db.collection("users").findOne({
          _id: new ObjectId(token.id),
        });

        if (dbUser) {
          session.user.name = dbUser.name;
          session.user.email = dbUser.email;
          session.user.image = dbUser.image;
        }
      } catch (err) {
        console.warn("Impossible de synchroniser l'utilisateur :", err);
      }

      return session;
    },
  },
};

/**
 * Gestionnaire NextAuth.js pour les routes `/api/auth/[...nextauth]`
 *
 * Exporte les méthodes HTTP GET et POST pour l’API d’authentification.
 *
 * @see https://next-auth.js.org/configuration/nextjs#route-handlers-app
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
