"use client";

import { useState, useEffect, useRef } from "react";
import GlassInput from "./glassInput";
import { Link } from "@/i18n/routing";
import {
  User,
  Search,
  LogOut,
  Settings,
  Calendar,
  BookOpen,
  Menu as MenuIcon,
  X,
  Loader2,
} from "lucide-react";
import { useRouter as useNextRouter, useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LanguageSwitcher from "./languageSwitcher";

/**
 * @fileoverview
 * Le composant `Menu` gère la barre de navigation principale du site.
 * Il inclut :
 * - La navigation entre les pages principales (`Home`, `Recipes`, etc.)
 * - Un champ de recherche intelligent (`GlassInput`) avec redirection.
 * - La gestion du compte utilisateur (connexion, déconnexion, paramètres, etc.)
 * - Un `LanguageSwitcher` pour le changement de langue dynamique.
 * - Une version mobile responsive avec menu burger animé (Framer Motion).
 *
 * Ce composant s’intègre avec :
 * - **NextAuth** pour la gestion de session utilisateur.
 * - **next-intl** pour les traductions.
 * - **Framer Motion** pour les animations de menus.
 * - **TailwindCSS** pour le style réactif.
 */

/**
 * @component
 * @description
 * Composant principal du menu de navigation (desktop et mobile) pour le site MealMind.
 * Il gère l’état de la recherche, l’ouverture des menus et les interactions utilisateur
 * selon le statut de session.
 *
 * @example
 * ```jsx
 * import Menu from "@/components/Menu";
 *
 * export default function Header() {
 *   return (
 *     <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-lg">
 *       <Menu />
 *     </header>
 *   );
 * }
 * ```
 *
 * @returns {JSX.Element} La barre de navigation complète et réactive du site.
 */
export default function Menu() {
  // --- États locaux ---
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Référence du menu utilisateur (pour fermer en cas de clic extérieur)
  const menuRef = useRef(null);

  // --- Hooks Next.js & next-intl ---
  const router = useRouter();
  const params = useParams();
  const t = useTranslations("Menu");

  // --- Gestion de session (NextAuth) ---
  const { data: session, status } = useSession();

  /**
   * @function handleSearch
   * @description
   * Gère la recherche utilisateur :
   * - Supprime les espaces inutiles.
   * - Redirige vers la page de résultats avec `name` et `page=1`.
   */
  const handleSearch = () => {
    const trimmed = searchValue.trim();
    if (trimmed !== "") {
      const newUrl = `/recipes?name=${encodeURIComponent(trimmed)}&page=1`;
      router.push(newUrl);
    }
  };

  /**
   * @function handleKeyPress
   * @description
   * Déclenche la recherche lorsqu'on appuie sur la touche "Entrée".
   * @param {React.KeyboardEvent<HTMLInputElement>} e - L’événement clavier du champ de recherche.
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  /**
   * Ferme automatiquement le menu utilisateur quand l’utilisateur clique à l’extérieur.
   */
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
    <div className="w-full flex justify-between items-center gap-4 px-6 sm:px-12 md:px-20 lg:px-40 py-5 relative">
      {/* --- LOGO --- */}
      <Link href="/" className="font-black text-2xl tracking-[-0.05em]">
        MealMind
      </Link>

      {/* --- MENU DESKTOP --- */}
      <div className="hidden md:flex items-center gap-8">
        {/* Liens principaux */}
        <Link
          href="/recipes-search"
          className="font-bold text-lg tracking-[-0.03em] hover:underline"
        >
          {t("recipes")}
        </Link>

        {/* Barre de recherche */}
        <div className="relative flex items-center">
          <GlassInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            aria-label="Rechercher une recette"
            className="absolute right-2 p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
          >
            <Search size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Sélecteur de langue */}
        <LanguageSwitcher />

        {/* --- MENU UTILISATEUR --- */}
        <div className="relative" ref={menuRef}>
          {/* Loader pendant la récupération de session */}
          {status === "loading" ? (
            <div className="backdrop-blur-3xl bg-transparent rounded-full border border-white/30 p-3 text-white">
              <Loader2 size={22} className="animate-spin" />
            </div>
          ) : (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Ouvrir le menu utilisateur"
              className="backdrop-blur-3xl bg-transparent rounded-full border border-white/30 p-3 text-white transition-all duration-300 hover:bg-white/10 cursor-pointer"
            >
              <User size={22} strokeWidth={2.2} />
            </button>
          )}

          {/* --- POPUP DU MENU UTILISATEUR --- */}
          <AnimatePresence>
            {menuOpen && status === "authenticated" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-56 backdrop-blur-3xl border border-white/20 rounded-xl shadow-lg"
              >
                <div className="p-3 text-sm text-white/80">
                  {/* Profil utilisateur */}
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

                  {/* Liens utilisateur */}
                  <button
                    onClick={() => {
                      router.push("/my-recipes");
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition-all"
                  >
                    <BookOpen size={18} /> {t("myRecipes")}
                  </button>

                  <button
                    onClick={() => {
                      router.push("/settings");
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition-all"
                  >
                    <Settings size={18} /> {t("settings")}
                  </button>

                  <hr className="border-white/10 my-2" />

                  <button
                    onClick={() =>
                      signOut({ callbackUrl: `/${params.locale}` })
                    }
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-red-400 transition-all"
                  >
                    <LogOut size={18} /> {t("logout")}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Menu si non connecté */}
            {menuOpen && status === "unauthenticated" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-56 backdrop-blur-3xl border border-white/20 rounded-xl shadow-lg"
              >
                <div className="p-3 text-sm text-white/80">
                  <button
                    onClick={() => router.push("/login")}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition-all"
                  >
                    <User size={18} /> {t("login")}
                  </button>
                  <button
                    onClick={() => router.push("/register")}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition-all"
                  >
                    <User size={18} /> {t("register")}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- BURGER MENU MOBILE --- */}
      <button className="md:hidden p-2" aria-label="Ouvrir le menu de navigation" onClick={() => setMobileMenuOpen(true)}>
        <MenuIcon size={28} />
      </button>

      {/* --- MENU MOBILE --- */}
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
              aria-label="Fermer le menu de navigation"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={28} />
            </button>

            <div className="flex flex-col gap-6 text-white text-lg items-center">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                {t("home")}
              </Link>
              <Link
                href="/recipes-search"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("recipes")}
              </Link>

              {status === "loading" ? (
                <div className="animate-spin text-white/60">
                  <Loader2 size={26} />
                </div>
              ) : session ? (
                <>
                  <Link
                    href="/my-recipes"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("myRecipes")}
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("settings")}
                  </Link>
                  <button
                    onClick={() =>
                      signOut({ callbackUrl: `/${params.locale}` })
                    }
                    className="text-red-400"
                  >
                    {t("logout")}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    {t("login")}
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("register")}
                  </Link>
                </>
              )}

              {/* Sélecteur de langue mobile */}
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
