import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
      return new Response("Non autorisé", { status: 401 });

    const { recipeId } = await req.json();
    if (!recipeId) return new Response("recipeId manquant", { status: 400 });

    const client = await clientPromise;
    const db = client.db();

    const userId = new ObjectId(session.user.id);
    const recipeObjectId = new ObjectId(recipeId);

    const existing = await db
      .collection("favorites")
      .findOne({ userId, recipeId: recipeObjectId });

    if (existing) {
      await db.collection("favorites").deleteOne({ _id: existing._id });
      return new Response(JSON.stringify({ favorite: false }), { status: 200 });
    } else {
      await db.collection("favorites").insertOne({
        userId,
        recipeId: recipeObjectId,
        createdAt: new Date(),
      });
      return new Response(JSON.stringify({ favorite: true }), { status: 200 });
    }
  } catch (err) {
    console.error("Erreur /api/favorites :", err);
    return new Response("Erreur serveur", { status: 500 });
  }
}
