import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, context) {
  try {
    const params = await context.params;
    const { idMeal } = params;
    
    const url = new URL(req.url);
    const locale = url.searchParams.get("locale") || "fr";

    // Si pas d'id, retourner une erreur 400 (requete invalide)
    if (!idMeal) {
      return new Response(JSON.stringify({ message: "id manquant" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await clientPromise;
    const db = client.db();

    const collectionName = locale === "en" ? "recipes_en" : "recipes_fr";
    const recipe = await db.collection(collectionName).findOne({ _id: new ObjectId(idMeal) });

    // Si pas de recette trouvee, retourner une erreur 404 (non trouve)
    if (!recipe) {
      return new Response(JSON.stringify({ message: "Recette non trouvée" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Retourner la recette trouvee
    return new Response(JSON.stringify(recipe), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Erreur API /recipes/[idMeal] :", err);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
