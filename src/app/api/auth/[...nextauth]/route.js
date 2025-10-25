import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcryptjs";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });
        if (!user) throw new Error("No user found");
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");
        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + "/";
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id || user._id?.toString() || token.sub;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      if (token?.provider) {
        session.user.provider = token.provider;
      }

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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
