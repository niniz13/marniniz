"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/**
 * @fileoverview
 * Le composant `LoginEmailPage` gère la connexion utilisateur via email et mot de passe.
 *
 * Fonctionnalités :
 * - Authentification par **NextAuth (provider "credentials")**.
 * - Gestion d’erreurs et retours utilisateur via **react-hot-toast**.
 * - Redirection vers la page d’accueil après succès.
 * - Textes traduits avec **next-intl** (namespace : `LoginEmailPage`).
 * - Design responsive avec image de fond et effet visuel semi-transparent.
 */

/**
 * @component
 * @description
 * Page de connexion par email et mot de passe.
 * Authentifie l’utilisateur avec NextAuth et redirige vers la page principale locale.
 *
 * @example
 * ```jsx
 * import LoginEmailPage from "@/app/login-email/page";
 *
 * export default function Page() {
 *   return <LoginEmailPage />;
 * }
 * ```
 *
 * @returns {JSX.Element} Formulaire de connexion email/mot de passe avec gestion multilingue.
 */
export default function LoginEmailPage() {
  // --- États du formulaire ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- Hooks Next.js & next-intl ---
  const router = useRouter();
  const params = useParams();
  const t = useTranslations("LoginEmailPage");

  /**
   * @function handleSubmit
   * @description
   * Soumet le formulaire de connexion via NextAuth (`credentials`).
   * - En cas d’erreur → affiche un toast avec le message renvoyé.
   * - En cas de succès → affiche un message et redirige vers la page d’accueil locale.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - L’événement de soumission du formulaire.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      toast.error(t("loginFailed", { error: result.error }));
    } else {
      toast.success(t("loginSuccess"));
      router.push(`/${params.locale}`);
    }
  };

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

      {/* --- FORMULAIRE DE CONNEXION --- */}
      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-center">{t("title")}</h2>

        <input
          type="email"
          placeholder={t("emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex items-center justify-center gap-3 w-full bg-white/10 text-white font-semibold p-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30"
          required
        />

        <input
          type="password"
          placeholder={t("passwordPlaceholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex items-center justify-center gap-3 w-full bg-white/10 text-white font-semibold p-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30 mt-4"
          required
        />

        {/* --- BOUTON DE CONNEXION --- */}
        <button
          type="submit"
          className="bg-red-600 rounded-sm px-8 py-3 w-full text-white font-bold transition-all duration-300 hover:bg-red-400 cursor-pointer mt-4"
        >
          {t("loginButton")}
        </button>

        {/* --- LIEN MOT DE PASSE OUBLIÉ --- */}
        <div className="flex justify-center mt-4 gap-2">
          <p className="font-semibold text-base sm:text-lg md:text-sm text-center">
            {t("forgotPassword")}
          </p>
          <Link
            className="font-semibold text-base underline sm:text-lg md:text-sm text-center"
            href="#"
          >
            {t("resetPassword")}
          </Link>
        </div>

        {/* --- LIEN INSCRIPTION --- */}
        <div className="flex justify-center mt-2 gap-2">
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

        {/* --- AUTRE MÉTHODE DE CONNEXION --- */}
        <Link
          href="/login"
          className="flex items-center justify-center gap-3 w-full bg-black/30 hover:bg-black/10 text-white font-semibold py-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30 mt-4"
        >
          {t("useAnotherMethod")}
        </Link>
      </form>
    </div>
  );
}
