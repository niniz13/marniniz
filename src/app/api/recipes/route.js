import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Récupération des query params
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const category = searchParams.get("category");
    const area = searchParams.get("area");
    const ingredients = searchParams.get("ingredients");

    // Construction dynamique du filtre MongoDB
    const filter = {};

    if (name) filter.strMeal = { $regex: name, $options: "i" };
    if (category) filter.strCategory = category;
    if (area) filter.strArea = area;

    if (ingredients) {
      filter.$expr = {
        $gte: [
          {
            $size: {
              $filter: {
                input: [
                  "$strIngredient1","$strIngredient2","$strIngredient3","$strIngredient4","$strIngredient5",
                  "$strIngredient6","$strIngredient7","$strIngredient8","$strIngredient9","$strIngredient10",
                  "$strIngredient11","$strIngredient12","$strIngredient13","$strIngredient14","$strIngredient15",
                  "$strIngredient16","$strIngredient17","$strIngredient18","$strIngredient19","$strIngredient20"
                ],
                as: "ing",
                cond: { $gt: ["$$ing", ""] }
              }
            }
          },
          parseInt(ingredients)
        ]
      };
    }

    const recipes = await db.collection("recipes").find(filter).toArray();

    return new Response(JSON.stringify(recipes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Erreur API /recipes :", err);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
