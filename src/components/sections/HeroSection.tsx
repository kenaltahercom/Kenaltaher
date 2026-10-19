"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import HeroShoulderMascot from "@/components/mascot/HeroShoulderMascot";
import HeroMascot from "@/components/mascot/HeroMascot";
import MusicPlayer from "@/components/ui/MusicPlayer";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { ArrowDown, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import Lightfall from "@/components/Lightfall";

export default function HeroSection() {
  const { theme, t } = useLanguageTheme();
  const isDark = theme === "dark";

  const marqueeNames = [
    "TAHER DAENG MATORA",
    "KENALTAHER",
    "TAHER DAENG MATORA",
    "WEB DEVELOPER",
  ];

  return (
    <section
      aria-label="Hero Taher Daeng Matora"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-0 overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Atmospheric Lightfall WebGL Background Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <Lightfall
          colors={isDark ? ["#ffffff"] : ["#475569", "#64748b"]}
          backgroundColor={isDark ? "#94a3b8" : "#F7F8FB"}
          speed={0.3}
          streakCount={5}
          streakWidth={0.3}
          twinkle={0}
          backgroundGlow={isDark ? 0.1 : 0}
          headGlow={isDark ? 0.15 : 0.1}
          bloom={isDark ? 0.35 : 0.2}
          mouseInteraction={false}
          holdToWarp={true}
          intro={true}
          streakLength={1}
          density={0.6}
          glow={isDark ? 1 : 0.8}
          depth={0.5}
          zoom={1}
          mouseStrength={0.35}
          mouseRadius={0.45}
          lens={0}
          fade={0}
          lightMode={!isDark}
          opacity={isDark ? 0.85 : 0.65}
          className="w-full h-full"
        />
      </div>

      {/* Layer 0: Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[350px] sm:h-[450px] bg-indigo-600/10 dark:bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -z-20" />
      <div className="absolute top-1/3 left-1/5 w-[350px] h-[250px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none -z-20" />

      {/* Layer 1: Giant Continuous Outline Marquee Running BEHIND the Photo (Slow 55s cycle) */}
      <div
        className="absolute top-[28%] sm:top-[26%] md:top-[22%] left-0 right-0 w-full overflow-hidden select-none pointer-events-none z-10 opacity-75 sm:opacity-85"
        aria-hidden="true"
      >
        <div className="animate-marquee flex items-center gap-12 sm:gap-20 py-4">
          {[...marqueeNames, ...marqueeNames, ...marqueeNames, ...marqueeNames].map((name, idx) => (
            <div key={idx} className="flex items-center gap-12 sm:gap-20 whitespace-nowrap">
              <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[145px] font-black tracking-tight uppercase text-outline-strong font-sans">
                {name}
              </span>
              <span className="text-indigo-500/40 dark:text-indigo-400/40 text-3xl sm:text-5xl">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Container Content for Top Header & Floating Elements */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-between relative z-30 pb-6 pointer-events-none">
        {/* Top Header Information: Music Player (Left below Navbar) + Availability Badge (Right) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 sm:pt-4 pointer-events-auto">
          {/* Mini Music Player (Sempurna) */}
          <div className="glass-panel px-3.5 py-2 rounded-2xl border border-slate-300 dark:border-white/10 shadow-lg backdrop-blur-md w-full sm:w-auto min-w-[260px] sm:min-w-[280px]">
            <MusicPlayer />
          </div>

          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-slate-300 dark:border-white/10 text-xs font-mono text-slate-800 dark:text-slate-200 shadow-sm shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{t("hero.badge")}</span>
          </div>
        </div>

        {/* Desktop / Tablet Floating Side Panels Framing the Center Photo */}
        <div className="relative w-full flex-1 flex items-end justify-between pointer-events-none mt-auto">
          {/* Left Side Floating Editorial Card */}
          <div className="hidden md:block pointer-events-auto max-w-xs glass-panel p-5 rounded-2xl border border-slate-300 dark:border-white/10 shadow-2xl backdrop-blur-md mb-8">
            <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1 font-bold">
              TAHER DAENG MATORA
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 leading-snug">
              Web Developer &amp; UI Specialist
            </h2>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-4">
              {t("hero.subheadline")}
            </p>
            <div className="flex items-center gap-2.5">
              <Link
                href="/#work"
                className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-xs hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md"
              >
                <span>{t("hero.ctaWork")}</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/#contact"
                className="px-4 py-2 rounded-xl glass-panel hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white font-semibold text-xs transition-all flex items-center gap-1.5 border border-slate-300 dark:border-white/15"
              >
                <span>{t("hero.ctaHire")}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Side Floating Badges */}
          <div className="hidden md:flex flex-col gap-3 pointer-events-auto mb-8">
            <div className="glass-panel px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-mono text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-xl backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Clean Next.js &amp; TypeScript</span>
            </div>
            <div className="glass-panel px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-mono text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-xl backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Fullstack Responsive Design</span>
            </div>
            <div className="glass-panel px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-mono text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-xl backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>{t("hero.experienceYears")}</span>
            </div>
          </div>
        </div>

        {/* Mobile Call To Actions (Visible on Small Screens) */}
        <div className="md:hidden pointer-events-auto w-full pt-4 pb-4 flex flex-col items-center gap-3 text-center">
          <p className="text-xs text-slate-700 dark:text-slate-300 font-medium max-w-xs glass-panel px-3 py-1.5 rounded-xl border border-slate-300 dark:border-white/10">
            {t("hero.subheadline")}
          </p>
          <div className="flex items-center justify-center gap-2.5">
            <Link
              href="/#work"
              className="px-4 py-2 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-xs hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md"
            >
              <span>{t("hero.ctaWork")}</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/#contact"
              className="px-4 py-2 rounded-full glass-panel hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white font-semibold text-xs transition-all flex items-center gap-1.5 border border-slate-300 dark:border-white/15"
            >
              <span>{t("hero.ctaHire")}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Layer 2: Hero Mascot Keno on the Left Side */}
      <HeroMascot />

      {/* Layer 3: Authentic Transparent Photo of Taher (Dominant Half-Body Anchored Directly to Bottom-0 of Hero Section) */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-[310px] sm:w-[440px] md:w-[540px] lg:w-[620px] xl:w-[680px] h-[380px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[760px] pointer-events-none select-none flex items-end justify-center"
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/taher-latest.png"
            alt="Foto Asli Taher Daeng Matora Tanpa Background"
            fill
            priority
            unoptimized
            sizes="(max-width: 640px) 310px, (max-width: 768px) 440px, (max-width: 1024px) 540px, 680px"
            className="object-contain object-bottom filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
          />
          {/* Mascot Keno seated on Taher's shoulder typing on laptop */}
          <HeroShoulderMascot />
        </div>
      </div>
    </section>
  );
}
