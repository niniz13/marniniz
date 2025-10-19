"use client";

import { useState, useEffect, useRef } from "react";
import GlassInput from "./glassInput";
import Link from "next/link";
import {
  User,
  Search,
  LogOut,
  Settings,
  Calendar,
  BookOpen,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Menu() {
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // user menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // burger menu
  const menuRef = useRef(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSearch = () => {
    const trimmed = searchValue.trim();
    if (trimmed !== "") {
      router.push(`/recipes?name=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex justify-between items-center gap-4 md:px-24 px-8 py-5 relative">
      <Link href="/" className="font-black text-2xl tracking-[-0.05em]">
        MealMind
      </Link>

      {/* --- MENU DESKTOP --- */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/planning-ia"
          className="font-bold text-lg tracking-[-0.03em] hover:underline"
        >
          Planning IA
        </Link>
        <Link
          href="/recipes-search"
          className="font-bold text-lg tracking-[-0.03em] hover:underline"
        >
          Recettes
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

        {/* USER MENU */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="backdrop-blur-3xl bg-transparent rounded-full border border-white/30 p-3 text-white transition-all duration-300 hover:bg-white/10 cursor-pointer"
          >
            <User size={22} strokeWidth={2.2} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-56 backdrop-blur-3xl border border-white/20 rounded-xl shadow-lg"
              >
                <div className="p-3 text-sm text-white/80">
                  {session ? (
                    <>
                      {/* Header */}
                      <div className="flex items-center gap-3 px-2 py-1">
                        {session.user.image && (
                          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white/10 border border-white/20">
                            <Image
                              src={session.user.image}
                              alt="User"
                              width={32}
                              height={32}
                              className="rounded-full object-cover w-full h-full"
                            />
                          </div>
                        )}
                        <p className="truncate text-white font-medium">
                          {session.user.name || session.user.email}
                        </p>
                      </div>

                      <hr className="border-white/10 my-2" />

                      {/* Links */}
                      <button
                        onClick={() => {
                          router.push("/my-recipes");
                          setMenuOpen(false);
                        }}
                        className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition-all"
                      >
                        <BookOpen size={18} /> Mes recettes
                      </button>

                      <button
                        onClick={() => {
                          router.push("/my-plannings");
                          setMenuOpen(false);
                        }}
                        className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition-all"
                      >
                        <Calendar size={18} /> Mes plannings
                      </button>

                      <button
                        onClick={() => {
                          router.push("/settings");
                          setMenuOpen(false);
                        }}
                        className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition-all"
                      >
                        <Settings size={18} /> Paramètres
                      </button>

                      <hr className="border-white/10 my-2" />

                      {/* Logout */}
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-red-400 transition-all"
                      >
                        <LogOut size={18} /> Déconnexion
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => router.push("/login")}
                        className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition-all"
                      >
                        <User size={18} /> Connexion
                      </button>
                      <button
                        onClick={() => router.push("/register")}
                        className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition-all"
                      >
                        <User size={18} /> Inscription
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- BURGER BUTTON MOBILE --- */}
      <button
        className="md:hidden p-2"
        onClick={() => setMobileMenuOpen(true)}
      >
        <MenuIcon size={28} />
      </button>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg p-6 flex flex-col"
          >
            <button
              className="self-end mb-6"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={28} />
            </button>

            <div className="flex flex-col gap-6 text-white text-lg items-center">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-center">
                Home
              </Link>
              <Link href="/planning-ia" onClick={() => setMobileMenuOpen(false)} className="text-center">
                Planning IA
              </Link>
              <Link href="/recipes-search" onClick={() => setMobileMenuOpen(false)} className="text-center">
                Recettes
              </Link>

              {session ? (
                <>
                  <Link href="/my-recipes" onClick={() => setMobileMenuOpen(false)} className="text-center">
                    Mes recettes
                  </Link>
                  <Link href="/my-plannings" onClick={() => setMobileMenuOpen(false)} className="text-center">
                    Mes plannings
                  </Link>
                  <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="text-center">
                    Paramètres
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-red-400 text-center"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-center">
                    Connexion
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="text-center">
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
