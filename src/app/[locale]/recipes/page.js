"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Menu from "@/app/components/menu";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Footer from "@/app/components/footer";
import { useLocale, useTranslations } from "next-intl";

/**
 * @fileoverview
 * Ce fichier contient les composants `RecipesPage` et `RecipesList` :
 *
 * - `RecipesPage` : composant principal de la page des recettes, affichant le titre, la navigation (`Menu`), la liste paginée de recettes et le `Footer`.
 * - `RecipesList` : composant logique et visuel chargé de récupérer, filtrer, paginer et afficher les recettes depuis l’API `/api/recipes`.
 *
 * Fonctionnalités principales :
 * - Recherche et filtrage via les paramètres d’URL (`useSearchParams`).
 * - Requêtes API dynamiques avec rechargement automatique à chaque changement de filtre.
 * - Gestion des états (`idle`, `loading`, `succeeded`, `failed`).
 * - Pagination avec MUI (`Pagination` + `Stack`).
 * - Animations douces avec Framer Motion.
 * - Internationalisation via `next-intl` (traductions et locale dynamique).
 */

/**
 * @component
 * @description
 * Liste des recettes filtrées avec pagination et gestion d’état.
 *
 * - Récupère les filtres depuis l’URL (nom, difficulté, sous-catégorie, etc.).
 * - Fait une requête à `/api/recipes` avec la locale courante.
 * - Gère les changements de page et rafraîchit les résultats.
 * - Affiche des Skeletons pendant le chargement.
 * - Affiche un message en cas d’erreur ou de résultats vides.
 *
 * @example
 * ```jsx
 * <RecipesList />
 * ```
 *
 * @returns {JSX.Element} La grille de recettes avec pagination ou des messages d’état (chargement, erreur, vide).
 */
function RecipesList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const t = useTranslations("RecipesPage");
  const locale = useLocale();

  // --- États internes ---
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );

  const prevFiltersRef = useRef(null);

  // --- Extraction des filtres depuis les paramètres d’URL ---
  const name = searchParams.get("name");
  const difficulty = searchParams.get("difficulty");
  const subCategory = searchParams.get("subCategory");
  const nutritionKey = searchParams.get("nutritionKey");
  const nutritionOp = searchParams.get("nutritionOp");
  const nutritionValue = searchParams.get("nutritionValue");

  /**
   * @effect
   * Réinitialise la page à 1 si les filtres changent (ex. : changement de nom, difficulté, etc.).
   */
  useEffect(() => {
    const filtersToWatch = [
      "name",
      "difficulty",
      "subCategory",
      "nutritionKey",
      "nutritionOp",
      "nutritionValue",
      "minIngredients",
      "maxIngredients",
      "prepTimeMin",
      "prepTimeMax",
      "cookTimeMin",
      "cookTimeMax",
    ];

    const currentFilters = filtersToWatch
      .map((key) => `${key}=${searchParams.get(key) || ""}`)
      .join("&");

    if (
      prevFiltersRef.current !== null &&
      prevFiltersRef.current !== currentFilters
    ) {
      const page = parseInt(searchParams.get("page")) || 1;
      if (page > 1) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", "1");
        router.replace(`/recipes?${newParams.toString()}`);
      }
    }

    prevFiltersRef.current = currentFilters;
  }, [
    searchParams,
    router,
    name,
    difficulty,
    subCategory,
    nutritionKey,
    nutritionOp,
    nutritionValue,
  ]);

  /**
   * @effect
   * Récupère les recettes filtrées depuis l’API `/api/recipes`.
   * Gère les erreurs et met à jour la pagination.
   */
  useEffect(() => {
    const fetchFilteredRecipes = async () => {
      setStatus("loading");
      try {
        const pageFromUrl = parseInt(searchParams.get("page")) || 1;
        setCurrentPage(pageFromUrl);

        const res = await fetch(
          `/api/recipes?${searchParams.toString()}&locale=${locale}`,
          {
            cache: "no-cache",
          }
        );
        if (!res.ok) throw new Error(t("serverError", { status: res.status }));
        const data = await res.json();

        setRecipes(data.recipes);
        setTotalPages(data.totalPages);
        setStatus("succeeded");
      } catch (err) {
        console.error(err);
        setError(err.message);
        setStatus("failed");
      }
    };
    fetchFilteredRecipes();
  }, [t, searchParams, locale]);

  /**
   * @function handlePageChange
   * @description
   * Change la page de la pagination et met à jour l’URL (page=X).
   * @param {React.ChangeEvent<unknown>} _ - Événement de changement de page (ignoré).
   * @param {number} value - Numéro de la page sélectionnée.
   */
  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    const query = new URLSearchParams(searchParams);
    query.set("page", value);
    router.push(`/${params.locale}/recipes?${query.toString()}`);
  };

  // --- États visuels ---
  if (status === "loading") {
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

  if (status === "failed") {
    return (
      <p className="text-center text-red-400">
        {t("error")} : {error}
      </p>
    );
  }

  if (status === "succeeded" && recipes.length === 0) {
    return <p className="text-center text-white/60">{t("noResults")}</p>;
  }

  // --- Rendu principal ---
  return (
    <>
      {/* --- GRILLE DE RECETTES --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Link
              href={`/${params.locale}/recipes/${recipe._id}`}
              className="block group"
            >
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
                  {recipe.strDishType || "?"} •{" "}
                  {t("servings", { count: recipe.strServings || "?" })}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* --- PAGINATION --- */}
      <div className="flex justify-center pb-20">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": { color: "white" },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            }}
          />
        </Stack>
      </div>
    </>
  );
}

/**
 * @component
 * @description
 * Page principale des recettes (`/recipes`) :
 * - Affiche la navigation (`Menu`) et le `Footer`.
 * - Contient le composant `RecipesList` chargé de l’affichage dynamique.
 * - Utilise `Suspense` pour le rendu progressif.
 *
 * @example
 * ```jsx
 * import RecipesPage from "@/app/recipes/page";
 *
 * export default function Page() {
 *   return <RecipesPage />;
 * }
 * ```
 *
 * @returns {JSX.Element} La page complète listant les recettes avec filtrage et pagination.
 */
export default function RecipesPage() {
  const t = useTranslations("RecipesPage");

  return (
    <div className="relative w-full min-h-screen text-white bg-[#0e0e0e] overflow-hidden">
      {/* --- MENU FIXE --- */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      {/* --- CONTENU PRINCIPAL --- */}
      <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">
          {t("title")}
        </h2>

        <Suspense
          fallback={
            <p className="text-white/70 text-center p-10">{t("loading")}</p>
          }
        >
          <RecipesList />
        </Suspense>
      </div>

      {/* --- PIED DE PAGE --- */}
      <Footer />
    </div>
  );
}
