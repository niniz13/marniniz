"use client";

import Menu from "@/app/components/menu";
import Footer from "@/app/components/footer";
import { Cookie } from "lucide-react";

/**
 * @fileoverview
 * Page **Politique de cookies** du site MealMind.
 *
 * Cette page explique la nature et l’utilisation des cookies sur le site, conformément au **RGPD** et à la **loi Informatique et Libertés**.
 * Elle détaille :
 * - Ce qu’est un cookie et son utilité
 * - Les différents types de cookies utilisés sur le site (essentiels, performance, fonctionnels, tiers)
 * - Les options de gestion des cookies via les navigateurs
 * - La durée de conservation et les droits de l’utilisateur
 *
 * Le contenu est statique, en français, et structuré pour une lecture claire.
 *
 * **Technologies utilisées :**
 * - `lucide-react` → icône de cookie
 * - `next/link` (pas nécessaire ici mais cohérent avec les autres pages)
 * - `Menu` et `Footer` comme composants globaux
 */

/**
 * @component
 * @description
 * Affiche la page de **Politique de cookies** avec sections explicatives et mise en page moderne (fond sombre, verre dépoli, hiérarchie visuelle claire).
 *
 * @example
 * ```jsx
 * import CookiesPage from "@/app/cookies/page";
 *
 * export default function Page() {
 *   return <CookiesPage />;
 * }
 * ```
 *
 * @returns {JSX.Element} La page complète détaillant la politique de gestion des cookies du site MealMind.
 */
export default function CookiesPage() {
  return (
    <div className="w-full min-h-screen bg-[#0e0e0e] text-white">
      {/* Menu principal */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      {/* Contenu principal */}
      <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Cookie size={48} className="text-red-600" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center">
              Politique de Cookies
            </h1>
          </div>

          <p className="text-white/60 text-center mb-12 text-lg">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          {/* Corps du contenu */}
          <div className="bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-md space-y-8">
            {/* 1. Définition */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                Qu&apos;est-ce qu&apos;un cookie ?
              </h2>
              <p className="text-white/70 leading-relaxed">
                Un cookie est un petit fichier texte déposé sur votre terminal
                (ordinateur, tablette, smartphone) lors de la visite d&apos;un
                site web. Il permet de mémoriser des informations utiles comme
                vos préférences linguistiques, afin d&apos;améliorer votre
                expérience et de faciliter vos futures visites.
              </p>
            </section>

            {/* 2. Types de cookies */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                Types de cookies utilisés
              </h2>

              <div className="space-y-6">
                {/* Essentiels */}
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    🔒 Cookies essentiels
                  </h3>
                  <p className="text-white/70 mb-3">
                    Indispensables au bon fonctionnement du site, ces cookies
                    garantissent la sécurité, la gestion des sessions et la
                    sauvegarde des préférences de base.
                  </p>
                  <ul className="list-disc list-inside text-white/60 space-y-1 ml-4">
                    <li>Authentification et sécurité</li>
                    <li>Gestion de session</li>
                    <li>Préférences de l&apos;utilisateur</li>
                  </ul>
                </div>

                {/* Performance */}
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    📊 Cookies de performance
                  </h3>
                  <p className="text-white/70 mb-3">
                    Ces cookies nous permettent d&apos;analyser le trafic et les
                    performances du site afin d&apos;améliorer l&apos;expérience
                    utilisateur et de détecter d&apos;éventuels problèmes
                    techniques.
                  </p>
                  <ul className="list-disc list-inside text-white/60 space-y-1 ml-4">
                    <li>Analyse du trafic</li>
                    <li>Statistiques de navigation</li>
                    <li>Amélioration continue du site</li>
                  </ul>
                </div>

                {/* Fonctionnels */}
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    ⚙️ Cookies fonctionnels
                  </h3>
                  <p className="text-white/70 mb-3">
                    Ils permettent de proposer des fonctionnalités avancées
                    comme la personnalisation du contenu, la mémorisation des
                    préférences et les options de partage social.
                  </p>
                  <ul className="list-disc list-inside text-white/60 space-y-1 ml-4">
                    <li>Personnalisation du contenu</li>
                    <li>Préférences utilisateur</li>
                    <li>Intégrations sociales</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Gestion des cookies */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                Gestion des cookies
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Vous pouvez contrôler et/ou supprimer les cookies à tout moment
                via les paramètres de votre navigateur. Vous pouvez aussi
                configurer celui-ci pour bloquer leur installation par défaut.
              </p>
              <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Configuration par navigateur :
                </h3>
                <ul className="space-y-2 text-white/70">
                  <li>
                    <span className="font-semibold text-white">Chrome :</span>{" "}
                    Paramètres → Confidentialité et sécurité → Cookies
                  </li>
                  <li>
                    <span className="font-semibold text-white">Firefox :</span>{" "}
                    Options → Vie privée et sécurité → Cookies
                  </li>
                  <li>
                    <span className="font-semibold text-white">Safari :</span>{" "}
                    Préférences → Confidentialité → Cookies
                  </li>
                  <li>
                    <span className="font-semibold text-white">Edge :</span>{" "}
                    Paramètres → Confidentialité → Cookies
                  </li>
                </ul>
              </div>
            </section>

            {/* 4. Cookies tiers */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                Cookies tiers
              </h2>
              <p className="text-white/70 leading-relaxed">
                Certains services tiers (ex. Google Analytics, réseaux sociaux)
                peuvent déposer leurs propres cookies. Chacun d&apos;eux dispose
                de sa propre politique de confidentialité que nous vous invitons
                à consulter.
              </p>
            </section>

            {/* 5. Durée de conservation */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                Durée de conservation
              </h2>
              <p className="text-white/70 leading-relaxed">
                Les cookies ont une durée de vie limitée selon leur nature :
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 mt-3 ml-4">
                <li>
                  <span className="text-white font-semibold">
                    Cookies de session :
                  </span>{" "}
                  supprimés à la fermeture du navigateur
                </li>
                <li>
                  <span className="text-white font-semibold">
                    Cookies persistants :
                  </span>{" "}
                  conservés jusqu&apos;à 13 mois maximum
                </li>
              </ul>
            </section>

            {/* 6. Vos droits */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                Vos droits
              </h2>
              <p className="text-white/70 leading-relaxed">
                Conformément au RGPD, vous disposez d&apos;un droit
                d&apos;accès, de rectification, de suppression et
                d&apos;opposition concernant vos données personnelles. Pour
                exercer ces droits ou pour toute question relative à notre
                politique de cookies, contactez-nous à :{" "}
                <span className="text-red-400 font-semibold">
                  contact@mealmind.com
                </span>
                .
              </p>
            </section>

            {/* 7. Modifications */}
            <section className="border-t border-white/10 pt-6">
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                Modifications de cette politique
              </h2>
              <p className="text-white/70 leading-relaxed">
                Cette politique peut être modifiée à tout moment pour refléter
                les évolutions légales ou techniques. Les changements seront
                publiés sur cette page, avec une date de mise à jour révisée.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}
