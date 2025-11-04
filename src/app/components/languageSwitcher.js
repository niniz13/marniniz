"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import Image from "next/image";

/**
 * @fileoverview
 * Le composant `LanguageSwitcher` permet de changer dynamiquement la langue de l'application
 * dans une application Next.js utilisant `next-intl` pour la gestion de l’internationalisation.
 *
 * Il affiche le drapeau correspondant à la langue actuelle (français ou anglais)
 * et permet à l'utilisateur de sélectionner une autre langue via un `<select>` accessible
 * mais visuellement personnalisé pour un design plus attrayant.
 *
 * Le changement de langue s’effectue via `router.replace()` en conservant le chemin actuel (`pathname`).
 */

/**
 * @typedef {Object} Language
 * @property {string} code - Code de langue (ex : "fr", "en").
 * @property {string} label - Nom affiché de la langue.
 * @property {string} flag - Chemin du drapeau correspondant.
 */

/**
 * @function LanguageSwitcher
 * @description
 * Composant d’interrupteur de langue (FR / EN) avec drapeaux personnalisés et sélecteur accessible.
 *
 * Ce composant :
 * - Affiche la langue active (drapeau + nom)
 * - Permet de changer la langue via un `<select>` natif
 * - Utilise `router.replace()` pour changer la locale sans recharger la page
 *
 * @example
 * ```jsx
 * import LanguageSwitcher from "@/components/LanguageSwitcher";
 *
 * export default function Navbar() {
 *   return (
 *     <header className="flex justify-between items-center px-6 py-4">
 *       <h1 className="text-xl font-bold text-white">MealMind</h1>
 *       <LanguageSwitcher />
 *     </header>
 *   );
 * }
 * ```
 *
 * @returns {JSX.Element} Le sélecteur de langue avec drapeau et label visibles.
 */
export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  /**
   * Liste des langues disponibles avec leurs métadonnées.
   * @type {Language[]}
   */
  const languages = [
    { code: "fr", label: "Français", flag: "/fr.svg" },
    { code: "en", label: "English", flag: "/en.svg" },
  ];

  const currentLang =
    languages.find((lang) => lang.code === params.locale) || languages[0];

  /**
   * Gère le changement de langue lors de la sélection dans le `<select>`.
   * @param {React.ChangeEvent<HTMLSelectElement>} e - L’événement de changement du select.
   * @returns {void}
   */
  const handleLanguageChange = (e) => {
    const newLocale = e.target.value;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative flex items-center gap-2 backdrop-blur-3xl bg-transparent rounded-full border border-white/30 px-5 py-3 shadow-sm hover:bg-white/20 transition">
      {/* Affiche le drapeau actif */}
      <Image
        src={currentLang.flag}
        alt={currentLang.label}
        width={24}
        height={24}
        className="rounded-full"
      />

      {/* Icône de flèche */}
      <svg
        className="w-4 h-4 text-white/60 pointer-events-none ml-1"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>

      {/* Select accessible (transparent mais fonctionnel) */}
      <select
        onChange={handleLanguageChange}
        value={params.locale}
        className="absolute inset-0 opacity-0 cursor-pointer appearance-none"
        aria-label="Sélectionner la langue"
      >
        {languages.map((lang) => (
          <option
            key={lang.code}
            value={lang.code}
            className="bg-gray-800 text-white hover:bg-gray-700 py-2 px-3 rounded-md cursor-pointer"
          >
            {lang.label === "Français" ? "🇫🇷 Français" : "🇬🇧 English"}
          </option>
        ))}
      </select>
    </div>
  );
}
