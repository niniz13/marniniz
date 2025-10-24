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

      <div className="pt-32 pb-20 px-6 sm:px-10 md:px-20 lg:px-40">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
          Rechercher des recettes
        </h1>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto flex flex-col space-y-6"
        >
          {/* Nom */}
          <div className="w-full">
            <label className="block mb-2 font-medium text-white/80">
              Nom de la recette
            </label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleChange}
              placeholder="ex: Apple Bread"
              className="w-full bg-white/10 text-white font-semibold p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
            />
          </div>

          {/* Temps de préparation */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-white/80">
                Préparation min (min)
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
                Préparation max (min)
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
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-white/80">
                Cuisson min (min)
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
                Cuisson max (min)
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
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-white/80">
                Nombre minimum d&apos;ingrédients
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
                Nombre maximum d&apos;ingrédients
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
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-medium text-white/80">
                Type nutrition
              </label>
              <select
                name="nutritionKey"
                value={filters.nutritionKey}
                onChange={handleChange}
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
              >
                <option value="">-- Choisir --</option>
                <option value="Total Fat">Total Fat</option>
                <option value="Sodium">Sodium</option>
                <option value="Total Carbohydrate">Total Carbohydrate</option>
                <option value="Dietary Fiber">Dietary Fiber</option>
                <option value="Total Sugars">Total Sugars</option>
                <option value="Protein">Protein</option>
                <option value="Vitamin C">Vitamin C</option>
                <option value="Calcium">Calcium</option>
                <option value="Iron">Iron</option>
                <option value="Potassium">Potassium</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium text-white/80">
                Condition
              </label>
              <select
                name="nutritionOp"
                value={filters.nutritionOp}
                onChange={handleChange}
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
              >
                <option value="lt">&lt; (inférieur à)</option>
                <option value="gt">&gt; (supérieur à)</option>
                <option value="eq">= (égal à)</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium text-white/80">
                Valeur
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
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 transition-all duration-300 font-bold rounded-lg px-6 py-3 w-full sm:w-1/2"
            >
              Rechercher
            </button>
          </div>
        </motion.form>
      </div>

      <Footer />
    </div>
  );
}
