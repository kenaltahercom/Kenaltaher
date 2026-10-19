"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { MASCOT_POSES, HERO_SHOULDER_MESSAGES } from "@/data/mascot";

export default function HeroShoulderMascot() {
  const { lang } = useLanguageTheme();
  const [messageIndex, setMessageIndex] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-switch message every 2 seconds with smooth transition
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % HERO_SHOULDER_MESSAGES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setClicked(true);
    setTimeout(() => setClicked(false), 2400);
  };

  const currentMsg = HERO_SHOULDER_MESSAGES[messageIndex];
  const shoulderData = MASCOT_POSES.shoulder;

  return (
    <div
      className="absolute left-[65%] sm:left-[66%] md:left-[67%] bottom-[42%] sm:bottom-[43%] md:bottom-[44%] w-[25%] sm:w-[24%] md:w-[22%] max-w-[155px] z-30 pointer-events-auto select-none cursor-pointer group rotate-[2deg]"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label="Keno di bahu kiri Taher. Klik untuk sapaan."
    >
      {/* Speech Bubble Paired Above Keno's Head (Switches every 2 seconds) */}
      <div
        className="absolute bottom-full right-0 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto mb-2 sm:mb-3 z-40 whitespace-nowrap pointer-events-none transition-all duration-300"
      >
        <div className="relative px-2.5 sm:px-3.5 py-1.5 rounded-2xl text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-100 border border-indigo-500/40 shadow-2xl flex items-center gap-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <span className="text-xs sm:text-sm shrink-0">
            {clicked ? "❤️" : currentMsg.icon}
          </span>
          <span className="transition-opacity duration-300 font-sans tracking-tight">
            {clicked
              ? (lang === "en" ? "Let's create together!" : "Yuk, berkarya bareng!")
              : (currentMsg[lang] || currentMsg.id)}
          </span>
          {/* Bubble tail pointing down towards Keno */}
          <div className="absolute top-full right-6 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-indigo-500/40" />
        </div>
      </div>

      {/* Subtle Glowing Aura underneath Keno */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-indigo-500/25 blur-md rounded-full pointer-events-none" />

      {/* Mascot Graphic with Gentle Idle Breathing/Typing Animation */}
      <div
        className={`relative w-full aspect-square transition-transform duration-300 ${
          isHovered ? "scale-105" : "scale-100"
        } ${clicked ? "animate-bounce" : "animate-float-subtle"}`}
      >
        <Image
          src={shoulderData.imageWebp}
          alt={shoulderData.alt[lang] || shoulderData.alt.id}
          fill
          sizes="(max-width: 640px) 90px, (max-width: 768px) 120px, 155px"
          priority
          className="object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
        />
      </div>
    </div>
  );
}
