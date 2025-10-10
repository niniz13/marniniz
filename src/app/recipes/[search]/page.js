"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "@/lib/features/recipes/fetchRecipes";
import Image from "next/image";
import { motion } from "framer-motion";
import Menu from "../../components/menu";

export default function RecipesPage() {
  const { search } = useParams();
  const dispatch = useDispatch();
  const {
    items: recipes = [],
    status,
    error,
  } = useSelector((state) => state.recipes);

  useEffect(() => {
    if (search) {
      dispatch(fetchRecipes(search));
    }
  }, [search, dispatch]);

  return (
    <div className="relative w-full min-h-screen text-white bg-[#0e0e0e] overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-10 backdrop-blur-md">
        <Menu />
      </div>

      <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center">
          Recipes for {`"${search}"`}
        </h2>

        {status === "loading" && (
          <p className="text-center text-white/70">Loading recipes...</p>
        )}

        {status === "failed" && (
          <p className="text-center text-red-400">Error: {error}</p>
        )}

        {status === "succeeded" && recipes.length === 0 && (
          <p className="text-center text-white/60">
            No recipes found for {`"${search}"`}.
          </p>
        )}

        {status === "succeeded" && recipes.length > 0 && (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-8
              pb-20
            "
          >
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.idMeal}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="
                  bg-white/5 
                  border border-white/10 
                  rounded-2xl 
                  overflow-hidden 
                  hover:bg-white/10 
                  transition-all 
                  duration-300 
                  backdrop-blur-sm
                  flex flex-col
                "
              >
                <div className="relative w-full h-64">
                  <Image
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col flex-1 justify-between p-5">
                  <div>
                    <h3 className="text-2xl font-bold mb-1 line-clamp-1">
                      {recipe.strMeal}
                    </h3>
                    <span className="text-sm uppercase text-white/60 mb-3 block">
                      {recipe.strCategory}
                    </span>
                    <p className="text-white/80 text-sm line-clamp-4">
                      {recipe.strInstructions}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
