import clientPromise from "@/lib/mongodb";

export async function GET(req, context) {
  try {
    const params = await context.params;
    const { idMeal } = params;

    // Si pas de idMeal, retourner une erreur 400 (requete invalide)
    if (!idMeal) {
      return new Response(JSON.stringify({ message: "idMeal manquant" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await clientPromise;
    const db = client.db();

    const recipe = await db.collection("recipes").findOne({ idMeal });

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
