"use client";

import Link from "next/link";
import { Instagram, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0c0c0c] text-white/80 py-12  border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Navigation */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Navigation</h3>
          <p className="text-white/60 mb-4">
            Explorez les recettes, découvrez notre planning intelligent ou revenez à l’accueil.
          </p>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-red-400 transition">Accueil</Link></li>
            <li><Link href="/recipes-search" className="hover:text-red-400 transition">Recettes</Link></li>
            <li><Link href="/planning-ia" className="hover:text-red-400 transition">Planning IA</Link></li>
          </ul>
        </div>

        {/* A propos */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">À propos</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-red-400 transition">Notre mission</Link></li>
            <li><Link href="/contact" className="hover:text-red-400 transition">Contact</Link></li>
            <li><Link href="/blog" className="hover:text-red-400 transition">Blog</Link></li>
          </ul>
        </div>

        {/* Légal */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Légal</h3>
          <ul className="space-y-2">
            <li><Link href="/mentions-legales" className="hover:text-red-400 transition">Mentions légales</Link></li>
            <li><Link href="/confidentialite" className="hover:text-red-400 transition">Politique de confidentialité</Link></li>
            <li><Link href="/cookies" className="hover:text-red-400 transition">Cookies</Link></li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Suivez-nous</h3>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-white/70 hover:text-red-400 transition">
              <Instagram size={22} />
            </Link>
            <Link href="#" className="text-white/70 hover:text-red-400 transition">
              <Github size={22} />
            </Link>
            <Link href="#" className="text-white/70 hover:text-red-400 transition">
              <Linkedin size={22} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} MealMind Website — Tous droits réservés.
      </div>
    </footer>
  );
}
