import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const client = await clientPromise;
  const db = client.db();
  
  await db.collection("users").deleteOne({ email: session.user.email });
  await db.collection("accounts").deleteOne({ userId: session.user.id });

  return new Response("Deleted", { status: 200 });
}
