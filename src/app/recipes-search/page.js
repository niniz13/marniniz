"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Menu from "../components/menu";
import Footer from "../components/footer";

export default function SearchPage() {
  const router = useRouter();

  const [filters, setFilters] = useState({
    name: "",
    category: "",
    area: "",
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

    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== "") params.set(key, val);
    });

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      <div className="py-32 px-20 sm:px-20 lg:px-80 mx-auto">
        <h1 className="text-4xl font-bold mb-10">Rechercher des recettes</h1>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center space-y-6"
        >
          {/* Nom */}
          <div className="w-full">
            <label className="block mb-2 font-medium">Nom de la recette</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleChange}
              placeholder="ex: Apple Bread"
              className="w-full bg-white/10 text-white font-semibold p-3 rounded-lg border border-white/30"
            />
          </div>

          {/* Temps de préparation */}
          <div className="w-full grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">
                Préparation min (min)
              </label>
              <input
                type="number"
                name="prepTimeMin"
                value={filters.prepTimeMin}
                onChange={handleChange}
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/30"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">
                Préparation max (min)
              </label>
              <input
                type="number"
                name="prepTimeMax"
                value={filters.prepTimeMax}
                onChange={handleChange}
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/30"
              />
            </div>
          </div>

          {/* Temps de cuisson */}
          <div className="w-full grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">
                Cuisson min (min)
              </label>
              <input
                type="number"
                name="cookTimeMin"
                value={filters.cookTimeMin}
                onChange={handleChange}
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/30"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">
                Cuisson max (min)
              </label>
              <input
                type="number"
                name="cookTimeMax"
                value={filters.cookTimeMax}
                onChange={handleChange}
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/30"
              />
            </div>
          </div>

          {/* Ingrédients min / max */}
          <div className="w-full grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">
                Nombre minimum d&apos;ingrédients
              </label>
              <input
                type="number"
                name="minIngredients"
                value={filters.minIngredients}
                onChange={handleChange}
                placeholder="ex: 3"
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/30"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">
                Nombre maximum d&apos;ingrédients
              </label>
              <input
                type="number"
                name="maxIngredients"
                value={filters.maxIngredients}
                onChange={handleChange}
                placeholder="ex: 10"
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/30"
              />
            </div>
          </div>

          {/* Nutrition */}
          <div className="w-full grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-medium">Type nutrition</label>
              <select
                name="nutritionKey"
                value={filters.nutritionKey}
                onChange={handleChange}
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/30"
              >
                <option value="">-- Choisir --</option>
                <option value="Total Fat">Total Fat</option>
                <option value="Sodium">Sodium</option>
                <option value="Total Carbohydrate">Total Carbohydrate</option>
                <option value="Protein">Protein</option>
                <option value="Calories">Calories</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Condition</label>
              <select
                name="nutritionOp"
                value={filters.nutritionOp}
                onChange={handleChange}
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/30"
              >
                <option value="lt">&lt; (inférieur à)</option>
                <option value="gt">&gt; (supérieur à)</option>
                <option value="eq">= (égal à)</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Valeur</label>
              <input
                type="number"
                name="nutritionValue"
                value={filters.nutritionValue}
                onChange={handleChange}
                placeholder="ex: 10"
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/30"
              />
            </div>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="bg-red-600 rounded-sm px-8 py-3 w-1/2 text-white font-bold transition-all duration-300 hover:bg-red-400 cursor-pointer mt-4"
          >
            Rechercher
          </button>
        </motion.form>
      </div>

      <Footer />
    </div>
  );
}
