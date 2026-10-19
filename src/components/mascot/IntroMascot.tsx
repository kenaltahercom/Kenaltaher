"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { MASCOT_POSES } from "@/data/mascot";

interface IntroMascotProps {
  onComplete?: () => void;
}

export default function IntroMascot({ onComplete }: IntroMascotProps) {
  const { lang } = useLanguageTheme();
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("kenaltaher_intro_seen") !== "true";
    }
    return true;
  });
  const [isSlidingOut, setIsSlidingOut] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsSlidingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("kenaltaher_intro_seen", "true");
      }
      if (onComplete) onComplete();
    }, 700);
  }, [onComplete]);

  useEffect(() => {
    if (!isVisible) {
      if (onComplete) onComplete();
      return;
    }

    // Auto-advance after 2.8s
    const timer = setTimeout(() => {
      handleDismiss();
    }, 2800);

    return () => clearTimeout(timer);
  }, [isVisible, onComplete, handleDismiss]);

  if (!isVisible) return null;

  const introData = MASCOT_POSES.intro;
  const greetingText =
    lang === "en"
      ? introData.textPair.en
      : "Selamat datang di portofolio Kenaltaher!";

  const skipText =
    lang === "en" ? "Enter Portfolio →" : "Masuk ke Portofolio →";

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07070a]/95 backdrop-blur-2xl transition-all duration-700 ease-in-out ${
        isSlidingOut
          ? "opacity-0 -translate-y-16 scale-105 pointer-events-none"
          : "opacity-100 translate-y-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Intro Sapaan Maskot Kenaltaher"
    >
      {/* Dynamic ambient glow */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/25 rounded-full blur-[150px] pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
        {/* Mascot Graphic with greeting entrance */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 mb-6 transition-transform duration-500 hover:scale-105">
          <Image
            src={introData.imageWebp}
            alt={introData.alt[lang] || introData.alt.id}
            fill
            priority
            className="object-contain filter drop-shadow-[0_12px_36px_rgba(99,102,241,0.5)]"
          />
        </div>

        {/* Paired Greeting Speech Bubble */}
        <div className="relative px-6 py-4 rounded-3xl border border-indigo-500/40 shadow-2xl mb-6 bg-slate-900/90 backdrop-blur-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="text-xl shrink-0">✨</span>
          <p className="text-base sm:text-xl font-bold text-white tracking-wide font-sans">
            {greetingText}
          </p>
        </div>

        {/* Skip Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="text-xs font-mono text-slate-300 hover:text-white transition-colors py-2 px-5 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {skipText}
        </button>
      </div>
    </div>
  );
}
