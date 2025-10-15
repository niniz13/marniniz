"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Something went wrong");
    } else {
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-400 text-sm mb-3">{success}</p>}

        <div className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded bg-transparent border border-white/30 focus:border-white outline-none"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded bg-transparent border border-white/30 focus:border-white outline-none"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-3 rounded bg-transparent border border-white/30 focus:border-white outline-none"
            required
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 transition rounded p-3 font-bold"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded p-3 font-bold mt-4"
          >
            Sign in with Google
          </button>
        </div>

        <p className="text-sm text-center mt-4 text-white/70">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-green-400 cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
}
