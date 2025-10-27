"use client";

import Menu from "../components/menu";
import Footer from "../components/footer";
import { Scale } from "lucide-react";

export default function MentionsLegalesPage() {
  return (
    <div className="w-full min-h-screen bg-[#0e0e0e] text-white">
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Scale size={48} className="text-red-600" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center">
              Mentions Légales
            </h1>
          </div>

          <p className="text-white/60 text-center mb-12 text-lg">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          {/* Content */}
          <div className="bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-md space-y-8">
            
            {/* Section 1 */}
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

            {/* Section 2 */}
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

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                3. Propriété intellectuelle
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, etc.) est la propriété 
                exclusive de MealMind ou de ses partenaires. Toute reproduction, distribution, modification, 
                adaptation, retransmission ou publication de ces différents éléments est strictement interdite 
                sans l&apos;accord exprès par écrit de MealMind.
              </p>
              <p className="text-white/70 leading-relaxed">
                Le non-respect de cette interdiction constitue une contrefaçon pouvant engager la responsabilité 
                civile et pénale du contrefacteur.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                4. Données personnelles
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement 
                Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, 
                de suppression et d&apos;opposition aux données personnelles vous concernant.
              </p>
              <p className="text-white/70 leading-relaxed">
                Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse suivante :{" "}
                <a href="mailto:dpo@mealmind.com" className="text-red-400 hover:text-red-300 transition font-semibold">
                  dpo@mealmind.com
                </a>
              </p>
              <p className="text-white/70 leading-relaxed mt-3">
                Pour plus d&apos;informations, consultez notre{" "}
                <a href="/confidentialite" className="text-red-400 hover:text-red-300 transition font-semibold">
                  Politique de confidentialité
                </a>.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                5. Cookies
              </h2>
              <p className="text-white/70 leading-relaxed">
                Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur et analyser le trafic. 
                Pour en savoir plus sur notre utilisation des cookies et comment les gérer, consultez notre{" "}
                <a href="/cookies" className="text-red-400 hover:text-red-300 transition font-semibold">
                  Politique de cookies
                </a>.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                6. Responsabilité
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                MealMind s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site. 
                Toutefois, MealMind ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations 
                mises à disposition sur ce site.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                MealMind ne pourra être tenue responsable des dommages directs ou indirects résultant de l&apos;accès 
                au site ou de l&apos;utilisation du site, y compris l&apos;inaccessibilité, les pertes de données, 
                détériorations, destructions ou virus qui pourraient affecter l&apos;équipement informatique de 
                l&apos;utilisateur.
              </p>
              <p className="text-white/70 leading-relaxed">
                MealMind décline toute responsabilité quant au contenu des sites vers lesquels des liens 
                hypertextes peuvent renvoyer depuis ce site.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                7. Liens hypertextes
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Ce site peut contenir des liens hypertextes vers d&apos;autres sites. MealMind n&apos;exerce aucun contrôle 
                sur ces sites et décline toute responsabilité quant à leur contenu.
              </p>
              <p className="text-white/70 leading-relaxed">
                La création de liens hypertextes vers ce site nécessite l&apos;autorisation préalable et écrite de MealMind.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                8. Droit applicable et juridiction compétente
              </h2>
              <p className="text-white/70 leading-relaxed">
                Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut 
                d&apos;accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de 
                compétence en vigueur.
              </p>
            </section>

            {/* Section 9 */}
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

            {/* Section 10 */}
            <section className="border-t border-white/10 pt-6">
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                10. Contact
              </h2>
              <p className="text-white/70 leading-relaxed">
                Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
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

      <Footer />
    </div>
  );
}
