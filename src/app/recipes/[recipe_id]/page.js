"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Menu from "@/app/components/menu";
import { motion } from "framer-motion";

export default function RecipeDetailPage() {
  const { recipe_id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!recipe_id) return;

    const fetchRecipeDetail = async () => {
      try {
        const res = await fetch(`/api/recipes/${recipe_id}`);
        if (!res.ok) throw new Error(`Erreur serveur: ${res.status}`);

        const data = await res.json();
        setRecipe(data);
        setStatus("succeeded");
      } catch (err) {
        setError(err.message);
        setStatus("failed");
      }
    };

    fetchRecipeDetail();
  }, [recipe_id]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen text-white/70">
        Chargement de la recette...
      </div>
    );
  }

  if (status === "failed" || !recipe) {
    return (
      <div className="flex items-center justify-center h-screen text-red-400">
        Erreur : {error || "Recette introuvable"}
      </div>
    );
  }

  const imageSrc = recipe.strMealThumb && recipe.strMealThumb.trim() !== ""
    ? recipe.strMealThumb
    : "/placeholder.jpg"; // Mets un fichier placeholder dans /public
  const imageAlt = recipe.strMeal || "Image de recette";

  return (
    <div className="relative min-h-screen bg-[#0e0e0e] text-white">
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      <div className="pt-32 px-6 sm:px-20 lg:px-40 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-10 items-start"
        >
          {/* Image sécurisée */}
          <div className="relative w-full lg:w-1/2 h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Infos recette */}
          <div className="flex flex-col gap-4 lg:w-1/2">
            <h1 className="text-4xl font-extrabold mb-2">{recipe.strMeal}</h1>
            <p className="text-white/60 uppercase text-sm tracking-wide">
              {recipe.strCategory} — {recipe.strArea}
            </p>
            <p className="text-white/80 leading-relaxed">
              {recipe.strInstructions}
            </p>

            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-3">Ingrédients</h3>
              <ul className="grid grid-cols-2 gap-2">
                {Array.from({ length: 20 })
                  .map((_, i) => i + 1)
                  .filter(i => recipe[`strIngredient${i}`])
                  .map(i => (
                    <li key={i} className="text-white/80 flex items-center gap-2">
                      <span className="w-2 h-2 bg-white/50 rounded-full" />
                      {recipe[`strIngredient${i}`]} — {recipe[`strMeasure${i}`]}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
