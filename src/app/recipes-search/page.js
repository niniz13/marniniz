"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Menu from "../components/menu";

export default function SearchPage() {
  const router = useRouter();

  const [filters, setFilters] = useState({
    name: "",
    category: "",
    area: "",
    minIngredients: "",
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

    if (filters.name) params.set("name", filters.name);
    if (filters.category) params.set("category", filters.category);
    if (filters.area) params.set("area", filters.area);
    if (filters.minIngredients)
      params.set("minIngredients", filters.minIngredients);

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      {/* Menu */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      {/* Content */}
      <div className="pt-32 px-20 sm:px-20 lg:px-80 mx-auto">
        <h1 className="text-4xl font-bold mb-10">Rechercher des recettes</h1>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center space-y-6"
        >
          {/* Name */}
          <div className="w-full">
            <label className="block mb-2 font-medium">Nom de la recette</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleChange}
              placeholder="ex: Chicken"
              className="flex items-center justify-center gap-3 w-full bg-white/10 text-white font-semibold p-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30"
            />
          </div>

          {/* Category */}
          <div className="w-full">
            <label className="block mb-2 font-medium">Catégorie</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="flex items-center justify-center gap-3 w-full bg-white/10 text-white font-semibold p-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30"
            >
              <option value="">-- Choisir une catégorie --</option>
              <option value="Beef">Beef</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Chicken">Chicken</option>
              <option value="Dessert">Dessert</option>
              <option value="Goat">Goat</option>
              <option value="Lamb">Lamb</option>
              <option value="Miscellaneous">Miscellaneous</option>
              <option value="Pasta">Pasta</option>
              <option value="Pork">Pork</option>
              <option value="Seafood">Seafood</option>
              <option value="Side">Side</option>
              <option value="Starter">Starter</option>
              <option value="Vegan">Vegan</option>
              <option value="Vegetarian">Vegetarian</option>
            </select>
          </div>

          {/* Area */}
          <div className="w-full">
            <label className="block mb-2 font-medium">Origine / Area</label>
            <select
              name="area"
              value={filters.area}
              onChange={handleChange}
              className="flex items-center justify-center gap-3 w-full bg-white/10 text-white font-semibold p-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30"
            >
              <option value="">-- Choisir une zone --</option>
              <option value="American">American</option>
              <option value="British">British</option>
              <option value="Canadian">Canadian</option>
              <option value="Chinese">Chinese</option>
              <option value="Croatian">Croatian</option>
              <option value="Dutch">Dutch</option>
              <option value="Egyptian">Egyptian</option>
              <option value="Filipino">Filipino</option>
              <option value="French">French</option>
              <option value="Greek">Greek</option>
              <option value="Indian">Indian</option>
              <option value="Irish">Irish</option>
              <option value="Italian">Italian</option>
              <option value="Jamaican">Jamaican</option>
              <option value="Japanese">Japanese</option>
              <option value="Kenyan">Kenyan</option>
              <option value="Malaysian">Malaysian</option>
              <option value="Mexican">Mexican</option>
              <option value="Moroccan">Moroccan</option>
              <option value="Polish">Polish</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Russian">Russian</option>
              <option value="Spanish">Spanish</option>
              <option value="Syrian">Syrian</option>
              <option value="Thai">Thai</option>
              <option value="Tunisian">Tunisian</option>
              <option value="Turkish">Turkish</option>
              <option value="Ukrainian">Ukrainian</option>
              <option value="Uruguayan">Uruguayan</option>
              <option value="Vietnamese">Vietnamese</option>
            </select>
          </div>

          {/* Ingredients */}
          <div className="w-full">
            <label className="block mb-2 font-medium">
              Nombre minimum d'ingrédients
            </label>
            <input
              type="number"
              min="1"
              name="minIngredients"
              value={filters.minIngredients}
              onChange={handleChange}
              placeholder="ex: 5"
              className="flex items-center justify-center gap-3 w-full bg-white/10 text-white font-semibold p-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-red-600 rounded-sm px-8 py-3 w-1/2 text-white font-bold transition-all duration-300 hover:bg-red-400 cursor-pointer mt-4"
          >
            Rechercher
          </button>
        </motion.form>
      </div>
    </div>
  );
}
