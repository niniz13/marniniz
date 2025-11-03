import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

/**
 * @fileoverview
 * Configuration du routage internationalisé (i18n) pour **Next.js**
 * à l’aide de **next-intl**.
 *
 * Ce fichier définit les langues disponibles, la locale par défaut,
 * et exporte des utilitaires de navigation compatibles avec la gestion multilingue.
 *
 * ---
 * 🔧 **Fonctionnalités principales :**
 * - Définition des locales supportées (`fr`, `en`)
 * - Gestion automatique de la locale par défaut (`fr`)
 * - Fourniture d’outils de navigation localisés (`Link`, `redirect`, `useRouter`, etc.)
 *
 * ---
 * 📁 **Structure habituelle du dossier i18n :**
 * ```
 * i18n/
 * ├── routing.js   → configuration des locales et navigation
 * └── request.js   → chargement dynamique des traductions
 * messages/
 * ├── fr.json
 * └── en.json
 * ```
 *
 * ---
 * 🧭 **Exemples d’utilisation :**
 * ```jsx
 * import { Link, useRouter } from '@/i18n/routing';
 *
 * export default function NavBar() {
 *   const router = useRouter();
 *
 *   return (
 *     <nav>
 *       <Link href="/" locale="fr">Accueil</Link>
 *       <Link href="/" locale="en">Home</Link>
 *     </nav>
 *   );
 * }
 * ```
 */

export const routing = defineRouting({
  /** 🌍 Liste des langues supportées par le site */
  locales: ["fr", "en"],

  /** 🏠 Langue par défaut utilisée si aucune locale n’est trouvée */
  defaultLocale: "fr",
});

/**
 * Ensemble d’outils de navigation localisés fournis par next-intl :
 * - `Link` : composant équivalent à `next/link` mais sensible à la locale
 * - `redirect` : redirection respectant la langue courante
 * - `usePathname`, `useRouter` : hooks adaptés aux routes multilingues
 */
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
