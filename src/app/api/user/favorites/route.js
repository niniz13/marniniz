import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new Response("Non autorisé", { status: 401 });

  const client = await clientPromise;
  const db = client.db();

  const favorites = await db
    .collection("favorites")
    .find({ userId: new ObjectId(session.user.id) })
    .toArray();

  const recipeIds = favorites.map((f) => f.recipeId);

  const recipes = await db
    .collection("recipes")
    .find({ _id: { $in: recipeIds } })
    .toArray();

  return new Response(JSON.stringify({ recipes }), { status: 200 });
}
