"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Menu from "@/app/components/menu";
import Footer from "@/app/components/footer";
import { useTranslations } from "next-intl";

/**
 * @fileoverview
 * Le composant `SearchPage` permet à l’utilisateur de filtrer et rechercher des recettes
 * selon différents critères :
 * - Nom, difficulté, sous-catégorie
 * - Temps de préparation / cuisson
 * - Nombre d’ingrédients
 * - Valeurs nutritionnelles (type, opérateur, valeur)
 *
 * Une fois le formulaire soumis, les filtres sont passés dans l’URL
 * et la navigation redirige vers la page `/recipes` avec les bons paramètres (`?name=&difficulty=&...`).
 *
 * Il utilise :
 * - **next-intl** pour la traduction des labels et catégories
 * - **Framer Motion** pour une animation fluide à l’apparition
 * - **Next.js router** pour construire dynamiquement la recherche
 */

/**
 * @constant {string[]} difficulties
 * Liste des niveaux de difficulté disponibles pour filtrer les recettes.
 * Les clés sont traduites via `t("difficulties.key")`.
 */
const difficulties = ["easy", "medium", "hard"];

/**
 * @constant {string[]} subCategoriesKeys
 * Liste des sous-catégories possibles pour filtrer les recettes.
 * Chaque clé est traduite avec `t("categories.key")`.
 */
const subCategoriesKeys = [
  "barbecues",
  "batchCooking",
  "birthdays",
  "biscuits",
  "bread",
  "breakfast",
  "budgetDinners",
  "cakes",
  "cheese",
  "chicken",
  "cocktails",
  "coffees",
  "desserts",
  "dinner",
  "fishSeafood",
  "fitness",
  "freeFromBaking",
  "freezableMeals",
  "highProtein",
  "hosting",
  "keto",
  "kidsBaking",
  "kidsBirthdays",
  "lowCalorie",
  "lunch",
  "meat",
  "mocktails",
  "pasta",
  "picnics",
  "quickBakes",
  "salads",
  "savouryPastries",
  "slowCooker",
  "smoothies",
  "specialOccasions",
  "springRecipes",
  "storecupboard",
  "studentMeals",
  "sweetTreats",
  "teas",
  "vegan",
  "veganBaking",
  "vegetarian",
];

/**
 * @constant {string[]} nutritionTypesKeys
 * Liste des types de valeurs nutritionnelles filtrables (kcal, protéines, etc.),
 * traduits via `t("nutritionLabels.key")`.
 */
const nutritionTypesKeys = [
  "kcal",
  "fat",
  "saturates",
  "carbs",
  "sugars",
  "fibre",
  "protein",
  "salt",
];

/**
 * @component
 * @description
 * Page de recherche avancée des recettes.
 * Fournit un formulaire complet de filtres et redirige vers `/recipes` avec les paramètres d’URL.
 *
 * @example
 * ```jsx
 * import SearchPage from "@/app/search/page";
 *
 * export default function Page() {
 *   return <SearchPage />;
 * }
 * ```
 *
 * @returns {JSX.Element} Formulaire animé avec filtres dynamiques et recherche redirigeant vers la page des recettes.
 */
export default function SearchPage() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations("RecipesSearchPage");

  // --- État local des filtres ---
  const [filters, setFilters] = useState({
    name: "",
    difficulty: "",
    subCategory: "",
    minIngredients: "",
    maxIngredients: "",
    prepTimeMin: "",
    prepTimeMax: "",
    cookTimeMin: "",
    cookTimeMax: "",
    nutritionKey: "",
    nutritionOp: "lt",
    nutritionValue: "",
  });

  /**
   * @function handleChange
   * @description Met à jour l’état local des filtres à chaque saisie utilisateur.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - Événement de saisie ou sélection.
   */
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * @function handleSearch
   * @description
   * Construit les paramètres de recherche et redirige l’utilisateur
   * vers la page `/recipes` avec les filtres appliqués.
   * @param {React.FormEvent<HTMLFormElement>} e - Soumission du formulaire.
   */
  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== "") queryParams.set(key, val);
    });
    router.push(`/${params.locale}/recipes?${queryParams.toString()}`);
  };

  // --- Rendu principal ---
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      {/* Menu global */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      {/* Contenu principal */}
      <div className="pt-32 pb-20 px-6 sm:px-10 md:px-20 lg:px-40">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
          {t("title")}
        </h1>

        {/* Formulaire animé */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto flex flex-col space-y-8"
        >
          {/* --- Nom de recette --- */}
          <div>
            <label className="block mb-2 font-medium text-white/80">
              {t("searchPlaceholder")}
            </label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleChange}
              placeholder={t("searchPlaceholder")}
              className="w-full bg-white/10 text-white font-semibold p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
            />
          </div>

          {/* --- Difficulté --- */}
          <div>
            <label className="block mb-2 font-medium text-white/80">
              {t("difficulty")}
            </label>
            <select
              name="difficulty"
              value={filters.difficulty}
              onChange={handleChange}
              className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
            >
              <option value="">{t("chooseOption")}</option>
              {difficulties.map((key) => (
                <option key={key} value={t(`difficulties.${key}`)}>
                  {t(`difficulties.${key}`)}
                </option>
              ))}
            </select>
          </div>

          {/* --- Sous-catégorie --- */}
          <div>
            <label className="block mb-2 font-medium text-white/80">
              {t("category")}
            </label>
            <select
              name="subCategory"
              value={filters.subCategory}
              onChange={handleChange}
              className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
            >
              <option value="">{t("chooseOption")}</option>
              {subCategoriesKeys.map((key) => (
                <option key={key} value={t(`categories.${key}`)}>
                  {t(`categories.${key}`)}
                </option>
              ))}
            </select>
          </div>

          {/* --- Temps de préparation --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-white/80">
                {t("prepTimeMin")}
              </label>
              <input
                type="number"
                name="prepTimeMin"
                value={filters.prepTimeMin}
                onChange={handleChange}
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-white/80">
                {t("prepTimeMax")}
              </label>
              <input
                type="number"
                name="prepTimeMax"
                value={filters.prepTimeMax}
                onChange={handleChange}
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
              />
            </div>
          </div>

          {/* --- Temps de cuisson --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-white/80">
                {t("cookTimeMin")}
              </label>
              <input
                type="number"
                name="cookTimeMin"
                value={filters.cookTimeMin}
                onChange={handleChange}
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-white/80">
                {t("cookTimeMax")}
              </label>
              <input
                type="number"
                name="cookTimeMax"
                value={filters.cookTimeMax}
                onChange={handleChange}
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
              />
            </div>
          </div>

          {/* --- Ingrédients min/max --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-white/80">
                {t("minIngredients")}
              </label>
              <input
                type="number"
                name="minIngredients"
                value={filters.minIngredients}
                onChange={handleChange}
                placeholder="ex: 3"
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-white/80">
                {t("maxIngredients")}
              </label>
              <input
                type="number"
                name="maxIngredients"
                value={filters.maxIngredients}
                onChange={handleChange}
                placeholder="ex: 10"
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
              />
            </div>
          </div>

          {/* --- Nutrition --- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Type nutritionnel */}
            <div>
              <label className="block mb-2 font-medium text-white/80">
                {t("nutritionType")}
              </label>
              <select
                name="nutritionKey"
                value={filters.nutritionKey}
                onChange={handleChange}
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
              >
                <option value="">{t("chooseOption")}</option>
                {nutritionTypesKeys.map((key) => (
                  <option key={key} value={key}>
                    {t(`nutritionLabels.${key}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Opérateur */}
            <div>
              <label className="block mb-2 font-medium text-white/80">
                {t("nutritionOperator")}
              </label>
              <select
                name="nutritionOp"
                value={filters.nutritionOp}
                onChange={handleChange}
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
              >
                <option value="lt">&lt; ({t("lessThan")})</option>
                <option value="gt">&gt; ({t("greaterThan")})</option>
                <option value="eq">= (=)</option>
              </select>
            </div>

            {/* Valeur */}
            <div>
              <label className="block mb-2 font-medium text-white/80">
                {t("nutritionValue")}
              </label>
              <input
                type="number"
                name="nutritionValue"
                value={filters.nutritionValue}
                onChange={handleChange}
                placeholder="ex: 10"
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
              />
            </div>
          </div>

          {/* --- Bouton de recherche --- */}
          <div className="flex justify-center w-full pt-6">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 transition-all duration-300 font-bold rounded-lg px-6 py-3 w-full sm:w-1/2"
            >
              {t("searchButton")}
            </button>
          </div>
        </motion.form>
      </div>

      <Footer />
    </div>
  );
}
