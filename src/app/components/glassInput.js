/**
 * @fileoverview
 * Le composant `GlassInput` est un champ de saisie stylisé avec un effet "glassmorphism"
 * (flou d’arrière-plan et bordure translucide).
 * Il est conçu comme un **input contrôlé**, recevant sa valeur et ses gestionnaires d’événements
 * via les props.
 *
 * Ce composant est idéal pour les barres de recherche ou les champs de saisie modernes.
 */

/**
 * @component
 * @description
 * Champ de saisie réutilisable avec design "verre dépoli" (glassmorphism).
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.value - La valeur actuelle du champ (composant contrôlé).
 * @param {function(React.ChangeEvent<HTMLInputElement>): void} props.onChange - Callback appelée à chaque changement de texte.
 * @param {function(React.KeyboardEvent<HTMLInputElement>): void} [props.onKeyDown] - Callback appelée lors d’un événement clavier (optionnelle).
 *
 * @example
 * ```jsx
 * import { useState } from "react";
 * import GlassInput from "@/components/GlassInput";
 *
 * export default function SearchBar() {
 *   const [query, setQuery] = useState("");
 *
 *   return (
 *     <GlassInput
 *       value={query}
 *       onChange={(e) => setQuery(e.target.value)}
 *       onKeyDown={(e) => {
 *         if (e.key === "Enter") console.log("Recherche :", query);
 *       }}
 *     />
 *   );
 * }
 * ```
 *
 * @returns {JSX.Element} Le champ de saisie avec effet glassmorphism.
 */
export default function GlassInput({ value, onChange, onKeyDown }) {
  return (
    <div className="backdrop-blur-3xl bg-transparent rounded-full border border-white/30 w-full max-w-[400px]">
      <input
        placeholder="Rechercher..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="text-white border-none outline-none px-5 py-3 font-semibold bg-transparent w-full placeholder-white/70"
      />
    </div>
  );
}
