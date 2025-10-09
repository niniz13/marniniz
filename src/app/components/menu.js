import GlassInput from "./glassInput";
import Link from "next/link";
import { User } from "lucide-react";

export default function Menu() {
  return (
    <div className="w-full flex flex-row justify-between items-center gap-4 px-[50px] py-5">
      <a href="/" className="font-black text-2xl tracking-[-0.05em]">
        MarNiniz
      </a>

      <div className="flex items-center gap-4">
        <Link
          href="/recipes"
          className="font-bold text-lg tracking-[-0.03em] hover:underline"
        >
          Recipes
        </Link>

        <Link
          href="/category"
          className="font-bold text-lg tracking-[-0.03em] hover:underline"
        >
          Category
        </Link>

        <GlassInput />

        <a
          href="/profile"
          className="backdrop-blur-md bg-transparent rounded-full border border-white/30 p-3 text-white transition-all duration-300 hover:bg-white/10 cursor-pointer"
        >
          <User size={22} strokeWidth={2.2} />
        </a>
      </div>
    </div>
  );
}
