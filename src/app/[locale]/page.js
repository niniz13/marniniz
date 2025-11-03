import Image from "next/image";
import Menu from "../components/menu";
import Link from "next/link";
import Footer from "../components/footer";
import { useTranslations } from "next-intl";

/**
 * @fileoverview
 * Le composant `Home` représente la page d'accueil principale du site MealMind.
 * Il affiche :
 * - Une image "hero" en plein écran avec un effet d’assombrissement.
 * - Le menu de navigation supérieur (`Menu`).
 * - Un texte d’accroche (titre et description) traduit via `next-intl`.
 * - Un bouton d’appel à l’action (CTA) menant vers la page des recettes.
 * - Le pied de page global (`Footer`).
 *
 * Ce composant est **responsive**, optimisé pour les performances (avec `next/image`)
 * et utilise des traductions dynamiques depuis le namespace `HomePage`.
 */

/**
 * @component
 * @description
 * Page d’accueil du site MealMind, intégrant une section hero immersive et les composants globaux
 * du site (`Menu` et `Footer`).
 *
 * @example
 * ```jsx
 * import Home from "@/app/page";
 *
 * export default function App() {
 *   return <Home />;
 * }
 * ```
 *
 * @returns {JSX.Element} La page d’accueil complète avec section hero et traduction dynamique.
 */
export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      {/* Section Hero */}
      <div className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="hero image"
          quality={60}
          fill
          priority
          className="object-cover brightness-75"
        />

        {/* Barre de navigation */}
        <div className="fixed top-0 left-0 w-full z-10">
          <Menu />
        </div>

        {/* Contenu principal du Hero */}
        <div className="relative max-w-[1000px] flex flex-col justify-center items-center gap-4">
          <h1 className="font-black tracking-[-0.05em] leading-[1] text-5xl sm:text-6xl md:text-7xl">
            {t("hero.title")}
          </h1>

          <p className="max-w-[800px] leading-[1.2] font-semibold text-base sm:text-lg md:text-xl">
            {t("hero.description")}
          </p>

          <Link
            href="/recipes"
            className="bg-red-600 rounded-sm px-8 py-3 text-white font-bold transition-all duration-300 hover:bg-red-400 cursor-pointer"
          >
            {t("hero.cta")}
          </Link>
        </div>
      </div>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}
