import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { name, email, image } = await req.json();

  const client = await clientPromise;
  const db = client.db();
  
  // Build update object - only include fields that are provided
  const updateFields = {};
  if (name !== undefined) updateFields.name = name;
  if (image !== undefined) updateFields.image = image;
  if (email !== undefined) updateFields.email = email;
  
  await db.collection("users").findOneAndUpdate(
    { email: session.user.email },
    { $set: updateFields },
    { returnDocument: "after" }
  );

  return new Response("Updated", { status: 200 });
}
