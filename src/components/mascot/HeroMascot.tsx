"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import {
  MascotPose,
  MASCOT_POSES,
  INTERACTIVE_EXPRESSIONS,
} from "@/data/mascot";

const HERO_MASCOT_MESSAGES = [
  { id: "Hai! Selamat datang! 👋", en: "Hi! Welcome! 👋", icon: "✨" },
  { id: "Scroll ke bawah ya!", en: "Scroll down!", icon: "⬇️" },
  { id: "Yuk, kenalan dulu!", en: "Let's get to know each other!", icon: "🤝" },
];

export default function HeroMascot() {
  const { lang } = useLanguageTheme();
  const [currentPose, setCurrentPose] = useState<MascotPose>("happy");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [expressionIndex, setExpressionIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-switch message every 3 seconds
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % HERO_MASCOT_MESSAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setClicked(true);
    const nextIdx = (expressionIndex + 1) % INTERACTIVE_EXPRESSIONS.length;
    setExpressionIndex(nextIdx);
    setCurrentPose(INTERACTIVE_EXPRESSIONS[nextIdx]);

    timeoutRef.current = setTimeout(() => {
      setCurrentPose("happy");
      setClicked(false);
    }, 3200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const poseData = MASCOT_POSES[currentPose] || MASCOT_POSES.happy;
  const currentMsg = HERO_MASCOT_MESSAGES[messageIndex];

  return (
    <div
      className="absolute left-2 sm:left-4 md:left-8 lg:left-12 bottom-[18%] sm:bottom-[20%] md:bottom-[22%] z-30 pointer-events-auto select-none cursor-pointer group"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label="Mascot Keno di area hero. Klik untuk ganti ekspresi."
    >
      {/* Speech bubble above Keno */}
      <div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 sm:mb-3 z-40 whitespace-nowrap pointer-events-none transition-all duration-300 ${
          isHovered || clicked
            ? "opacity-100 translate-y-0"
            : "opacity-90 translate-y-0"
        }`}
      >
        <div className="relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-100 border border-indigo-500/40 shadow-2xl flex items-center gap-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <span className="text-xs sm:text-sm shrink-0">
            {clicked ? "❤️" : currentMsg.icon}
          </span>
          <span className="transition-opacity duration-300 font-sans tracking-tight">
            {clicked
              ? lang === "en"
                ? "Click again! 😄"
                : "Klik lagi! 😄"
              : currentMsg[lang] || currentMsg.id}
          </span>
          {/* Bubble tail */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-indigo-500/40" />
        </div>
      </div>

      {/* Subtle glow underneath */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 sm:h-6 bg-indigo-500/20 blur-lg rounded-full pointer-events-none" />

      {/* Mascot image with idle animation */}
      <div
        className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 transition-transform duration-300 ${
          isHovered ? "scale-110 -rotate-3" : "scale-100"
        } ${clicked ? "animate-bounce" : "animate-float-subtle"}`}
      >
        <Image
          src={poseData.imageWebp}
          alt={poseData.alt[lang] || poseData.alt.id}
          fill
          sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
          priority
          className="object-contain filter drop-shadow-[0_8px_24px_rgba(99,102,241,0.4)]"
        />
      </div>
    </div>
  );
}
