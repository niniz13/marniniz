import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
      return new Response("Non autorisé", { status: 401 });

    const client = await clientPromise;
    const db = client.db();

    // Récupérer la locale depuis l’URL (ex: /api/favorites?locale=fr)
    const url = new URL(req.url);
    const locale = url.searchParams.get("locale") || "fr";

    // Sélection de la collection dynamique selon la locale
    const collectionName = locale === "en" ? "recipes_en" : "recipes_fr";

    // Récupérer les favoris de l'utilisateur
    const favorites = await db
      .collection("favorites")
      .find({ userId: new ObjectId(session.user.id) })
      .toArray();

    if (favorites.length === 0) {
      return new Response(JSON.stringify({ recipes: [] }), { status: 200 });
    }

    const recipeIds = favorites.map((f) => f.recipeId);

    // Récupérer les recettes dans la collection localisée
    const recipes = await db
      .collection(collectionName)
      .find({ _id: { $in: recipeIds } })
      .toArray();

    return new Response(JSON.stringify({ recipes }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Erreur API /favorites :", err);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
