import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  const { name, email, password, image } = await req.json();

  const client = await clientPromise;
  const db = client.db();

  const existing = await db.collection("users").findOne({ email });
  if (existing) {
    return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
  }

  const hashed = await hash(password, 10);

  await db.collection("users").insertOne({ name, email, password: hashed, image });

  return new Response(JSON.stringify({ success: true }), { status: 201 });
}
