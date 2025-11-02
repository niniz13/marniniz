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
import { useTranslations } from 'next-intl';

function RecipesList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const t = useTranslations('RecipesPage');

  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );

  const prevFiltersRef = useRef(null);

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

    if (prevFiltersRef.current !== null && prevFiltersRef.current !== currentFilters) {
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
    searchParams.get("name"),
    searchParams.get("difficulty"),
    searchParams.get("subCategory"),
    searchParams.get("nutritionKey"),
    searchParams.get("nutritionOp"),
    searchParams.get("nutritionValue"),
  ]);

  useEffect(() => {
    const fetchFilteredRecipes = async () => {
      setStatus("loading");
      try {
        const pageFromUrl = parseInt(searchParams.get("page")) || 1;
        setCurrentPage(pageFromUrl);

        const res = await fetch(`/api/recipes?${searchParams.toString()}`, {
          cache: "force-cache",
        });
        if (!res.ok) throw new Error(t('serverError', { status: res.status }));
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
  }, [t, searchParams]);

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    const query = new URLSearchParams(searchParams);
    query.set("page", value);
    router.push(`/${params.locale}/recipes?${query.toString()}`);
  };

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
    return <p className="text-center text-red-400">{t('error')} : {error}</p>;
  }

  if (status === "succeeded" && recipes.length === 0) {
    return (
      <p className="text-center text-white/60">
        {t('noResults')}
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Link href={`/${params.locale}/recipes/${recipe._id}`} className="block group">
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
                  {recipe.strDishType || "?"} • {t('servings', { count: recipe.strServings || "?" })}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Pagination MUI */}
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

export default function RecipesPage() {
  const t = useTranslations('RecipesPage');

  return (
    <div className="relative w-full min-h-screen text-white bg-[#0e0e0e] overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">
          {t('title')}
        </h2>

        <Suspense
          fallback={
            <p className="text-white/70 text-center p-10">{t('loading')}</p>
          }
        >
          <RecipesList />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
