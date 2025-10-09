'use client';

import { useState } from "react";
import GlassInput from "./glassInput";
import Link from "next/link";
import { User, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import fetchRecipes from "../../lib/store/recipes/recipesSlice";

export default function Menu() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchValue);
    if (searchValue.trim() !== "") {
      dispatch(fetchRecipes(searchValue));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex flex-row justify-between items-center gap-4 px-[50px] py-5">
      <Link href="/" className="font-black text-2xl tracking-[-0.05em]">
        MarNiniz
      </Link>

      <div className="flex items-center gap-4">
        <Link
          href="/recipes"
          className="font-bold text-lg tracking-[-0.03em] hover:underline"
        >
          Recipes
        </Link>

        <Link
          href="/category"
          className="font-bold text-lg tracking-[-0.03em] hover:underline"
        >
          Category
        </Link>

        <div className="relative flex items-center">
          <GlassInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
          >
            <Search size={20} strokeWidth={2} />
          </button>
        </div>

        <a
          href="/profile"
          className="backdrop-blur-md bg-transparent rounded-full border border-white/30 p-3 text-white transition-all duration-300 hover:bg-white/10 cursor-pointer"
        >
          <User size={22} strokeWidth={2.2} />
        </a>
      </div>
    </div>
  );
}
