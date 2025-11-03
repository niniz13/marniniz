"use client";

import Menu from "@/app/components/menu";
import Footer from "@/app/components/footer";
import { Shield } from "lucide-react";

/**
 * @fileoverview
 * Page **Politique de confidentialité** du site MealMind.
 *
 * Cette page explique comment MealMind collecte, utilise, conserve et protège les données personnelles
 * des utilisateurs, conformément au **Règlement Général sur la Protection des Données (RGPD)**.
 *
 * Elle couvre :
 * - Les types de données collectées (identification, utilisation, techniques)
 * - Les finalités et bases légales du traitement
 * - Les droits des utilisateurs et les moyens de les exercer
 * - Les mesures de sécurité et les transferts internationaux éventuels
 *
 * **Technologies utilisées :**
 * - `lucide-react` → icône de bouclier (visuel principal)
 * - Composants globaux `Menu` et `Footer`
 * - Mise en page en fond sombre avec effet *glassmorphism* (`backdrop-blur-md`)
 */

/**
 * @component
 * @description
 * Affiche la page **Politique de Confidentialité** détaillant la gestion des données personnelles sur MealMind.
 *
 * Cette page est statique, structurée en sections numérotées pour une meilleure lisibilité et conformité RGPD.
 *
 * @example
 * ```jsx
 * import ConfidentialitePage from "@/app/confidentialite/page";
 *
 * export default function Page() {
 *   return <ConfidentialitePage />;
 * }
 * ```
 *
 * @returns {JSX.Element} La page complète présentant la politique de confidentialité du site MealMind.
 */
export default function ConfidentialitePage() {
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
            <Shield size={48} className="text-red-600" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center">
              Politique de Confidentialité
            </h1>
          </div>

          <p className="text-white/60 text-center mb-12 text-lg">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          {/* Corps du texte */}
          <div className="bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-md space-y-8">
            {/* 1. Introduction */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                1. Introduction
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                MealMind accorde une grande importance à la protection de vos
                données personnelles. Cette politique décrit nos pratiques de
                collecte, d&apos;utilisation et de protection des informations,
                conformément au RGPD.
              </p>
              <p className="text-white/70 leading-relaxed">
                En utilisant notre site, vous acceptez les pratiques décrites
                dans cette politique.
              </p>
            </section>

            {/* 2. Données collectées */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                2. Données collectées
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Nous collectons plusieurs types de données personnelles :
              </p>

              <div className="space-y-4">
                {/* Identité */}
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    📝 Données d&apos;identification
                  </h3>
                  <ul className="list-disc list-inside text-white/60 space-y-1 ml-4">
                    <li>Nom et prénom</li>
                    <li>Adresse e-mail</li>
                    <li>Photo de profil</li>
                    <li>Mot de passe (crypté)</li>
                  </ul>
                </div>

                {/* Utilisation */}
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    🍽️ Données d&apos;utilisation
                  </h3>
                  <ul className="list-disc list-inside text-white/60 space-y-1 ml-4">
                    <li>Recettes consultées et favorites</li>
                    <li>Préférences alimentaires</li>
                    <li>Historique de navigation</li>
                    <li>Plannings créés</li>
                  </ul>
                </div>

                {/* Techniques */}
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    💻 Données techniques
                  </h3>
                  <ul className="list-disc list-inside text-white/60 space-y-1 ml-4">
                    <li>Adresse IP</li>
                    <li>Type de navigateur</li>
                    <li>Système d&apos;exploitation</li>
                    <li>Cookies et traceurs</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Finalités */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                3. Finalités du traitement
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 ml-4">
                <li>Gérer votre compte utilisateur</li>
                <li>Personnaliser votre expérience</li>
                <li>Générer des plannings de repas adaptés</li>
                <li>Améliorer nos services</li>
                <li>Communiquer avec vous (si consentement donné)</li>
                <li>Assurer la sécurité et prévenir la fraude</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            {/* 4. Base légale */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                4. Base légale du traitement
              </h2>
              <div className="space-y-3 text-white/70">
                <p>Le traitement repose sur :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <span className="font-semibold text-white">
                      Votre consentement
                    </span>{" "}
                    pour certaines fonctionnalités
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      L&apos;exécution d&apos;un contrat
                    </span>{" "}
                    pour les services fournis
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      L&apos;intérêt légitime
                    </span>{" "}
                    pour améliorer le service
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      Les obligations légales
                    </span>{" "}
                    en matière de conservation
                  </li>
                </ul>
              </div>
            </section>

            {/* 5. Partage */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                5. Partage des données
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Nous ne vendons jamais vos données. Nous les partageons
                uniquement avec :
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 ml-4">
                <li>
                  Prestataires de services (hébergement, paiement, analyse)
                </li>
                <li>Autorités légales si la loi l&apos;exige</li>
                <li>Partenaires tiers avec votre consentement explicite</li>
              </ul>
            </section>

            {/* 6. Conservation */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                6. Durée de conservation
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Les durées varient selon la nature des données :
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 ml-4">
                <li>Compte utilisateur : jusqu&apos;à suppression + 1 an</li>
                <li>Données de navigation : 13 mois max</li>
                <li>Données de facturation : 10 ans (obligation légale)</li>
              </ul>
            </section>

            {/* 7. Droits */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                7. Vos droits
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Conformément au RGPD, vous pouvez :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">
                    ✅ Droit d&apos;accès
                  </h4>
                  <p className="text-white/60 text-sm">
                    Obtenir une copie de vos données
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">
                    ✏️ Droit de rectification
                  </h4>
                  <p className="text-white/60 text-sm">
                    Corriger vos informations
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">
                    🗑️ Droit à l&apos;effacement
                  </h4>
                  <p className="text-white/60 text-sm">
                    Demander la suppression
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">
                    ⛔ Droit d&apos;opposition
                  </h4>
                  <p className="text-white/60 text-sm">Refuser un traitement</p>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed mt-4">
                Pour exercer vos droits :{" "}
                <a
                  href="mailto:dpo@mealmind.com"
                  className="text-red-400 hover:text-red-300 font-semibold"
                >
                  dpo@mealmind.com
                </a>
              </p>
            </section>

            {/* 8. Sécurité */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                8. Sécurité des données
              </h2>
              <ul className="list-disc list-inside text-white/60 space-y-2 ml-4">
                <li>Chiffrement (SSL/TLS)</li>
                <li>Authentification sécurisée</li>
                <li>Accès restreint</li>
                <li>Surveillance continue</li>
                <li>Sauvegardes régulières</li>
              </ul>
            </section>

            {/* 9. Transferts internationaux */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                9. Transferts internationaux
              </h2>
              <p className="text-white/70 leading-relaxed">
                Si des données sont transférées hors UE, elles sont protégées
                par des garanties conformes au RGPD (clauses contractuelles
                types, Privacy Shield, etc.).
              </p>
            </section>

            {/* 10. Modifications */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                10. Modifications
              </h2>
              <p className="text-white/70 leading-relaxed">
                Cette politique peut être modifiée à tout moment. Les mises à
                jour seront publiées sur cette page avec la date révisée.
              </p>
            </section>

            {/* 11. Contact */}
            <section className="border-t border-white/10 pt-6">
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                11. Contact
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Pour toute question concernant cette politique ou vos droits :
              </p>
              <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-3 text-white/70">
                <p>
                  <span className="font-semibold text-white">
                    Délégué à la Protection des Données :
                  </span>{" "}
                  MealMind DPO
                </p>
                <p>
                  <span className="font-semibold text-white">Email :</span>{" "}
                  <a
                    href="mailto:dpo@mealmind.com"
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    dpo@mealmind.com
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-white">Adresse :</span>{" "}
                  123 Avenue des Champs-Élysées, 75008 Paris
                </p>
                <p className="mt-4 pt-4 border-t border-white/10">
                  Vous pouvez aussi contacter la CNIL :{" "}
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    www.cnil.fr
                  </a>
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
