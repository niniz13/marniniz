"use client";

import { signIn } from "next-auth/react";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/**
 * @fileoverview
 * Le composant `LoginPage` affiche la page de connexion principale.
 * Il propose deux méthodes d’authentification :
 * - Connexion par email (redirige vers `/login-email`)
 * - Connexion via Google (OAuth avec NextAuth)
 *
 * Il inclut également un lien vers la page d’inscription si l’utilisateur n’a pas encore de compte.
 *
 * Caractéristiques :
 * - Texte traduit avec `next-intl` (namespace : `LoginPage`)
 * - Effet visuel avec image de fond et overlay sombre
 * - Boutons semi-transparents avec animation douce
 * - Entièrement responsive
 */

/**
 * @component
 * @description
 * Page de connexion principale du site.
 * Permet à l’utilisateur de choisir entre la connexion par email ou via Google.
 *
 * @example
 * ```jsx
 * import LoginPage from "@/app/login/page";
 *
 * export default function Page() {
 *   return <LoginPage />;
 * }
 * ```
 *
 * @returns {JSX.Element} L’interface de connexion principale avec gestion multilingue.
 */
export default function LoginPage() {
  const t = useTranslations("LoginPage");

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

      {/* --- CONTENU PRINCIPAL --- */}
      <div className="relative z-10 w-full max-w-md">
        <h2 className="text-4xl font-bold mb-8 text-center drop-shadow-lg">
          {t("title")}
        </h2>

        {/* --- CONNEXION PAR EMAIL --- */}
        <Link
          href="/login-email"
          className="flex items-center justify-center gap-3 w-full bg-black/30 hover:bg-black/10 text-white font-semibold py-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30"
        >
          <Mail size={20} />
          {t("continueWithEmail")}
        </Link>

        {/* --- CONNEXION VIA GOOGLE --- */}
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

        {/* --- LIEN VERS INSCRIPTION --- */}
        <div className="flex justify-center mt-4 gap-2">
          <p className="font-semibold text-base sm:text-lg md:text-sm text-center">
            {t("noAccount")}
          </p>
          <Link
            className="font-semibold text-base underline sm:text-lg md:text-sm text-center"
            href="/register"
          >
            {t("signUp")}
          </Link>
        </div>
      </div>
    </div>
  );
}
