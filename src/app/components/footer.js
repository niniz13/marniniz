"use client";

import Link from "next/link";
import { Instagram, Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * @fileoverview
 * Le composant `Footer` affiche le pied de page global du site, comprenant :
 * - Des liens de navigation internes.
 * - Des sections "À propos" et "Légal".
 * - Des icônes vers les réseaux sociaux.
 * - Un message de copyright.
 *
 * Le contenu est traduit dynamiquement grâce à `next-intl`, via les clés du namespace `Footer`.
 *
 * Les styles reposent sur Tailwind CSS pour une mise en page responsive et moderne.
 */

/**
 * @component
 * @description
 * Affiche le pied de page de l'application avec liens internes et externes,
 * textes traduits, et icônes de réseaux sociaux.
 *
 * @example
 * ```jsx
 * import Footer from "@/components/Footer";
 *
 * export default function Layout({ children }) {
 *   return (
 *     <>
 *       <main>{children}</main>
 *       <Footer />
 *     </>
 *   );
 * }
 * ```
 *
 * @returns {JSX.Element} Le composant de pied de page multilingue.
 */
export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-[#0c0c0c] text-white/80 py-12 border-t border-white/10">
      <div className="mx-auto px-6 sm:px-12 md:px-20 lg:px-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Navigation */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">
            {t("navigation.title")}
          </h3>
          <p className="text-white/60 mb-4">{t("navigation.description")}</p>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-red-400 transition">
                {t("navigation.links.home")}
              </Link>
            </li>
            <li>
              <Link
                href="/recipes-search"
                className="hover:text-red-400 transition"
              >
                {t("navigation.links.recipes")}
              </Link>
            </li>
          </ul>
        </div>

        {/* À propos */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">
            {t("about.title")}
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-red-400 transition">
                {t("about.links.mission")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-red-400 transition">
                {t("about.links.contact")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Légal */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">
            {t("legal.title")}
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/mentions-legales"
                className="hover:text-red-400 transition"
              >
                {t("legal.links.mentions")}
              </Link>
            </li>
            <li>
              <Link
                href="/confidentialite"
                className="hover:text-red-400 transition"
              >
                {t("legal.links.privacy")}
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-red-400 transition">
                {t("legal.links.cookies")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">
            {t("social.title")}
          </h3>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-white/70 hover:text-red-400 transition"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </Link>
            <Link
              href="#"
              className="text-white/70 hover:text-red-400 transition"
              aria-label="GitHub"
            >
              <Github size={22} />
            </Link>
            <Link
              href="#"
              className="text-white/70 hover:text-red-400 transition"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} {t("copyright")}
      </div>
    </footer>
  );
}
