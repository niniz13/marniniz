"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", image: "/default-avatar.svg" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(`Echec de l'inscription : ${data.message}`);
    } else {
      toast.success("Inscription réussie ! Redirection vers la page de connexion...");
      setTimeout(() => router.push("/login"), 2000);
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
        <h2 className="text-3xl font-bold mb-6 text-center">Inscription</h2>

        <div className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className="flex items-center justify-center gap-3 w-full bg-white/10 text-white font-semibold p-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="flex items-center justify-center gap-3 w-full bg-white/10 text-white font-semibold p-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="flex items-center justify-center gap-3 w-full bg-white/10 text-white font-semibold p-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30"
            required
          />

          <button
            type="submit"
            className="bg-red-600 rounded-sm px-8 py-3 w-full text-white font-bold transition-all duration-300 hover:bg-red-400 cursor-pointer mt-4"
          >
            Inscription
          </button>
        </div>

        <div className="flex justify-center mt-4 gap-2">
          <p className="font-semibold text-base sm:text-lg md:text-sm text-center">
            Vous avez déjà un compte ?
          </p>
          <Link className="font-semibold text-base underline sm:text-lg md:text-sm text-center" href="/login">Connectez-vous</Link>
        </div>
        <Link
          href="/register"
          className="flex items-center justify-center gap-3 w-full bg-black/30 hover:bg-black/10 text-white font-semibold py-3 rounded-lg transition-all duration-200 backdrop-blur-3xl border border-white/30 mt-4"
        >
          Utiliser une autre méthode
        </Link>
      </form>
    </div>
  );
}
