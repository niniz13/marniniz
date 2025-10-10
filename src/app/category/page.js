"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/lib/features/recipes/fetchCategories";
import Image from "next/image";
import Link from "next/link";
import Menu from "../components/menu";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const {
    categories = [],
    status,
    error,
  } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="relative min-h-screen bg-[#0e0e0e] text-white">
      <div className="fixed top-0 left-0 w-full z-10 backdrop-blur-md">
        <Menu />
      </div>

      <div className="pt-32 px-6 sm:px-20 lg:px-40">
        <h1 className="text-4xl font-extrabold mb-10 text-center">
          Categories
        </h1>

        {status === "loading" && (
          <p className="text-center text-white/70">Loading...</p>
        )}
        {status === "failed" && (
          <p className="text-center text-red-400">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.idCategory}
              href={`/category/${encodeURIComponent(cat.strCategory)}`}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all"
            >
              <div className="relative w-full h-48">
                <Image
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  fill
                  quality={60}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold">{cat.strCategory}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
