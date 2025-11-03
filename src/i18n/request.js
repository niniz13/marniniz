import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * @fileoverview
 * Configuration i18n pour Next.js via **next-intl**.
 *
 * Cette fonction s’exécute côté serveur et détermine :
 * - la langue active de la requête (`requestLocale`)
 * - la langue par défaut si aucune langue valide n’est détectée
 * - les fichiers de traduction associés (`/messages/{locale}.json`)
 *
 * **Fonctionnement :**
 * 1. Récupère la locale à partir du contexte de la requête (`requestLocale`)
 * 2. Vérifie que cette locale est bien incluse dans `routing.locales`
 * 3. Charge dynamiquement les fichiers de traduction correspondants
 * 4. Fournit la configuration à `next-intl`
 *
 * **Exemple d’arborescence :**
 * ```
 * messages/
 * ├── en.json
 * ├── fr.json
 * └── es.json
 * i18n/
 * ├── routing.js
 * └── request.js
 * ```
 *
 * **Exemple d’utilisation :**
 * Ce fichier est automatiquement utilisé par Next.js dans les routes
 * internationales, notamment avec `next-intl` et `Middleware`.
 */

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Si aucune locale valide n’est détectée → fallback sur la langue par défaut
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  // Charge dynamiquement le fichier de traduction correspondant
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
