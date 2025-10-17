"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { Mail } from "lucide-react";
import Image from "next/image";

export default function RegisterPage() {

  return (
    <div className="relative flex items-center justify-center min-h-screen text-white">
      {/* Image d’arrière-plan */}
      <Image
          src="/auth.webp"
          alt="hero image"
          quality={60}
          fill
          priority
          className="object-cover brightness-75"
        />
      <div className="absolute inset-0 bg-black/60"></div>

      <div
        className="relative z-10 w-full max-w-md "
      >
        <h2 className="text-4xl font-bold mb-8 text-center drop-shadow-lg">
          Inscription
        </h2>

        {/* Bouton Email */}
        <Link
          href="/register-email"
          className="flex items-center justify-center gap-3 w-full bg-black/30 hover:bg-black/10 text-white font-semibold py-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30"
        >
          <Mail size={20} />
          Continuer avec un email
        </Link>

        {/* Bouton Google */}
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
          Continuer avec Google
        </button>
        <div className="flex justify-center mt-4 gap-2">
          <p className="font-semibold text-base sm:text-lg md:text-sm text-center">
            Vous avez déjà un compte ?
          </p>
          <Link className="font-semibold text-base underline sm:text-lg md:text-sm text-center" href="/login">Connectez-vous</Link>
        </div>
      </div>
    </div>
  );
}
