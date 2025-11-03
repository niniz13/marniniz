"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/**
 * @fileoverview
 * Le composant `RegisterPage` gère l’inscription des utilisateurs par email et mot de passe.
 *
 * Il inclut :
 * - Un formulaire complet d’inscription (nom, email, mot de passe).
 * - Un feedback utilisateur via `react-hot-toast`.
 * - Une redirection automatique vers la page de connexion après succès.
 * - Des textes multilingues via `next-intl`.
 * - Une image de fond avec effet d’assombrissement (`next/image`).
 *
 * Ce composant est **responsive**, simple et s’intègre dans la logique d’authentification du site.
 */

/**
 * @component
 * @description
 * Page d’inscription utilisateur (par email).
 * Envoie les données du formulaire à l’API `/api/register`, affiche un message de succès ou d’erreur, puis redirige vers la page de connexion localisée.
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
 * @returns {JSX.Element} Le formulaire d’inscription avec gestion des retours utilisateur et traduction dynamique.
 */
export default function RegisterPage() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations("RegisterEmailPage");

  // --- État du formulaire ---
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    image: "/default-avatar.svg",
  });

  /**
   * @function handleChange
   * @description
   * Met à jour les champs du formulaire à chaque saisie utilisateur.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Événement de changement d’un champ du formulaire.
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * @function handleSubmit
   * @description
   * Soumet le formulaire d’inscription au backend (`/api/register`) :
   * - Affiche un toast d’erreur si la requête échoue.
   * - Affiche un toast de succès sinon, puis redirige vers la page de connexion localisée.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Événement de soumission du formulaire.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(t("registerFailed", { message: data.message }));
    } else {
      toast.success(t("registerSuccess"));
      setTimeout(() => router.push(`/${params.locale}/login`), 2000);
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

      {/* --- FORMULAIRE D’INSCRIPTION --- */}
      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">{t("title")}</h2>

        <div className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder={t("namePlaceholder")}
            value={form.name}
            onChange={handleChange}
            className="flex items-center justify-center gap-3 w-full bg-white/10 text-white font-semibold p-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30"
            required
          />

          <input
            name="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            value={form.email}
            onChange={handleChange}
            className="flex items-center justify-center gap-3 w-full bg-white/10 text-white font-semibold p-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30"
            required
          />

          <input
            name="password"
            type="password"
            placeholder={t("passwordPlaceholder")}
            value={form.password}
            onChange={handleChange}
            className="flex items-center justify-center gap-3 w-full bg-white/10 text-white font-semibold p-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30"
            required
          />

          <button
            type="submit"
            className="bg-red-600 rounded-sm px-8 py-3 w-full text-white font-bold transition-all duration-300 hover:bg-red-400 cursor-pointer mt-4"
          >
            {t("registerButton")}
          </button>
        </div>

        {/* --- LIENS SECONDAIRES --- */}
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
        <Link
          href="/register"
          className="flex items-center justify-center gap-3 w-full bg-black/30 hover:bg-black/10 text-white font-semibold py-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30 mt-4"
        >
          {t("useAnotherMethod")}
        </Link>
      </form>
    </div>
  );
}
