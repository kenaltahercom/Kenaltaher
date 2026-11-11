"use client";

import React from "react";
import Image from "next/image";
import HeroMusicPlayer from "@/components/ui/HeroMusicPlayer";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

export default function HeroSection() {
  const { theme } = useLanguageTheme();
  const isDark = theme === "dark";

  const marqueeNames = [
    "TAHER DAENG MATORA",
    "KENALTAHER",
    "TAHER DAENG MATORA",
    "KENALTAHER",
  ];

  return (
    <section
      aria-label="Hero Taher Daeng Matora"
      className="relative min-h-screen w-full flex flex-col justify-end overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Ambient background depth */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[400px] sm:h-[550px] bg-indigo-600/10 dark:bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none -z-20" />

      {/* Richard Miculob Style: Concentric Acoustic / Radar Rings Centered Behind Head */}
      <div
        className="absolute top-[38%] sm:top-[35%] md:top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] pointer-events-none -z-10 flex items-center justify-center select-none"
        aria-hidden="true"
      >
        <div className="absolute w-[220px] h-[220px] rounded-full border border-slate-300/40 dark:border-white/[0.08]" />
        <div className="absolute w-[380px] h-[380px] rounded-full border border-slate-300/30 dark:border-white/[0.06]" />
        <div className="absolute w-[540px] h-[540px] rounded-full border border-slate-300/20 dark:border-white/[0.04]" />
        <div className="absolute w-[700px] h-[700px] rounded-full border border-slate-300/15 dark:border-white/[0.025]" />
        <div className="absolute w-[860px] h-[860px] rounded-full border border-slate-300/10 dark:border-white/[0.015]" />
      </div>

      {/* Layer 1: Giant Solid Typography Behind Portrait (Official Varien Font, Solid White) */}
      <div
        className="absolute top-[32%] sm:top-[28%] md:top-[24%] left-0 right-0 w-full overflow-hidden select-none pointer-events-none z-10"
        aria-hidden="true"
      >
        <div className="animate-marquee flex items-center gap-12 sm:gap-20 py-2 will-change-transform">
          {[...marqueeNames, ...marqueeNames, ...marqueeNames].map((name, idx) => (
            <div key={idx} className="flex items-center whitespace-nowrap">
              <span
                className="text-[clamp(5.5rem,19vw,21rem)] font-black uppercase select-none leading-none transition-all duration-300 mr-12 sm:mr-20"
                style={{
                  fontFamily: "'Varien', sans-serif",
                  fontWeight: 900,
                  letterSpacing: "0.01em",
                  color: isDark ? "#ffffff" : "#0f172a",
                  textShadow: isDark ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Layer 2: Authentic Transparent Portrait of Taher (Centered Foreground Focus) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-[360px] sm:w-[520px] md:w-[660px] lg:w-[780px] xl:w-[860px] h-[520px] sm:h-[660px] md:h-[780px] lg:h-[880px] xl:h-[940px] max-h-[86vh] pointer-events-none select-none flex items-end justify-center">
        <div className="relative w-full h-full">
          <Image
            src="/images/taher-latest.png"
            alt="Taher Daeng Matora"
            fill
            priority
            unoptimized
            sizes="(max-width: 640px) 360px, (max-width: 768px) 520px, (max-width: 1024px) 660px, 860px"
            className="object-contain object-bottom filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
          />
        </div>
      </div>

      {/* Layer 3: Bottom Right Music Player with ElasticSlider */}
      <div className="absolute bottom-6 sm:bottom-10 right-4 sm:right-8 md:right-16 z-30 pointer-events-auto">
        <HeroMusicPlayer />
      </div>

      {/* Layer 4: Vertical "SCROLL DOWN" Indicator on Far Right Edge */}
      <div
        className="hidden xl:flex flex-col items-center gap-3 absolute right-5 sm:right-6 bottom-10 z-20 pointer-events-none select-none opacity-60 hover:opacity-100 transition-opacity"
        aria-hidden="true"
      >
        <div className="w-[1px] h-12 bg-slate-400 dark:bg-white/30" />
        <span className="text-[9px] tracking-[0.3em] uppercase font-mono text-slate-500 dark:text-slate-400 [writing-mode:vertical-lr]">
          SCROLL DOWN
        </span>
      </div>
    </section>
  );
}
