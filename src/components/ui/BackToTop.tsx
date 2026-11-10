"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

export default function BackToTop() {
  const { lang } = useLanguageTheme();
  const [visible, setVisible] = useState(false);

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

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={
          lang === "en" ? "Scroll to top of page" : "Kembali ke atas halaman"
        }
        className="group relative p-3 rounded-full glass-panel hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/20 transition-all duration-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:scale-110 active:scale-95 flex items-center justify-center"
      >
        <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}
