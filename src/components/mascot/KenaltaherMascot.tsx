"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

interface MascotProps {
  initialPose?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showGreeting?: boolean;
  className?: string;
  interactive?: boolean;
}

interface ExpressionData {
  image: string;
  icon: string;
  textId: string;
  textEn: string;
}

const EXPRESSIONS: ExpressionData[] = [
  {
    image: "/mascot/keno-official-transparent.png",
    icon: "✨",
    textId: "Hai, aku Keno! Selamat datang di portofolio Kenaltaher!",
    textEn: "Hi, I'm Keno! Welcome to Kenaltaher's portfolio!",
  },
  {
    image: "/mascot/keno-happy.png",
    icon: "😄",
    textId: "Hai! Senang bertemu denganmu!",
    textEn: "Hi! Nice to meet you!",
  },
  {
    image: "/mascot/keno-thinking.png",
    icon: "🤔",
    textId: "Hmm... coba kita pikirkan konsep terbaik!",
    textEn: "Hmm... let's think about the best concept!",
  },
  {
    image: "/mascot/keno-excited.png",
    icon: "🚀",
    textId: "Wah, siap membuat karya keren bareng!",
    textEn: "Wow, ready to build something awesome!",
  },
  {
    image: "/mascot/keno-love.png",
    icon: "💜",
    textId: "Makasih udah mampir ke sini!",
    textEn: "Thanks for stopping by!",
  },
  {
    image: "/mascot/keno-sleepy.png",
    icon: "😴",
    textId: "Zz... butuh kopi dulu nih biar coding lancar...",
    textEn: "Zz... need coffee first for smooth coding...",
  },
];

export default function KenaltaherMascot({
  size = "md",
  showGreeting = true,
  className = "",
  interactive = true,
}: MascotProps) {
  const { lang } = useLanguageTheme();
  const [exprIndex, setExprIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Dimension mapping
  const dimension =
    size === "sm" ? 44 : size === "md" ? 64 : size === "lg" ? 96 : 140;

  const currentExpr = EXPRESSIONS[exprIndex];

  const handleClick = () => {
    if (!interactive) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    setClicked(true);
    // Cycle to next expression
    setExprIndex((prev) => (prev + 1) % EXPRESSIONS.length);

    // After 3.5s of no click, return to default
    timerRef.current = setTimeout(() => {
      setClicked(false);
      setExprIndex(0);
    }, 3500);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const messageText = lang === "en" ? currentExpr.textEn : currentExpr.textId;

  return (
    <div
      className={`relative inline-flex items-center group ${
        interactive ? "cursor-pointer" : ""
      } select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role={interactive ? "button" : "img"}
      tabIndex={interactive ? 0 : undefined}
      aria-label="Maskot Keno"
      title={
        interactive
          ? lang === "en"
            ? "Click Keno to change mood!"
            : "Klik Keno untuk ganti ekspresi!"
          : "Keno"
      }
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-40 pointer-events-none" />

      {/* Mascot Graphic with Expression Switching */}
      <div
        className={`relative z-10 transition-transform duration-300 ease-out ${
          isHovered ? "scale-110 -rotate-2" : "scale-100"
        } ${clicked ? "animate-bounce" : ""}`}
        style={{ width: dimension, height: dimension }}
      >
        <Image
          key={currentExpr.image}
          src={currentExpr.image}
          alt="Maskot Keno Kenaltaher"
          width={dimension}
          height={dimension}
          priority={size === "sm" || size === "md"}
          className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(99,102,241,0.35)] transition-all duration-200"
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
            <span className="text-sm shrink-0">{currentExpr.icon}</span>
            <span className="tracking-wide">{messageText}</span>
          </div>
        </div>
      )}
    </div>
  );
}
