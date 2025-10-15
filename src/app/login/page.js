"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
    <div className="flex items-center justify-center min-h-screen bg-[#0e0e0e] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 p-8 rounded-2xl border border-white/10 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-white/10 border border-white/20"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-white/10 border border-white/20"
          required
        />

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded transition"
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => signIn("google")}
          className="w-full bg-blue-600 hover:bg-blue-700 transition rounded p-3 font-bold mt-4"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
