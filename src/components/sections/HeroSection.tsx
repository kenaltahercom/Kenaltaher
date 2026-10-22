"use client";

import React from "react";
import Image from "next/image";
import MusicPlayer from "@/components/ui/MusicPlayer";
import PulseCoffee from "@/components/ui/PulseCoffee";
import LightTunnel from "@/components/ui/LightTunnel";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

export default function HeroSection() {
  const { theme } = useLanguageTheme();
  const isDark = theme === "dark";

  // Single text repeated: TAHER DAENG MATORA (Strictly as specified in Master Prompt)
  const marqueeNames = [
    "TAHER DAENG MATORA",
    "TAHER DAENG MATORA",
  ];

  return (
    <section
      aria-label="Hero Taher Daeng Matora"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-0 overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Layer 0: Static Ambient Background Glows as Fallback */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[350px] sm:h-[450px] bg-indigo-600/10 dark:bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -z-20" />
      <div className="absolute top-1/3 left-1/5 w-[350px] h-[250px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none -z-20" />

      {/* Layer 0.5: WebGL2 LightTunnel Background (Exclusively inside Hero Section, clipped by overflow-hidden) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
        <LightTunnel
          cableColor={isDark ? "#818cf8" : "#6366f1"}
          pulseColor={isDark ? "#ffffff" : "#4338ca"}
          tunnelColor={isDark ? "#312e81" : "#c7d2fe"}
          tunnelOpacity={isDark ? 0.14 : 0.08}
          speed={0.08}
          flowDirection="inward"
          pulseSpeed={1.8}
          pulseLength={0.25}
          pulseDensity={0.4}
          cableCount={48}
          thickness={0.3}
          glow={isDark ? 0.8 : 0.45}
          brightness={isDark ? 1.0 : 0.85}
          fadeNear={0.45}
          fadeFar={2.2}
          opacity={isDark ? 0.85 : 0.65}
          mouseInteraction={true}
          mouseStrength={0.08}
          clickSurge={true}
          intro={true}
          lightMode={!isDark}
          className="w-full h-full"
        />
      </div>

      {/* Layer 1: Giant Continuous Marquee Running BEHIND the Photo (Thin Outline, Only "TAHER DAENG MATORA") */}
      <div
        className="absolute top-[28%] sm:top-[24%] md:top-[18%] left-0 right-0 w-full overflow-hidden select-none pointer-events-none z-10"
        aria-hidden="true"
      >
        <div className="animate-marquee flex items-center gap-12 sm:gap-20 py-4 will-change-transform">
          {[...marqueeNames, ...marqueeNames, ...marqueeNames, ...marqueeNames].map((name, idx) => (
            <div key={idx} className="flex items-center gap-12 sm:gap-20 whitespace-nowrap">
              <span
                className="text-[clamp(5.5rem,19vw,22rem)] font-black tracking-tight uppercase font-sans select-none leading-none transition-all duration-300"
                style={{
                  WebkitTextStroke: isDark ? "1.5px rgba(255, 255, 255, 0.48)" : "1.5px rgba(15, 23, 42, 0.38)",
                  color: "transparent",
                  textShadow: isDark ? "0 0 24px rgba(255,255,255,0.05)" : "none",
                }}
              >
                {name}
              </span>
              <span className="text-indigo-500/60 dark:text-indigo-400/60 text-3xl sm:text-5xl select-none">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Layer 2: Clean Top Header Controls (Music Player on Left, PulseCoffee on Right) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-30 pb-6 pointer-events-none">
        <div className="flex items-center justify-between gap-4 pt-2 sm:pt-4 pointer-events-auto">
          {/* Mini Music Player (Top Left) */}
          <div className="glass-panel px-3.5 py-2 rounded-2xl border border-slate-300/80 dark:border-white/10 shadow-lg backdrop-blur-md w-auto min-w-[240px] sm:min-w-[280px]">
            <MusicPlayer />
          </div>

          {/* PulseCoffee Widget (Top Right, Starts at 800, Expandable on Hover) */}
          <div className="flex items-center gap-3">
            <PulseCoffee size="md" />
          </div>
        </div>
      </div>

      {/* Layer 3: Authentic Transparent Photo of Taher (Centered & Prominent Foreground Focus) */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-[380px] sm:w-[540px] md:w-[680px] lg:w-[800px] xl:w-[880px] h-[520px] sm:h-[650px] md:h-[780px] lg:h-[890px] xl:h-[960px] max-h-[88vh] pointer-events-none select-none flex items-end justify-center"
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/taher-latest.png"
            alt="Foto Asli Taher Daeng Matora"
            fill
            priority
            unoptimized
            sizes="(max-width: 640px) 380px, (max-width: 768px) 540px, (max-width: 1024px) 680px, 880px"
            className="object-contain object-bottom filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
          />
        </div>
      </div>
    </section>
  );
}
