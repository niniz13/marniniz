"use client";

import Image from "next/image";
import Menu from "./components/menu";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const recipes = [
    {
      id: 1,
      title: "Summer Pasta with Basil & Tomatoes",
      category: "Italian",
      description:
        "Preheat oven to 350°F. Spray a 9x13-inch baking pan with non-stick spray. " +
        "Combine soy sauce, cup water, brown sugar, ginger and garlic in a small " +
        "saucepan and cover. Bring to a boil over medium heat. Remove lid and cook " +
        "for one minute once boiling. Meanwhile, stir together the corn starch and 2 " +
        "tablespoons of water in a separate dish until smooth. Once sauce is boiling, " +
        "add mixture to the saucepan and stir to combine. Cook until the sauce starts " +
        "to thicken then remove from heat. Place the chicken breasts in the prepared pan. " +
        "Pour one cup of the sauce over top of chicken. Place chicken in oven and bake " +
        "35 minutes or until cooked through. Remove from oven and shred chicken in the " +
        "dish using two forks. Meanwhile, steam or cook the vegetables according to " +
        "package directions. Add the cooked vegetables and rice to the casserole dish " +
        "with the chicken. Add most of the remaining sauce, reserving a bit to drizzle " +
        "over the top when serving. Gently toss everything together in the casserole " +
        "dish until combined. Return to oven and cook 15 minutes. Remove from oven and " +
        "let stand 5 minutes before serving. Drizzle each serving with remaining sauce. " +
        "Enjoy!",
      image:
        "https://sugarspunrun.com/wp-content/uploads/2022/07/Summer-Garden-Pasta-3-of-5.jpg",
    },
  ];

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      {/* Hero Section */}
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
