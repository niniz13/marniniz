"use client";

import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import Skeleton from "@mui/material/Skeleton";
import Menu from "@/app/components/menu";
import Footer from "@/app/components/footer";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/**
 * @fileoverview
 * Le composant `MyRecipesPage` affiche la liste des recettes favorites d’un utilisateur connecté.
 *
 * Fonctionnalités principales :
 * - Récupération sécurisée des favoris via `/api/user/favorites`
 * - Affichage dynamique avec gestion des statuts (`loading`, `unauthorized`, `failed`, `succeeded`)
 * - Utilisation de **Skeletons** pendant le chargement
 * - Animations d’apparition avec **Framer Motion**
 * - Gestion multilingue via **next-intl**
 * - Vérification automatique de session avec **NextAuth**
 */

/**
 * @component
 * @description
 * Affiche la liste des recettes favorites de l’utilisateur authentifié.
 * Utilise `next-auth` pour vérifier la session, `next-intl` pour la traduction,
 * et `framer-motion` pour les animations d’apparition.
 *
 * @returns {JSX.Element} Liste animée des recettes favorites ou messages d’état (chargement, erreur, vide, non connecté).
 */
function FavoriteRecipesList() {
  const { data: session, status: authStatus } = useSession();
  const t = useTranslations("MyRecipesPage");
  const locale = useLocale();

  // --- États internes ---
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | succeeded | failed | unauthorized
  const [error, setError] = useState(null);

  /**
   * @effect
   * Récupère la liste des recettes favorites de l’utilisateur connecté.
   * Si aucun utilisateur n’est connecté → statut "unauthorized".
   */
  useEffect(() => {
    if (authStatus === "loading") return;
    if (!session?.user?.id) {
      setStatus("unauthorized");
      return;
    }

    const fetchFavorites = async () => {
      setStatus("loading");
      try {
        const res = await fetch(`/api/user/favorites?locale=${locale}`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error(t("serverError", { status: res.status }));

        const data = await res.json();
        setRecipes(data.recipes || []);
        setStatus("succeeded");
      } catch (err) {
        console.error(err);
        setError(err.message);
        setStatus("failed");
      }
    };

    fetchFavorites();
  }, [session, authStatus, t, locale]);

  // --- ÉTATS D’AFFICHAGE ---

  // Skeleton de chargement
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

  // Utilisateur non connecté
  if (status === "unauthorized") {
    return (
      <p className="text-center text-white/60 pb-20">{t("unauthorized")}</p>
    );
  }

  // Erreur serveur
  if (status === "failed") {
    return (
      <p className="text-center text-red-400 pb-20">
        {t("error")}: {error}
      </p>
    );
  }

  // Aucun favori
  if (status === "succeeded" && recipes.length === 0) {
    return <p className="text-center text-white/60 pb-20">{t("noRecipes")}</p>;
  }

  // Liste des favoris
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
                {recipe.strDishType || "?"} •{" "}
                {t("servings", { count: recipe.strServings || "?" })}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * @component
 * @description
 * Page principale "Mes recettes" — affiche les recettes favorites de l’utilisateur connecté.
 * Gère le chargement asynchrone via `<Suspense />` et inclut les composants globaux `Menu` et `Footer`.
 *
 * @returns {JSX.Element} Page complète listant les recettes favorites.
 */
export default function MyRecipesPage() {
  const t = useTranslations("MyRecipesPage");

  return (
    <div className="relative w-full min-h-screen text-white bg-[#0e0e0e] overflow-hidden">
      {/* Barre de menu */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      {/* Contenu principal */}
      <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">
          {t("title")}
        </h2>

        <Suspense
          fallback={
            <p className="text-white/70 text-center p-10">{t("loading")}</p>
          }
        >
          <FavoriteRecipesList />
        </Suspense>
      </div>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}
