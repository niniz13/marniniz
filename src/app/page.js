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

        <div className="relative z-10 max-w-[500px] flex flex-col justify-center items-center gap-4">
          <h1 className="font-black tracking-[-0.05em] leading-[0.9] text-5xl sm:text-6xl md:text-7xl">
            MarNiniz
          </h1>

          <p className="font-extrabold text-base sm:text-lg md:text-xl">
            Discover homemade dishes made with seasonal ingredients, for
            healthy, modern and delicious cuisine.
          </p>

          <Link
            href="/recipes"
            className="backdrop-blur-md bg-transparent rounded-full border border-white/30 px-8 py-3 text-white font-bold transition-all duration-300 hover:bg-white/10 cursor-pointer"
          >
            See all recipes
          </Link>
        </div>
      </div>
    </div>
  );
}
