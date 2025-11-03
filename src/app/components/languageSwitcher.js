"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleLanguageChange = (e) => {
    const newLocale = e.target.value;
    router.replace(pathname, { locale: newLocale });
  };

  const currentFlag = params.locale === "fr" ? "/fr.svg" : "/en.svg";

  return (
    <div className="relative flex items-center gap-2">
      {/* Affiche le drapeau actif */}
      <div className="w-7 h-7 rounded-full overflow-hidden border border-white/30 shadow-sm">
        <Image
          src={currentFlag}
          alt={params.locale === "fr" ? "Français" : "English"}
          width={28}
          height={28}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Select invisible visuellement, mais accessible */}
      <select
        onChange={handleLanguageChange}
        value={params.locale}
        className="appearance-none bg-transparent text-transparent absolute inset-0 opacity-0 cursor-pointer"
        aria-label="Select language"
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>

      {/* Icône de flèche */}
      <svg
        className="w-4 h-4 text-white/60 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
