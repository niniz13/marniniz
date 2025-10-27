"use client";

import Menu from "../components/menu";
import Footer from "../components/footer";
import { Cookie } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="w-full min-h-screen bg-[#0e0e0e] text-white">
      <div className="fixed top-0 left-0 w-full z-10">
        <Menu />
      </div>

      <div className="pt-32 px-6 sm:px-12 md:px-20 lg:px-40 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Cookie size={48} className="text-red-600" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center">
              Politique de Cookies
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
                Qu&apos;est-ce qu&apos;un cookie ?
              </h2>
              <p className="text-white/70 leading-relaxed">
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) 
                lors de la visite d&apos;un site web. Il permet au site de mémoriser des informations sur votre visite, 
                comme votre langue préférée et d&apos;autres paramètres, afin de faciliter votre prochaine visite et 
                de rendre le site plus utile.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                Types de cookies utilisés
              </h2>
              
              <div className="space-y-6">
                {/* Cookies essentiels */}
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    🔒 Cookies essentiels
                  </h3>
                  <p className="text-white/70 mb-3">
                    Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés. 
                    Ils sont généralement établis en réponse à des actions que vous effectuez et qui constituent 
                    une demande de services (connexion, remplissage de formulaires, etc.).
                  </p>
                  <ul className="list-disc list-inside text-white/60 space-y-1 ml-4">
                    <li>Authentification et sécurité</li>
                    <li>Gestion de session</li>
                    <li>Préférences de l&apos;utilisateur</li>
                  </ul>
                </div>

                {/* Cookies de performance */}
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    📊 Cookies de performance
                  </h3>
                  <p className="text-white/70 mb-3">
                    Ces cookies nous permettent de compter les visites et les sources de trafic afin de mesurer 
                    et d&apos;améliorer les performances de notre site. Ils nous aident à savoir quelles pages sont 
                    les plus et les moins populaires et à voir comment les visiteurs naviguent sur le site.
                  </p>
                  <ul className="list-disc list-inside text-white/60 space-y-1 ml-4">
                    <li>Analyse du trafic</li>
                    <li>Statistiques de navigation</li>
                    <li>Amélioration de l&apos;expérience utilisateur</li>
                  </ul>
                </div>

                {/* Cookies fonctionnels */}
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    ⚙️ Cookies fonctionnels
                  </h3>
                  <p className="text-white/70 mb-3">
                    Ces cookies permettent au site d&apos;offrir des fonctionnalités améliorées et une personnalisation. 
                    Ils peuvent être définis par nous ou par des tiers dont nous avons ajouté les services à nos pages.
                  </p>
                  <ul className="list-disc list-inside text-white/60 space-y-1 ml-4">
                    <li>Mémorisation des préférences</li>
                    <li>Personnalisation du contenu</li>
                    <li>Fonctionnalités de partage social</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                Gestion des cookies
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer 
                tous les cookies déjà présents sur votre ordinateur et paramétrer la plupart des navigateurs pour 
                qu&apos;ils les bloquent.
              </p>
              <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Configuration par navigateur :
                </h3>
                <ul className="space-y-2 text-white/70">
                  <li>
                    <span className="font-semibold text-white">Chrome :</span> Paramètres → Confidentialité et sécurité → Cookies
                  </li>
                  <li>
                    <span className="font-semibold text-white">Firefox :</span> Options → Vie privée et sécurité → Cookies
                  </li>
                  <li>
                    <span className="font-semibold text-white">Safari :</span> Préférences → Confidentialité → Cookies
                  </li>
                  <li>
                    <span className="font-semibold text-white">Edge :</span> Paramètres → Confidentialité → Cookies
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                Cookies tiers
              </h2>
              <p className="text-white/70 leading-relaxed">
                Certains cookies peuvent être déposés par des services tiers (Google Analytics, réseaux sociaux, etc.). 
                Ces services ont leurs propres politiques de confidentialité et de cookies. Nous vous encourageons à 
                consulter leurs politiques respectives pour comprendre comment ils utilisent vos données.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                Durée de conservation
              </h2>
              <p className="text-white/70 leading-relaxed">
                Les cookies ont une durée de vie variable selon leur type :
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 mt-3 ml-4">
                <li>
                  <span className="text-white font-semibold">Cookies de session :</span> supprimés à la fermeture du navigateur
                </li>
                <li>
                  <span className="text-white font-semibold">Cookies persistants :</span> conservés jusqu&apos;à 13 mois maximum
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                Vos droits
              </h2>
              <p className="text-white/70 leading-relaxed">
                Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et 
                d&apos;opposition concernant vos données personnelles. Pour exercer ces droits ou pour toute question 
                concernant notre politique de cookies, vous pouvez nous contacter à l&apos;adresse suivante : 
                <span className="text-red-400 font-semibold"> contact@mealmind.com</span>
              </p>
            </section>

            {/* Section 7 */}
            <section className="border-t border-white/10 pt-6">
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                Modifications de cette politique
              </h2>
              <p className="text-white/70 leading-relaxed">
                Nous nous réservons le droit de modifier cette politique de cookies à tout moment. 
                Toute modification sera publiée sur cette page avec une date de mise à jour révisée. 
                Nous vous encourageons à consulter régulièrement cette page pour rester informé de nos pratiques.
              </p>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
