import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./features/favoriteRecipes/favoriteRecipesSlice";

/**
 * @fileoverview
 * Configuration du **store Redux** principal de l’application.
 *
 * Ce fichier crée et exporte la fonction `makeStore`, utilisée pour
 * initialiser un **store Redux Toolkit** avec les différents reducers de l’app.
 *
 * ---
 * ⚙️ **Fonctionnalités principales :**
 * - Centralisation de l’état global
 * - Utilisation de Redux Toolkit pour réduire le boilerplate
 * - Préparation à une intégration dans Next.js (avec `makeStore()` compatible `next-redux-wrapper`)
 *
 * ---
 * 🧩 **Structure recommandée :**
 * ```
 * redux/
 * ├── features/
 * │   └── recipes/
 * │       ├── recipesSlice.js
 * │       └── recipesSelectors.js
 * ├── store.js
 * └── hooks.js
 * ```
 *
 * ---
 * 💡 **Exemple d’utilisation :**
 * ```js
 * // pages/_app.js (ou layout.js pour App Router)
 * import { Provider } from "react-redux";
 * import { makeStore } from "@/redux/store";
 *
 * const store = makeStore();
 *
 * export default function App({ Component, pageProps }) {
 *   return (
 *     <Provider store={store}>
 *       <Component {...pageProps} />
 *     </Provider>
 *   );
 * }
 * ```
 *
 * @function makeStore
 * @returns {import('@reduxjs/toolkit').EnhancedStore} Store Redux configuré avec les reducers applicatifs.
 */

export const makeStore = () => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
  });
};
