"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Menu from "@/app/components/menu";
import Footer from "@/app/components/footer";
import { useTranslations } from "next-intl";

// ✅ Difficultés et catégories traduites via t()
const difficulties = ["easy", "medium", "hard"];
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

// ✅ Types de valeurs nutritionnelles traduites via t()
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

export default function SearchPage() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations("RecipesSearchPage");

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

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== "") queryParams.set(key, val);
    });
    router.push(`/${params.locale}/recipes?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      <div className="pt-32 pb-20 px-6 sm:px-10 md:px-20 lg:px-40">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
          {t("title")}
        </h1>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto flex flex-col space-y-8"
        >
          {/* Nom */}
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

          {/* Difficulté */}
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

          {/* Sous-catégorie */}
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

          {/* Temps de préparation */}
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

          {/* Temps de cuisson */}
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

          {/* Ingrédients min / max */}
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

          {/* Nutrition */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

          {/* Bouton */}
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
