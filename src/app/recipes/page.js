"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Menu from "../components/menu";

function RecipesList() {
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | succeeded | failed
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredRecipes = async () => {
      setStatus("loading");
      try {
        const queryString = searchParams.toString();
        const res = await fetch(`/api/recipes?${queryString}`);
        if (!res.ok) throw new Error(`Erreur serveur: ${res.status}`);
        const data = await res.json();
        setRecipes(data);
        setStatus("succeeded");
      } catch (err) {
        console.error(err);
        setError(err.message);
        setStatus("failed");
      }
    };
    fetchFilteredRecipes();
  }, [searchParams]);

  if (status === "loading") {
    return <p className="text-center text-white/70">Chargement des recettes...</p>;
  }

  if (status === "failed") {
    return <p className="text-center text-red-400">Erreur : {error}</p>;
  }

  if (status === "succeeded" && recipes.length === 0) {
    return <p className="text-center text-white/60">Aucune recette trouvée avec ces filtres.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
      {recipes.map((recipe, index) => (
        <motion.div
          key={recipe.idMeal}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Link href={`/recipes/${recipe.idMeal}`} className="block group">
            <div className="relative w-full h-64">
              {recipe.strMealThumb ? (
                <Image
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  fill
                  quality={60}
                  className="object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full h-full bg-white/10 rounded-2xl" />
              )}
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold line-clamp-1">{recipe.strMeal}</h3>
              <p className="text-sm text-red-400">
                {recipe.strCategory} • {recipe.strArea}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default function RecipesPage() {
  return (
    <div className="relative w-full min-h-screen text-white bg-[#0e0e0e] overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">
          Résultats de votre recherche
        </h2>

        <Suspense fallback={<p className="text-white/70 text-center p-10">Chargement...</p>}>
          <RecipesList />
        </Suspense>
      </div>
    </div>
  );
}
