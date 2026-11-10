"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

export default function HeroMascot() {
  const { lang } = useLanguageTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1600);
  };

  const scrollText = lang === "en" ? "Scroll down! ⬇️" : "Scroll ke bawah ya! ⬇️";

  return (
    <div
      className="absolute left-4 sm:left-8 md:left-12 bottom-6 sm:bottom-10 z-30 pointer-events-auto select-none cursor-pointer group flex items-center gap-3"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label="Maskot Keno Scroll Down"
    >
      {/* Mascot Image */}
      <div
        className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-transform duration-300 ${
          isHovered ? "scale-110 -rotate-3" : "scale-100"
        } ${clicked ? "animate-bounce" : "animate-float-subtle"}`}
      >
        <Image
          src="/mascot/keno-official-transparent.png"
          alt="Maskot Keno"
          fill
          priority
          sizes="(max-width: 640px) 56px, 80px"
          className="object-contain filter drop-shadow-[0_8px_24px_rgba(99,102,241,0.4)]"
        />
      </div>

      {/* Pill Speech / Scroll Down Indicator Badge */}
      <div className="glass-panel px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-white/10 shadow-lg backdrop-blur-md flex items-center gap-1.5">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-mono tracking-tight">{scrollText}</span>
      </div>
    </div>
  );
}
