"use client";

import Menu from "@/app/components/menu";
import Footer from "@/app/components/footer";
import { Scale } from "lucide-react";
import Link from "next/link";

/**
 * @fileoverview
 * Page **Mentions légales** du site MealMind.  
 *  
 * Cette page présente toutes les informations légales relatives au site :
 * - Informations sur l’éditeur et l’hébergeur  
 * - Propriété intellectuelle  
 * - Données personnelles et RGPD  
 * - Cookies et responsabilités  
 * - Droit applicable et crédits  
 *
 * Le contenu est statique et rédigé en français, avec une mise en page moderne (fond sombre, effet glassmorphism).
 *  
 * **Technologies utilisées :**
 * - `lucide-react` pour les icônes
 * - `next/link` pour la navigation interne
 * - Composants `Menu` et `Footer` globaux
 */

/**
 * @component
 * @description
 * Affiche la page des mentions légales avec un style épuré, organisé par sections numérotées.  
 * Chaque section contient un titre rouge, un contenu textuel clair et des liens interactifs (email, politiques, etc.).
 *
 * @example
 * ```jsx
 * import MentionsLegalesPage from "@/app/mentions-legales/page";
 *
 * export default function Page() {
 *   return <MentionsLegalesPage />;
 * }
 * ```
 *
 * @returns {JSX.Element} Une page complète listant les mentions légales du site MealMind.
 */
export default function MentionsLegalesPage() {
  return (
    <div className="w-full min-h-screen bg-[#0e0e0e] text-white">
      {/* Barre de navigation */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      {/* Contenu principal */}
      <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Scale size={48} className="text-red-600" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center">
              Mentions Légales
            </h1>
          </div>

          <p className="text-white/60 text-center mb-12 text-lg">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          {/* Corps du texte */}
          <div className="bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-md space-y-8">
            
            {/* 1. Éditeur du site */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                1. Éditeur du site
              </h2>
              <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-3 text-white/70">
                <p>
                  <span className="font-semibold text-white">Raison sociale :</span> MealMind
                </p>
                <p>
                  <span className="font-semibold text-white">Forme juridique :</span> SAS (Société par Actions Simplifiée)
                </p>
                <p>
                  <span className="font-semibold text-white">Capital social :</span> 10 000 €
                </p>
                <p>
                  <span className="font-semibold text-white">Siège social :</span> 123 Avenue des Champs-Élysées, 75008 Paris, France
                </p>
                <p>
                  <span className="font-semibold text-white">SIRET :</span> 123 456 789 00012
                </p>
                <p>
                  <span className="font-semibold text-white">Numéro TVA intracommunautaire :</span> FR 12 345678901
                </p>
                <p>
                  <span className="font-semibold text-white">Email :</span>{" "}
                  <a href="mailto:contact@mealmind.com" className="text-red-400 hover:text-red-300 transition">
                    contact@mealmind.com
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-white">Téléphone :</span> +33 1 23 45 67 89
                </p>
                <p>
                  <span className="font-semibold text-white">Directeur de la publication :</span> Jean Dupont
                </p>
              </div>
            </section>

            {/* 2. Hébergement */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                2. Hébergement
              </h2>
              <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-3 text-white/70">
                <p>
                  <span className="font-semibold text-white">Hébergeur :</span> Vercel Inc.
                </p>
                <p>
                  <span className="font-semibold text-white">Adresse :</span> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
                </p>
                <p>
                  <span className="font-semibold text-white">Site web :</span>{" "}
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 transition">
                    vercel.com
                  </a>
                </p>
              </div>
            </section>

            {/* 3. Propriété intellectuelle */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                3. Propriété intellectuelle
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, etc.) est la propriété 
                exclusive de MealMind ou de ses partenaires. Toute reproduction, distribution, modification, 
                adaptation ou publication de ces éléments est strictement interdite sans accord écrit préalable.
              </p>
              <p className="text-white/70 leading-relaxed">
                Le non-respect de cette interdiction constitue une contrefaçon pouvant engager la responsabilité 
                civile et pénale du contrefacteur.
              </p>
            </section>

            {/* 4. Données personnelles */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                4. Données personnelles
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Conformément à la loi « Informatique et Libertés » et au RGPD, vous disposez d&apos;un droit d&apos;accès, 
                de rectification, de suppression et d&apos;opposition concernant vos données personnelles.
              </p>
              <p className="text-white/70 leading-relaxed">
                Pour exercer ces droits, contactez-nous à :{" "}
                <a href="mailto:dpo@mealmind.com" className="text-red-400 hover:text-red-300 transition font-semibold">
                  dpo@mealmind.com
                </a>
              </p>
              <p className="text-white/70 leading-relaxed mt-3">
                Pour plus d&apos;informations, consultez notre{" "}
                <Link href="/confidentialite" className="text-red-400 hover:text-red-300 transition font-semibold">
                  Politique de confidentialité
                </Link>.
              </p>
            </section>

            {/* 5. Cookies */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                5. Cookies
              </h2>
              <p className="text-white/70 leading-relaxed">
                Ce site utilise des cookies pour améliorer votre expérience et analyser le trafic.  
                Pour en savoir plus, consultez notre{" "}
                <Link href="/cookies" className="text-red-400 hover:text-red-300 transition font-semibold">
                  Politique de cookies
                </Link>.
              </p>
            </section>

            {/* 6. Responsabilité */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                6. Responsabilité
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                MealMind s&apos;efforce d&apos;assurer l&apos;exactitude des informations publiées, 
                mais ne peut garantir leur exhaustivité ni leur actualisation constante.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                MealMind ne pourra être tenue responsable des dommages directs ou indirects résultant 
                de l&apos;utilisation du site, y compris pertes de données ou infections virales.
              </p>
              <p className="text-white/70 leading-relaxed">
                MealMind décline toute responsabilité quant aux contenus externes accessibles via des liens hypertextes.
              </p>
            </section>

            {/* 7. Liens hypertextes */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                7. Liens hypertextes
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Ce site peut contenir des liens vers d&apos;autres sites externes. MealMind ne contrôle pas leur contenu 
                et décline toute responsabilité à leur égard.
              </p>
              <p className="text-white/70 leading-relaxed">
                La création de liens vers ce site nécessite l&apos;autorisation écrite de MealMind.
              </p>
            </section>

            {/* 8. Droit applicable */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                8. Droit applicable et juridiction compétente
              </h2>
              <p className="text-white/70 leading-relaxed">
                Les présentes mentions légales sont régies par le droit français.  
                Tout litige sera porté devant les tribunaux français compétents.
              </p>
            </section>

            {/* 9. Crédits */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                9. Crédits
              </h2>
              <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-2 text-white/70">
                <p>
                  <span className="font-semibold text-white">Conception et développement :</span> MealMind Team
                </p>
                <p>
                  <span className="font-semibold text-white">Framework :</span> Next.js
                </p>
                <p>
                  <span className="font-semibold text-white">Icônes :</span> Lucide React
                </p>
                <p>
                  <span className="font-semibold text-white">Images :</span> Unsplash, Pexels
                </p>
              </div>
            </section>

            {/* 10. Contact */}
            <section className="border-t border-white/10 pt-6">
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                10. Contact
              </h2>
              <p className="text-white/70 leading-relaxed">
                Pour toute question relative à ces mentions légales, vous pouvez nous contacter :
              </p>
              <div className="mt-4 bg-white/5 p-5 rounded-xl border border-white/10 space-y-2 text-white/70">
                <p>
                  <span className="font-semibold text-white">Par email :</span>{" "}
                  <a href="mailto:contact@mealmind.com" className="text-red-400 hover:text-red-300 transition">
                    contact@mealmind.com
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-white">Par téléphone :</span> +33 1 23 45 67 89
                </p>
                <p>
                  <span className="font-semibold text-white">Par courrier :</span> MealMind, 123 Avenue des Champs-Élysées, 75008 Paris, France
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}
