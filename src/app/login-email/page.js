"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginEmailPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  };

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

      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-md ">
        <h2 className="text-4xl font-bold mb-6 text-center">Connexion</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex items-center justify-center gap-3 w-full bg-white/10 text-white font-semibold p-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex items-center justify-center gap-3 w-full bg-white/10 text-white font-semibold p-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30 mt-4"
          required
        />

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <button
          type="submit"
          className="bg-red-600 rounded-sm px-8 py-3 w-full text-white font-bold transition-all duration-300 hover:bg-red-400 cursor-pointer mt-4"
        >
          Connexion
        </button>
        <div className="flex justify-center mt-4 gap-2">
          <p className="font-semibold text-base sm:text-lg md:text-sm text-center">
            Mot de passe oublié ? 
          </p>
          <Link className="font-semibold text-base underline sm:text-lg md:text-sm text-center" href="#">Réinitialisez-le</Link>
        </div>
        <div className="flex justify-center mt-2 gap-2">
          <p className="font-semibold text-base sm:text-lg md:text-sm text-center">
            Vous n&apos;avez pas de compte ?
          </p>
          <Link className="font-semibold text-base underline sm:text-lg md:text-sm text-center" href="/register">Inscrivez-vous</Link>
        </div>
        <Link
          href="/login"
          className="flex items-center justify-center gap-3 w-full bg-black/30 hover:bg-black/10 text-white font-semibold py-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30 mt-4"
        >
          Utiliser une autre méthode
        </Link>
      </form>
    </div>
  );
}
