"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import {
  MascotPose,
  MASCOT_POSES,
  INTERACTIVE_EXPRESSIONS,
} from "@/data/mascot";

interface MascotProps {
  initialPose?: MascotPose;
  size?: "sm" | "md" | "lg" | "xl";
  showGreeting?: boolean;
  className?: string;
  interactive?: boolean;
}

export default function KenaltaherMascot({
  initialPose = "navbar",
  size = "md",
  showGreeting = true,
  className = "",
  interactive = true,
}: MascotProps) {
  const { lang } = useLanguageTheme();
  const [currentPose, setCurrentPose] = useState<MascotPose>(initialPose);
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [expressionIndex, setExpressionIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [prevInitialPose, setPrevInitialPose] = useState(initialPose);
  if (prevInitialPose !== initialPose) {
    setPrevInitialPose(initialPose);
    setCurrentPose(initialPose);
  }

  // Dimension mapping
  const dimension =
    size === "sm" ? 44 : size === "md" ? 64 : size === "lg" ? 96 : 140;

  const currentData = MASCOT_POSES[currentPose] || MASCOT_POSES.navbar;

  const handleInteract = () => {
    if (!interactive) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setClicked(true);
    // Cycle to next expression
    const nextIdx = (expressionIndex + 1) % INTERACTIVE_EXPRESSIONS.length;
    setExpressionIndex(nextIdx);
    setCurrentPose(INTERACTIVE_EXPRESSIONS[nextIdx]);

    // Return to default pose after 3.2 seconds
    timeoutRef.current = setTimeout(() => {
      setCurrentPose(initialPose);
      setClicked(false);
    }, 3200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleInteract();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const messageText = currentData.textPair[lang] || currentData.textPair.id;
  const icon = currentData.textPair.icon || "✨";

  return (
    <div
      className={`relative inline-flex items-center group ${
        interactive ? "cursor-pointer" : ""
      } select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleInteract}
      onKeyDown={handleKeyDown}
      role={interactive ? "button" : "img"}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`Maskot Keno (${currentData.title[lang] || currentData.title.id})`}
      title={interactive ? (lang === "en" ? "Click Keno to switch mood!" : "Klik Keno untuk ganti ekspresi!") : undefined}
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-40 pointer-events-none" />

      {/* Mascot Graphic */}
      <div
        className={`relative z-10 transition-transform duration-300 ease-out ${
          isHovered ? "scale-110 -rotate-2" : "scale-100"
        } ${clicked ? "animate-bounce" : ""}`}
        style={{ width: dimension, height: dimension }}
      >
        <Image
          src={currentData.imageWebp}
          alt={currentData.alt[lang] || currentData.alt.id}
          width={dimension}
          height={dimension}
          priority={size === "sm" || size === "md"}
          className="w-full h-full object-contain filter drop-shadow-[0_4px_14px_rgba(99,102,241,0.35)]"
        />
      </div>

      {/* Speech Bubble / Paired Text */}
      {showGreeting && (
        <div
          className={`absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap z-50 pointer-events-none transition-all duration-300 ${
            isHovered || clicked
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-2 hidden sm:block"
          }`}
        >
          <div className="glass-panel px-3.5 py-2 rounded-2xl text-xs font-semibold text-slate-800 dark:text-slate-100 border border-indigo-500/40 shadow-xl flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
            <span className="text-sm shrink-0">{icon}</span>
            <span className="tracking-wide">{messageText}</span>
          </div>
        </div>
      )}
    </div>
  );
}
