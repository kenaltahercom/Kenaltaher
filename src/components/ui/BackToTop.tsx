"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { MASCOT_POSES } from "@/data/mascot";

export default function BackToTop() {
  const { lang } = useLanguageTheme();
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  const loadingMascot = MASCOT_POSES.loading;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2 select-none">
      {/* Scroll Companion: Keno on holographic rings */}
      <div
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative cursor-pointer group flex flex-col items-center"
        role="button"
        tabIndex={0}
        aria-label={lang === "en" ? "Scroll companion Keno - click to return to top" : "Pendamping scroll Keno - klik untuk kembali ke atas"}
      >
        {/* Tooltip on hover */}
        <div
          className={`absolute bottom-full mb-2 whitespace-nowrap pointer-events-none transition-all duration-300 ${
            isHovered ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-1 pointer-events-none"
          }`}
        >
          <div className="glass-panel px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-800 dark:text-slate-100 border border-indigo-500/40 shadow-xl bg-white/95 dark:bg-slate-900/95 flex items-center gap-1.5">
            <span>🚀</span>
            <span>{lang === "en" ? "Back to top!" : "Kembali ke atas!"}</span>
          </div>
        </div>

        {/* Floating Mascot */}
        <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-110 animate-float-subtle">
          <Image
            src={loadingMascot.imageWebp}
            alt={loadingMascot.alt[lang] || loadingMascot.alt.id}
            fill
            sizes="56px"
            className="object-contain filter drop-shadow-[0_6px_16px_rgba(99,102,241,0.4)]"
          />
        </div>
      </div>

      {/* Button with Arrow */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={lang === "en" ? "Scroll to top of page" : "Kembali ke atas halaman"}
        className="p-2.5 rounded-full glass-panel hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/20 transition-all duration-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:scale-105"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}
