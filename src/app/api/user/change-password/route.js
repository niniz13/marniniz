import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { oldPassword, newPassword } = await req.json();
  if (!oldPassword || !newPassword)
    return new Response("Missing fields", { status: 400 });

  const client = await clientPromise;
  const db = client.db();
  
  const user = await db.collection("users").findOne({ email: session.user.email });
  if (!user) return new Response("User not found", { status: 404 });

  // Check if user has a password (OAuth users don't have passwords)
  if (!user.password) {
    return new Response("Impossible de changer le mot de passe pour les comptes Google", { status: 400 });
  }

  const isValid = await bcrypt.compare(oldPassword, user.password);
  if (!isValid) return new Response("Ancien mot de passe incorrect", { status: 403 });

  const hashed = await bcrypt.hash(newPassword, 10);
  
  await db.collection("users").updateOne(
    { email: session.user.email },
    { $set: { password: hashed } }
  );

  return new Response("Mot de passe mis à jour", { status: 200 });
}
