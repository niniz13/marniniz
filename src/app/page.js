"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Menu from "./components/menu";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const {
    items: recipes = [],
    status,
    error,
  } = useSelector((state) => state.recipes);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredRecipes = recipes.filter((recipe) => {
      return (
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase())
      );
    });
    setSearchResults(filteredRecipes);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      <div className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="hero image"
          quality={60}
          fill
          priority
          className="object-cover brightness-75"
        />

        <div className="fixed top-0 left-0 w-full z-10">
          <Menu />
        </div>

        <div className="relative z-10 max-w-[500px] flex flex-col justify-center items-center gap-4">
          <h1 className="font-black tracking-[-0.05em] leading-[0.9] text-5xl sm:text-6xl md:text-7xl">
            MarNiniz
          </h1>

          <p className="font-extrabold text-base sm:text-lg md:text-xl">
            Discover homemade dishes made with seasonal ingredients, for
            healthy, modern and delicious cuisine.
          </p>

          <Link
            href="/recipes"
            className="backdrop-blur-md bg-transparent rounded-full border border-white/30 px-8 py-3 text-white font-bold transition-all duration-300 hover:bg-white/10 cursor-pointer"
          >
            See all recipes
          </Link>
        </div>
      </div>

      {/* Recipes Section */}
      <section className="relative z-10 bg-[#0e0e0e] py-20 px-6 sm:px-20 lg:px-40">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center">
          Featured Recipes
        </h2>

        <div className="flex flex-col gap-10 px-16">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col lg:flex-row items-center gap-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-full lg:w-1/2 h-80 relative overflow-hidden rounded-l-2xl">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="w-full lg:w-2/3 flex flex-col justify-center p-6 text-left">
                <h3 className="text-3xl font-extrabold mb-2">{recipe.title}</h3>
                <span className="text-sm uppercase text-white/60 mb-3">
                  {recipe.category}
                </span>
                <p className="text-white/80 line-clamp-5">
                  {recipe.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
