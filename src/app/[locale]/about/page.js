"use client";

import { motion } from "framer-motion";
import { Heart, Lightbulb, Users, Leaf } from "lucide-react";
import Menu from "@/app/components/menu";
import Footer from "@/app/components/footer";
import { useTranslations } from "next-intl";

/**
 * @fileoverview
 * Page **À propos (About)** du site MealMind.
 *
 * Cette page présente la mission, la vision et les valeurs fondamentales du projet MealMind :
 * - **Passion** : transmettre l’amour de la cuisine et de l’équilibre alimentaire
 * - **Innovation** : allier technologie et nutrition
 * - **Communauté** : créer un espace d’échange et de partage
 * - **Durabilité** : promouvoir une alimentation responsable et consciente
 *
 * **Technologies utilisées :**
 * - `framer-motion` → animations d’apparition et d’interaction au survol
 * - `lucide-react` → icônes symbolisant les valeurs
 * - `next-intl` → gestion multilingue des textes
 * - Composants globaux `Menu` et `Footer`
 */

/**
 * @component
 * @description
 * Page de présentation du projet MealMind (vision, mission, valeurs).
 * Le contenu est animé pour une expérience fluide et moderne.
 * Les textes sont dynamiques via le système de traduction `next-intl`.
 *
 * @example
 * ```jsx
 * import AboutPage from "@/app/about/page";
 *
 * export default function Page() {
 *   return <AboutPage />;
 * }
 * ```
 *
 * @returns {JSX.Element} La page complète "À propos" de MealMind.
 */
export default function AboutPage() {
  const t = useTranslations("AboutPage");

  // Définition des valeurs fondamentales avec icônes et traductions
  const values = [
    {
      icon: <Heart size={36} className="text-red-500" />,
      title: t("values.passion.title"),
      desc: t("values.passion.desc"),
    },
    {
      icon: <Lightbulb size={36} className="text-red-500" />,
      title: t("values.innovation.title"),
      desc: t("values.innovation.desc"),
    },
    {
      icon: <Users size={36} className="text-red-500" />,
      title: t("values.community.title"),
      desc: t("values.community.desc"),
    },
    {
      icon: <Leaf size={36} className="text-red-500" />,
      title: t("values.sustainability.title"),
      desc: t("values.sustainability.desc"),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#0e0e0e] text-white flex flex-col">
      {/* Menu principal */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      {/* Contenu principal */}
      <div className="flex-grow pt-32 px-6 sm:px-12 md:px-20 lg:px-40 pb-20">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-red-500">
            {t("title")}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-12">
            {t("intro")}
          </p>
        </motion.div>

        {/* Vision */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">
            {t("visionTitle")}
          </h2>
          <p className="text-white/70 leading-relaxed text-lg">
            {t("visionDesc")}
          </p>
        </motion.section>

        {/* Valeurs */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {values.map((v, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center flex flex-col items-center gap-3"
            >
              <div className="p-3 bg-red-500/10 rounded-full border border-red-500/30">
                {v.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mt-3">
                {v.title}
              </h3>
              <p className="text-white/60 text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto text-center mt-20"
        >
          <p className="text-white/70 leading-relaxed text-lg">
            {t("conclusion")}
          </p>
        </motion.div>
      </div>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}
