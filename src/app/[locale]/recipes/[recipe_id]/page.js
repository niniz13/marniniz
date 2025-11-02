"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import Menu from "@/app/components/menu";
import { motion } from "framer-motion";
import Footer from "@/app/components/footer";
import { Download, Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function RecipeDetailPage() {
  const { recipe_id } = useParams();
  const { data: session } = useSession();
  const t = useTranslations("RecipeDetailPage");

  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  const handleExportPDF = () => window.print();

  // Charger les détails de la recette
  useEffect(() => {
    if (!recipe_id) return;

    const fetchRecipeDetail = async () => {
      try {
        const res = await fetch(`/api/recipes/${recipe_id}`);
        if (!res.ok) throw new Error(t("serverError", { status: res.status }));

        const data = await res.json();
        setRecipe(data);
        setStatus("succeeded");
      } catch (err) {
        setError(err.message);
        setStatus("failed");
      }
    };

    fetchRecipeDetail();
  }, [t, recipe_id]);

  // Vérifier si la recette est déjà en favoris (plus rapide)
  useEffect(() => {
    const checkFavorite = async () => {
      if (!session?.user?.id || !recipe_id) return;
      try {
        const res = await fetch(`/api/favorites/${recipe_id}`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setIsFavorite(data.favorite);
        }
      } catch (err) {
        console.error("Erreur vérification favoris :", err);
      }
    };
    checkFavorite();
  }, [session, recipe_id]);

  // Ajouter / retirer des favoris
  const toggleFavorite = async () => {
    if (!session?.user?.id) {
      toast.error(t("mustBeLoggedIn"));
      return;
    }

    setLoadingFavorite(true);
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId: recipe_id }),
        credentials: "include",
        cache: "force-cache",
      });
      const data = await res.json();
      if (res.ok) {
        setIsFavorite(data.favorite);
        toast.success(
          data.favorite ? t("addedToFavorites") : t("removedFromFavorites")
        );
      } else {
        toast.error(data.favorite ? t("favoriteError") : t("unfavoriteError"));
      }
    } catch (err) {
      console.error("Erreur favoris :", err);
    } finally {
      setLoadingFavorite(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="relative min-h-screen bg-[#0e0e0e] text-white">
        <div className="fixed top-0 left-0 w-full z-10">
          <Menu />
        </div>

        <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40 pb-20 flex flex-col gap-10">
          <div className="flex flex-col lg:flex-row gap-10">
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="w-full lg:w-1/2 min-h-[400px] rounded-2xl"
              sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
            />
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
        {t("error")} : {error || t("error")}
      </div>
    );
  }

  const imageSrc =
    recipe.strMealThumb?.trim() !== ""
      ? recipe.strMealThumb
      : "/placeholder.jpg";

  return (
    <div className="relative min-h-screen bg-[#0e0e0e] text-white">
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40 pb-20">
        {/* Bloc principal équilibré */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-10 items-stretch"
        >
          {/* Image ajustable */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg min-h-[400px] lg:min-h-[500px]">
            <Image
              src={imageSrc}
              alt={recipe.strMeal}
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Détails plus compacts */}
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-4xl font-extrabold">{recipe.strMeal}</h1>
                <div className="flex gap-2">
                  <button
                    onClick={toggleFavorite}
                    disabled={loadingFavorite}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all ${
                      isFavorite
                        ? "bg-red-500/20 border-red-400 text-red-400 hover:bg-red-500/30"
                        : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    }`}
                    title={
                      isFavorite
                        ? t("removeFromFavorites")
                        : t("addToFavorites")
                    }
                  >
                    <Heart
                      size={20}
                      fill={isFavorite ? "red" : "none"}
                      color={isFavorite ? "red" : "white"}
                    />
                  </button>

                  <button
                    onClick={handleExportPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all no-print"
                    title={t("exportPDF")}
                  >
                    <Download size={20} />
                    <span className="hidden sm:inline">PDF</span>
                  </button>
                </div>
              </div>

              <p className="text-white/60 uppercase text-sm tracking-wide">
                {t("prepTime", { time: recipe.strPrepTime })} —{" "}
                {t("cookTime", { time: recipe.strCookTime })} —{" "}
                {t("servings", { count: recipe.strServings })}
              </p>

              {recipe.strDescription && (
                <p className="text-white/80 leading-relaxed">
                  {recipe.strDescription}
                </p>
              )}

              <div className="flex flex-wrap gap-3 text-sm text-white/70">
                {recipe.strDifficulty && (
                  <span className="bg-white/10 border border-white/20 rounded-lg px-3 py-1">
                    {t("difficulty")} : <strong>{recipe.strDifficulty}</strong>
                  </span>
                )}
                {recipe.strSubCategory && (
                  <span className="bg-white/10 border border-white/20 rounded-lg px-3 py-1">
                    Sous-catégorie : <strong>{recipe.strSubCategory}</strong>
                  </span>
                )}
                {recipe.strDishType && (
                  <span className="bg-white/10 border border-white/20 rounded-lg px-3 py-1">
                    Type de repas : <strong>{recipe.strDishType}</strong>
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3">{t("ingredients")}</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recipe.strIngredients?.length > 0 ? (
                    recipe.strIngredients.map((ing, i) => (
                      <li
                        key={i}
                        className="text-white/80 flex items-start gap-2"
                      >
                        <span className="w-2 h-2 bg-white/50 rounded-full mt-2" />
                        {ing}
                      </li>
                    ))
                  ) : (
                    <p className="text-white/60">
                      Aucun ingrédient disponible.
                    </p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14"
        >
          <h2 className="text-3xl font-bold mb-4">{t("instructions")}</h2>
          <p className="text-white/80 leading-relaxed whitespace-pre-line">
            {recipe.strDirections || t("error")}
          </p>
        </motion.div>

        {/* Section Nutrition */}
        {recipe.strNutrition &&
          Object.entries(recipe.strNutrition).some(
            ([, value]) =>
              value && (Array.isArray(value) ? value.length > 0 : value !== "")
          ) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <h2 className="text-3xl font-bold mb-4">{t("nutrition")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(recipe.strNutrition)
                  .filter(
                    ([, value]) =>
                      value &&
                      (Array.isArray(value) ? value.length > 0 : value !== "")
                  )
                  .map(([label, values]) => (
                    <div
                      key={label}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-start"
                    >
                      <h4 className="font-semibold text-white/90 mb-1">
                        {label}
                      </h4>
                      <p className="text-white/70">
                        {Array.isArray(values)
                          ? values.join(" — ")
                          : String(values)}
                      </p>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
      </div>
      <Footer />
    </div>
  );
}
