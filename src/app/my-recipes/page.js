"use client";

import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Skeleton from "@mui/material/Skeleton";
import Menu from "../components/menu";
import Footer from "../components/footer";

function FavoriteRecipesList() {
  const { data: session, status: authStatus } = useSession();
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authStatus === "loading") return;
    if (!session?.user?.id) {
      setStatus("unauthorized");
      return;
    }

    const fetchFavorites = async () => {
      setStatus("loading");
      try {
        const res = await fetch("/api/user/favorites", {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Erreur serveur : ${res.status}`);
        const data = await res.json();
        setRecipes(data.recipes);
        setStatus("succeeded");
      } catch (err) {
        console.error(err);
        setError(err.message);
        setStatus("failed");
      }
    };

    fetchFavorites();
  }, [session, authStatus]);

  if (authStatus === "loading" || status === "loading") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col">
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="w-full min-h-64 rounded-2xl"
              sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
            />
            <div className="p-5">
              <Skeleton
                variant="text"
                width="80%"
                height={28}
                sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={20}
                sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (status === "unauthorized") {
    return (
      <p className="text-center text-white/60 pb-20">
        Vous devez être connecté pour voir vos recettes favorites.
      </p>
    );
  }

  if (status === "failed") {
    return <p className="text-center text-red-400 pb-20">Erreur : {error}</p>;
  }

  if (status === "succeeded" && recipes.length === 0) {
    return (
      <p className="text-center text-white/60 pb-20">
        Vous n&apos;avez encore enregistré aucune recette.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
      {recipes.map((recipe, index) => (
        <motion.div
          key={recipe._id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Link href={`/recipes/${recipe._id}`} className="block group">
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
            <div className="py-5 px-2">
              <h3 className="text-xl font-bold line-clamp-1">
                {recipe.strMeal}
              </h3>
              <p className="text-sm text-red-400">
                {recipe.strDishType || "?"} • Pour {recipe.strServings || "?"}{" "}
                personnes
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default function MyRecipesPage() {
  return (
    <div className="relative w-full min-h-screen text-white bg-[#0e0e0e] overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">
          Mes recettes favorites
        </h2>

        <Suspense
          fallback={
            <p className="text-white/70 text-center p-10">Chargement...</p>
          }
        >
          <FavoriteRecipesList />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
