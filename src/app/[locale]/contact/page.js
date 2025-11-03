"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Menu from "@/app/components/menu";
import Footer from "@/app/components/footer";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("ContactPage");

  return (
    <div className="w-full min-h-screen bg-[#0e0e0e] text-white flex flex-col">
      {/* Menu */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      {/* Contenu */}
      <div className="flex-grow pt-32 px-6 sm:px-12 md:px-20 lg:px-40 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Titre principal */}
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-red-500">
            {t("title")}
          </h1>
          <p className="text-white/70 text-lg mb-12">{t("intro")}</p>

          {/* Carte de contact */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center text-center">
                <Mail size={32} className="text-red-500 mb-3" />
                <h3 className="font-semibold mb-2">{t("emailTitle")}</h3>
                <a
                  href="mailto:contact@mealmind.com"
                  className="text-red-400 hover:text-red-300 transition"
                >
                  contact@mealmind.com
                </a>
              </div>

              <div className="flex flex-col items-center text-center">
                <Phone size={32} className="text-red-500 mb-3" />
                <h3 className="font-semibold mb-2">{t("phoneTitle")}</h3>
                <p className="text-white/70">+33 1 23 45 67 89</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <MapPin size={32} className="text-red-500 mb-3" />
                <h3 className="font-semibold mb-2">{t("addressTitle")}</h3>
                <p className="text-white/70">
                  123 Avenue des Champs-Élysées
                  <br />
                  75008 Paris, France
                </p>
              </div>
            </div>

            {/* Formulaire de contact */}
            <form
              className="grid grid-cols-1 gap-6 text-left max-w-2xl mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                alert(t("formSent"));
              }}
            >
              <div>
                <label className="block mb-2 font-medium text-white/80">
                  {t("name")}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
                  placeholder={t("namePlaceholder")}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-white/80">
                  {t("email")}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none"
                  placeholder={t("emailPlaceholder")}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-white/80">
                  {t("message")}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-white/30 outline-none resize-none"
                  placeholder={t("messagePlaceholder")}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-red-600 hover:bg-red-700 transition-all duration-300 font-bold rounded-lg px-6 py-3 w-full sm:w-1/2 mx-auto"
              >
                {t("send")}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
