"use client";

import { signIn } from "next-auth/react";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/**
 * @fileoverview
 * Le composant `RegisterPage` gère la page principale d’inscription.
 * Il permet à l’utilisateur de choisir entre :
 * - Une inscription par email (redirigée vers `/register-email`)
 * - Une inscription via Google (OAuth NextAuth)
 *
 * Il affiche également un lien vers la page de connexion si l’utilisateur a déjà un compte.
 *
 * Le design repose sur une image de fond avec un effet sombre et des boutons semi-transparents.
 *
 * Technologies utilisées :
 * - **NextAuth** (`signIn`) pour la connexion OAuth avec Google.
 * - **Next-Intl** pour les traductions (`useTranslations`).
 * - **Next/Image** pour l’optimisation d’image.
 * - **Tailwind CSS** pour le style et la réactivité.
 */

/**
 * @component
 * @description
 * Page d’inscription principale permettant de choisir la méthode d’inscription
 * (email ou Google).
 * Redirige vers `/register-email` pour l’inscription classique et
 * utilise `signIn("google")` pour l’OAuth.
 *
 * @example
 * ```jsx
 * import RegisterPage from "@/app/register/page";
 *
 * export default function Page() {
 *   return <RegisterPage />;
 * }
 * ```
 *
 * @returns {JSX.Element} L’interface d’inscription avec boutons email et Google.
 */
export default function RegisterPage() {
  const t = useTranslations("RegisterPage");

  return (
    <div className="relative flex items-center justify-center min-h-screen text-white">
      {/* --- IMAGE D’ARRIÈRE-PLAN --- */}
      <Image
        src="/auth.webp"
        alt="hero image"
        quality={60}
        fill
        priority
        className="object-cover brightness-75"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* --- CONTENU --- */}
      <div className="relative z-10 w-full max-w-md">
        <h2 className="text-4xl font-bold mb-8 text-center drop-shadow-lg">
          {t("title")}
        </h2>

        {/* --- INSCRIPTION PAR EMAIL --- */}
        <Link
          href="/register-email"
          className="flex items-center justify-center gap-3 w-full bg-black/30 hover:bg-black/10 text-white font-semibold py-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30"
        >
          <Mail size={20} />
          {t("continueWithEmail")}
        </Link>

        {/* --- INSCRIPTION AVEC GOOGLE --- */}
        <button
          type="button"
          onClick={() => signIn("google")}
          className="flex items-center justify-center gap-3 w-full bg-black/30 hover:bg-black/10 text-white font-semibold py-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30 mt-4"
        >
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={20}
            height={20}
          />
          {t("continueWithGoogle")}
        </button>

        {/* --- LIEN VERS CONNEXION --- */}
        <div className="flex justify-center mt-4 gap-2">
          <p className="font-semibold text-base sm:text-lg md:text-sm text-center">
            {t("hasAccount")}
          </p>
          <Link
            className="font-semibold text-base underline sm:text-lg md:text-sm text-center"
            href="/login"
          >
            {t("signIn")}
          </Link>
        </div>
      </div>
    </div>
  );
}
