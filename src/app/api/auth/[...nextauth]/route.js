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
    async jwt({ token, user, account, trigger }) {
      // Store user ID and provider on initial sign in
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.provider = account.provider;
      }
      
      // Don't modify token on update - let session callback fetch fresh data
      
      return token;
    },
    async session({ session, token }) {
      // Add provider info to session
      if (token.provider) {
        session.user.provider = token.provider;
      }
      
      // Always sync user data from database to session
      const client = await clientPromise;
      const db = client.db();
      
      // Find user by sub (user ID from token)
      let user;
      if (token.sub) {
        const { ObjectId } = require("mongodb");
        try {
          user = await db.collection("users").findOne({ _id: new ObjectId(token.sub) });
        } catch (e) {
          // If ObjectId fails, try finding by email
          user = await db.collection("users").findOne({ email: token.email });
        }
      } else if (token.email) {
        user = await db.collection("users").findOne({ email: token.email });
      }
      
      if (user) {
        session.user.name = user.name;
        session.user.email = user.email;
        session.user.image = user.image;
      }
      
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
