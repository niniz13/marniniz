"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
import { SessionProvider } from "next-auth/react";

/**
 * @fileoverview
 * StoreProvider est un composant React qui encapsule l'application
 * avec deux providers principaux :
 * - `SessionProvider` de NextAuth pour la gestion des sessions utilisateurs.
 * - `Provider` de Redux pour le store global.
 *
 * Ce composant s'assure que le store Redux est instancié une seule fois
 * côté client grâce à `useRef`, ce qui empêche sa recréation à chaque rendu.
 */

/**
 * @component
 * @description
 * Fournit le contexte de session NextAuth et le store Redux à toute l'application.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Les composants enfants à rendre dans le provider.
 *
 * @example
 * ```jsx
 * import StoreProvider from "./providers/StoreProvider";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="fr">
 *       <body>
 *         <StoreProvider>
 *           {children}
 *         </StoreProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 *
 * @returns {JSX.Element} Le provider combiné pour Redux et NextAuth.
 */
export default function StoreProvider({ children }) {
  const storeRef = useRef(null);

  // Crée le store Redux une seule fois à la première exécution.
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <SessionProvider>
      <Provider store={storeRef.current}>{children}</Provider>
    </SessionProvider>
  );
}
