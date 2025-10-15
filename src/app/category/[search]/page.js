"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipesByCategory } from "@/lib/features/recipes/fetchRecipesByCategory";
import Image from "next/image";
import { motion } from "framer-motion";
import Menu from "../../components/menu";

export default function CategoryRecipesPage() {
  const { search } = useParams();
  const dispatch = useDispatch();
  const {
    items: recipes = [],
    status,
    error,
  } = useSelector((state) => state.recipes);

  useEffect(() => {
    if (search) dispatch(fetchRecipesByCategory(search));
  }, [search, dispatch]);

  return (
    <div className="relative min-h-screen bg-[#0e0e0e] text-white">
      <div className="fixed top-0 left-0 w-full z-10 backdrop-blur-md">
        <Menu />
      </div>

      <div className="pt-32 px-6 sm:px-20 lg:px-40">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center">
          Recipes in {`"${search}"`}
        </h2>

        {status === "loading" && (
          <p className="text-center text-white/70">Loading...</p>
        )}
        {status === "failed" && (
          <p className="text-center text-red-400">Error: {error}</p>
        )}

        {status === "succeeded" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.idMeal}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
              >
                <Link
                  href={`/recipes/${recipe.idMeal}`}
                  className="block group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                >
                  <div className="relative w-full h-64">
                    <Image
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      fill
                      quality={60}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-xl font-bold mb-2">{recipe.strMeal}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
