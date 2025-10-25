import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ favorite: false }), { status: 401 });
  }

  const { recipeId } = await params;

  const client = await clientPromise;
  const db = client.db();

  const found = await db.collection("favorites").findOne({
    userId: new ObjectId(session.user.id),
    recipeId: new ObjectId(recipeId),
  });

  return new Response(JSON.stringify({ favorite: !!found }), { status: 200 });
}
