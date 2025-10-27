"use client";

import Menu from "../components/menu";
import Footer from "../components/footer";
import { Shield } from "lucide-react";

export default function ConfidentialitePage() {
  return (
    <div className="w-full min-h-screen bg-[#0e0e0e] text-white">
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Shield size={48} className="text-red-600" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center">
              Politique de Confidentialité
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
                1. Introduction
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                MealMind accorde une grande importance à la protection de vos données personnelles. Cette politique 
                de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos 
                informations personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
              </p>
              <p className="text-white/70 leading-relaxed">
                En utilisant notre site, vous acceptez les pratiques décrites dans cette politique.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                2. Données collectées
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Nous collectons différents types de données personnelles :
              </p>
              
              <div className="space-y-4">
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    📝 Données d&apos;identification
                  </h3>
                  <ul className="list-disc list-inside text-white/60 space-y-1 ml-4">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Photo de profil</li>
                    <li>Mot de passe (crypté)</li>
                  </ul>
                </div>

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

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                3. Finalités du traitement
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Vos données personnelles sont utilisées pour :
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 ml-4">
                <li>Créer et gérer votre compte utilisateur</li>
                <li>Personnaliser votre expérience sur le site</li>
                <li>Générer des plannings de repas adaptés à vos préférences</li>
                <li>Améliorer nos services et développer de nouvelles fonctionnalités</li>
                <li>Vous envoyer des communications (avec votre consentement)</li>
                <li>Assurer la sécurité et prévenir la fraude</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                4. Base légale du traitement
              </h2>
              <div className="space-y-3 text-white/70">
                <p>Le traitement de vos données repose sur :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><span className="font-semibold text-white">Votre consentement</span> pour certaines finalités spécifiques</li>
                  <li><span className="font-semibold text-white">L&apos;exécution du contrat</span> pour la fourniture de nos services</li>
                  <li><span className="font-semibold text-white">Notre intérêt légitime</span> pour améliorer nos services</li>
                  <li><span className="font-semibold text-white">Nos obligations légales</span> en matière de conservation des données</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                5. Partage des données
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos données avec :
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 ml-4">
                <li>Nos prestataires de services (hébergement, analyse, paiement)</li>
                <li>Les autorités légales si requis par la loi</li>
                <li>Des partenaires avec votre consentement explicite</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                6. Durée de conservation
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Nous conservons vos données personnelles pendant la durée nécessaire aux finalités pour lesquelles 
                elles ont été collectées :
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 ml-4">
                <li>Données de compte : jusqu&apos;à la suppression de votre compte + 1 an</li>
                <li>Données de navigation : 13 mois maximum</li>
                <li>Données de facturation : 10 ans (obligation légale)</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                7. Vos droits
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">✅ Droit d&apos;accès</h4>
                  <p className="text-white/60 text-sm">Obtenir une copie de vos données</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">✏️ Droit de rectification</h4>
                  <p className="text-white/60 text-sm">Corriger vos données inexactes</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">🗑️ Droit à l&apos;effacement</h4>
                  <p className="text-white/60 text-sm">Supprimer vos données</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">⛔ Droit d&apos;opposition</h4>
                  <p className="text-white/60 text-sm">Vous opposer au traitement</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">📦 Droit à la portabilité</h4>
                  <p className="text-white/60 text-sm">Récupérer vos données</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">🔒 Droit à la limitation</h4>
                  <p className="text-white/60 text-sm">Limiter le traitement</p>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à :{" "}
                <a href="mailto:dpo@mealmind.com" className="text-red-400 hover:text-red-300 transition font-semibold">
                  dpo@mealmind.com
                </a>
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                8. Sécurité des données
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger 
                vos données personnelles :
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 ml-4">
                <li>Cryptage des données sensibles (SSL/TLS)</li>
                <li>Authentification sécurisée</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Surveillance et détection des incidents</li>
                <li>Sauvegardes régulières</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                9. Transferts internationaux
              </h2>
              <p className="text-white/70 leading-relaxed">
                Vos données peuvent être transférées et stockées dans des pays en dehors de l&apos;Union Européenne. 
                Dans ce cas, nous nous assurons que des garanties appropriées sont en place conformément au RGPD 
                (clauses contractuelles types, Privacy Shield, etc.).
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                10. Modifications
              </h2>
              <p className="text-white/70 leading-relaxed">
                Nous pouvons modifier cette politique de confidentialité à tout moment. Les modifications seront 
                publiées sur cette page avec une date de mise à jour révisée. Nous vous encourageons à consulter 
                régulièrement cette page.
              </p>
            </section>

            {/* Section 11 */}
            <section className="border-t border-white/10 pt-6">
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                11. Contact
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Pour toute question concernant cette politique de confidentialité ou l&apos;exercice de vos droits :
              </p>
              <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-3 text-white/70">
                <p>
                  <span className="font-semibold text-white">Délégué à la Protection des Données (DPO) :</span>
                </p>
                <p>
                  <span className="font-semibold text-white">Email :</span>{" "}
                  <a href="mailto:dpo@mealmind.com" className="text-red-400 hover:text-red-300 transition">
                    dpo@mealmind.com
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-white">Adresse :</span> MealMind - DPO, 123 Avenue des Champs-Élysées, 75008 Paris, France
                </p>
                <p className="mt-4 pt-4 border-t border-white/10">
                  Vous avez également le droit d&apos;introduire une réclamation auprès de la CNIL :{" "}
                  <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 transition">
                    www.cnil.fr
                  </a>
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
