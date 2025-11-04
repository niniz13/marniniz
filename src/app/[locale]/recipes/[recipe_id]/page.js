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
import { useLocale, useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import {
  checkFavorite,
  toggleFavorite,
} from "@/lib/features/favoriteRecipes/favoriteRecipesSlice";

/**
 * @fileoverview
 * Le composant `RecipeDetailPage` affiche le détail complet d’une recette sélectionnée.
 *
 * Fonctionnalités principales :
 * - Récupération des données d’une recette via l’API `/api/recipes/[id]`
 * - Gestion des états (`loading`, `failed`, `succeeded`)
 * - Affichage dynamique des sections (ingrédients, instructions, nutrition)
 * - Gestion des favoris (ajout/suppression) via Redux (slice `favoritesSlice`)
 * - Export simplifié au format PDF via `window.print()`
 * - Animations d’apparition avec **Framer Motion**
 * - Traductions multilingues avec **next-intl**
 */

/**
 * @component
 * @description
 * Page d’affichage des détails d’une recette.
 *
 * Ce composant gère la récupération, l’affichage et les interactions utilisateur :
 * - Lecture des informations principales (image, titre, temps, description)
 * - Gestion des favoris via Redux et API (`/api/favorites`)
 * - Affichage responsive et visuel cohérent
 * - Fallbacks visuels via `Skeleton` pendant le chargement
 *
 * @example
 * ```jsx
 * import RecipeDetailPage from "@/app/recipes/[recipe_id]/page";
 *
 * export default function Page() {
 *   return <RecipeDetailPage />;
 * }
 * ```
 *
 * @returns {JSX.Element} L’interface complète du détail d’une recette.
 */
export default function RecipeDetailPage() {
  // --- Hooks principaux ---
  const { recipe_id } = useParams();
  const { data: session } = useSession();
  const t = useTranslations("RecipeDetailPage");
  const locale = useLocale();
  const dispatch = useDispatch();

  // --- Sélecteurs Redux ---
  const { favorites, loading: loadingFavorite } = useSelector(
    (state) => state.favorites
  );
  const isFavorite = favorites[recipe_id] || false;

  // --- États locaux pour la recette ---
  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  /**
   * @function handleExportPDF
   * @description
   * Déclenche l’impression/export PDF du détail de la recette.
   */
  const handleExportPDF = () => window.print();

  /**
   * @effect
   * Récupère les détails de la recette depuis l’API `/api/recipes/[recipe_id]`.
   */
  useEffect(() => {
    if (!recipe_id) return;

    const fetchRecipeDetail = async () => {
      try {
        const res = await fetch(`/api/recipes/${recipe_id}?locale=${locale}`, {
          cache: "force-cache",
        });
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
  }, [t, recipe_id, locale]);

  /**
   * @effect
   * Vérifie si la recette est déjà en favoris via Redux pour l’utilisateur connecté.
   */
  useEffect(() => {
    if (session?.user?.id && recipe_id) {
      dispatch(checkFavorite({ recipeId: recipe_id }));
    }
  }, [dispatch, session, recipe_id]);

  /**
   * @function handleToggleFavorite
   * @description
   * Déclenche l’ajout ou le retrait de la recette des favoris via Redux.
   */
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite({ recipeId: recipe_id, t, session }));
  };

  // --- ÉTATS D’INTERFACE ---
  if (status === "loading") {
    return (
      <div className="relative min-h-screen bg-[#0e0e0e] text-white">
        <div className="fixed top-0 left-0 w-full z-10">
          <Menu />
        </div>

        {/* Skeleton de chargement */}
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

  // --- RENDU PRINCIPAL ---
  return (
    <div className="relative min-h-screen bg-[#0e0e0e] text-white">
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40 pb-20">
        {/* --- IMAGE ET INFOS PRINCIPALES --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-10 items-stretch"
        >
          {/* --- IMAGE --- */}
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

          {/* --- DÉTAILS --- */}
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              {/* Titre + actions */}
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-4xl font-extrabold text-white">
                  {recipe.strMeal}
                </h1>
                <div className="flex gap-2">
                  {/* --- FAVORIS --- */}
                  <button
                    onClick={handleToggleFavorite}
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

                  {/* --- EXPORT PDF --- */}
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

              {/* --- MÉTADONNÉES --- */}
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

              {/* --- INFORMATIONS SECONDAIRES --- */}
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

              {/* --- INGRÉDIENTS --- */}
              <div>
                <h3 className="text-2xl text-white font-bold mb-3">
                  {t("ingredients")}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white">
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

        {/* --- INSTRUCTIONS --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14"
        >
          <h2 className="text-3xl text-white font-bold mb-4">
            {t("instructions")}
          </h2>
          <p className="text-white/80 leading-relaxed whitespace-pre-line">
            {recipe.strDirections || t("error")}
          </p>
        </motion.div>

        {/* --- NUTRITION --- */}
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
              <h2 className="text-3xl text-white font-bold mb-4">
                {t("nutrition")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
                {Object.entries(recipe.strNutrition)
                  .filter(
                    ([, value]) =>
                      value &&
                      (Array.isArray(value) ? value.length > 0 : value !== "")
                  )
                  .map(([label, values]) => {
                    const translatedLabel = t(`nutritionLabels.${label}`, {
                      default: label,
                    });

                    return (
                      <div
                        key={label}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-start"
                      >
                        <h4 className="font-semibold text-white/90 mb-1">
                          {translatedLabel}
                        </h4>
                        <p className="text-white/70">
                          {Array.isArray(values)
                            ? values.join(" — ")
                            : String(values)}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </motion.div>
          )}
      </div>
      <Footer />
    </div>
  );
}
