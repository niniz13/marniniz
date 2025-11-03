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
 * mais visuellement masqué pour conserver un design minimaliste.
 *
 * Le changement de langue s’effectue via `router.replace()` en conservant le chemin actuel (`pathname`).
 */

/**
 * @component
 * @description
 * Composant d’interrupteur de langue (FR / EN) avec drapeau et sélection accessible.
 *
 * @example
 * ```jsx
 * import LanguageSwitcher from "@/components/LanguageSwitcher";
 *
 * export default function Navbar() {
 *   return (
 *     <header className="flex justify-between items-center px-6 py-4">
 *       <h1 className="text-xl font-bold text-white">My App</h1>
 *       <LanguageSwitcher />
 *     </header>
 *   );
 * }
 * ```
 *
 * @returns {JSX.Element} Le sélecteur de langue affichant le drapeau correspondant.
 */
export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  /**
   * Gère le changement de langue lors de la sélection dans le `<select>`.
   * Met à jour la locale via le routeur sans recharger la page.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e - L’événement de changement du select.
   */
  const handleLanguageChange = (e) => {
    const newLocale = e.target.value;
    router.replace(pathname, { locale: newLocale });
  };

  // Détermine le drapeau à afficher selon la locale actuelle.
  const currentFlag = params.locale === "fr" ? "/fr.svg" : "/en.svg";

  return (
    <div className="relative flex items-center gap-2">
      {/* Affiche le drapeau actif */}
      <div className="w-7 h-7 rounded-full overflow-hidden border border-white/30 shadow-sm">
        <Image
          src={currentFlag}
          alt={params.locale === "fr" ? "Français" : "English"}
          width={28}
          height={28}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Select invisible visuellement, mais accessible */}
      <select
        onChange={handleLanguageChange}
        value={params.locale}
        className="appearance-none bg-transparent text-transparent absolute inset-0 opacity-0 cursor-pointer"
        aria-label="Select language"
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>

      {/* Icône de flèche */}
      <svg
        className="w-4 h-4 text-white/60 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
