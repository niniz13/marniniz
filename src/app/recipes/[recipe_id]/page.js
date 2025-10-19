"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import Menu from "@/app/components/menu";
import { motion } from "framer-motion";
import Footer from "../../components/footer";

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
      <div className="relative min-h-screen bg-[#0e0e0e] text-white">
        {/* Menu */}
        <div className="fixed top-0 left-0 w-full z-10">
          <Menu />
        </div>

        {/* Contenu Skeleton */}
        <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40 pb-20 flex flex-col gap-10">
          {/* Bloc image + infos */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Image skeleton */}
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="w-full lg:w-1/2 min-h-[400px] rounded-2xl"
              sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
            />

            {/* Right text skeleton */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <Skeleton
                variant="text"
                width="60%"
                height={40}
                sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
              />
              <Skeleton
                variant="text"
                width="40%"
                sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
              />

              {/* Liste ingrédients */}
              <div>
                <Skeleton
                  variant="text"
                  width="30%"
                  height={30}
                  sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
                  className="mb-2"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      variant="text"
                      width="80%"
                      height={25}
                      sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Instructions Skeleton */}
          <div>
            <Skeleton
              variant="text"
              width="40%"
              height={35}
              sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
              className="mb-4"
            />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="text"
                width="100%"
                height={20}
                sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
              />
            ))}
          </div>
        </div>
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

  const imageSrc =
    recipe.strMealThumb && recipe.strMealThumb.trim() !== ""
      ? recipe.strMealThumb
      : "/placeholder.jpg";
  const imageAlt = recipe.strMeal || "Image de recette";

  return (
    <div className="relative min-h-screen bg-[#0e0e0e] text-white">
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-10 items-start"
        >
          {/* Image */}
          <div className="w-full lg:w-1/2 h-[400px] rounded-2xl overflow-hidden shadow-lg relative">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover rounded-2xl"
            />
          </div>

          {/* Catégorie, area et ingrédients */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h1 className="text-4xl font-extrabold">{recipe.strMeal}</h1>
            <p className="text-white/60 uppercase text-sm tracking-wide">
              {recipe.strCategory} — {recipe.strArea}
            </p>

            <div>
              <h3 className="text-2xl font-bold mb-3">Ingrédients</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Array.from({ length: 20 })
                  .map((_, i) => i + 1)
                  .filter((i) => recipe[`strIngredient${i}`])
                  .map((i) => (
                    <li
                      key={i}
                      className="text-white/80 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-white/50 rounded-full" />
                      {recipe[`strIngredient${i}`]} — {recipe[`strMeasure${i}`]}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Instructions en dessous */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          <h2 className="text-3xl font-bold mb-4">Instructions</h2>
          <p className="text-white/80 leading-relaxed whitespace-pre-line">
            {recipe.strInstructions}
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
