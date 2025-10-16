import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { name, image } = await req.json();

  const client = await clientPromise;
  const db = client.db();
  
  await db.collection("users").findOneAndUpdate(
    { email: session.user.email },
    { $set: { name, image } },
    { returnDocument: "after" }
  );

  return new Response("Updated", { status: 200 });
}
