"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import Menu from "@/app/components/menu";
import Footer from "@/app/components/footer";
import { useTranslations, useLocale } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");
  const locale = useLocale();

  return (
    <div className="w-full min-h-screen bg-[#0e0e0e] text-white flex flex-col">
      {/* Barre de navigation */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      {/* Contenu principal */}
      <div className="flex-grow flex items-center justify-center pt-28 px-6 sm:px-12 md:px-20 lg:px-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Icône d’alerte */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-500/10 p-6 rounded-full border border-red-500/30">
              <AlertTriangle size={56} className="text-red-500" />
            </div>
          </div>

          {/* Titre */}
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            {t("title")}
          </h1>

          {/* Message */}
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            {t("message")}
          </p>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/${locale}`}
              className="bg-red-600 hover:bg-red-700 transition-all duration-300 font-semibold rounded-lg px-6 py-3"
            >
              {t("backHome")}
            </Link>
            <Link
              href={`/${locale}/recipes-search`}
              className="bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 font-semibold rounded-lg px-6 py-3"
            >
              {t("exploreRecipes")}
            </Link>
          </div>

          <p className="mt-12 text-white/40 text-sm tracking-wider">
            {t("code")}
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
