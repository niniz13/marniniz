import Image from "next/image";
import Menu from "./components/menu";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      <div className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="hero image"
          quality={60}
          fill
          priority
          className="object-cover brightness-75"
        />

        <div className="fixed top-0 left-0 w-full z-10">
          <Menu />
        </div>

        <div className="relative max-w-[1000px] flex flex-col justify-center items-center gap-4">
          <h1 className="font-black tracking-[-0.05em] leading-[1] text-5xl sm:text-6xl md:text-7xl">
            Planifie tes repas en quelques secondes grâce à l’IA
          </h1>

          <p className="max-w-[800px] leading-[1.2] font-semibold text-base sm:text-lg md:text-xl">
            Simplifie ta vie en cuisine grâce à notre IA intelligente. En un
            clic, génère ton planning de repas pour la semaine, accompagné de la
            liste de courses complète et optimisée. Tu veux de l’inspiration ?
            Explore des centaines de recettes selon tes envies, ton régime ou
            les ingrédients que tu as déjà chez toi.
          </p>

          <Link
            href="/recipes"
            className="bg-red-600 rounded-sm px-8 py-3 text-white font-bold transition-all duration-300 hover:bg-red-400 cursor-pointer"
          >
            Créer mon planning
          </Link>
        </div>
      </div>
    </div>
  );
}
