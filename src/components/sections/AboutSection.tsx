"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { User, FileText, ArrowUpRight } from "lucide-react";
import { VerifiedBadge } from "@/components/ui/Icons";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AboutSection() {
  const { t } = useLanguageTheme();
  const [activeTrait, setActiveTrait] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const traits = [
    {
      id: "01",
      title: t("about.traitCreative"),
      desc: t("about.traitCreativeDesc"),
      accent: "text-indigo-600 dark:text-indigo-400",
      accentBg: "bg-indigo-500/10",
      accentBorder: "border-indigo-500/30",
    },
    {
      id: "02",
      title: t("about.traitAdaptable"),
      desc: t("about.traitAdaptableDesc"),
      accent: "text-sky-600 dark:text-sky-400",
      accentBg: "bg-sky-500/10",
      accentBorder: "border-sky-500/30",
    },
    {
      id: "03",
      title: t("about.traitProblemSolver"),
      desc: t("about.traitProblemSolverDesc"),
      accent: "text-emerald-600 dark:text-emerald-400",
      accentBg: "bg-emerald-500/10",
      accentBorder: "border-emerald-500/30",
    },
  ];

  // Auto-switch Personal Traits cards every 2 seconds
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveTrait((prev) => (prev + 1) % traits.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [isPaused, traits.length]);

  return (
    <section
      id="about"
      aria-label="Tentang Saya"
      className="relative z-10 py-20 sm:py-28 overflow-hidden border-b border-slate-200 dark:border-white/5 transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* 1 & 2. Label ABOUT ME + Big Headline */}
        <ScrollReveal direction="up" delay={50}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
            <User className="w-3.5 h-3.5" />
            <span>{t("about.tag")}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase mb-12 sm:mb-16">
            Problem Solver. <span className="text-outline">Digital Generalist.</span>
          </h2>
        </ScrollReveal>

        {/* Upper Profile Container: Circular Photo + Name + Blue Checkmark + 3 Info Groups + Bio + Resume */}
        <ScrollReveal direction="up" delay={120}>
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-300/80 dark:border-white/10 shadow-2xl mb-12 bg-white/70 dark:bg-[#111116]/80">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
              {/* 3. Circular Authentic Profile Photo of Taher */}
              <div className="relative shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-indigo-500/40 shadow-xl bg-slate-900">
                <Image
                  src="/images/taher-latest.png"
                  alt="Foto Profil Asli Taher Daeng Matora"
                  fill
                  unoptimized
                  className="object-cover object-top filter contrast-105"
                />
              </div>

              {/* Right Side: Name, Verified Badge, 3 Metadata Items, Bio & Resume */}
              <div className="flex-1 space-y-4">
                {/* 4 & 5. Name + Blue Checkmark */}
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-wide uppercase font-sans">
                    TAHER DAENG MATORA
                  </h3>
                  <VerifiedBadge className="w-6 h-6 shrink-0" />
                </div>

                {/* 6. Three concise info items */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 pb-3 border-y border-slate-200 dark:border-white/10">
                  <div>
                    <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider block mb-0.5">
                      {t("about.projectsLabel")}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                      {t("about.projectsVal")}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider block mb-0.5">
                      {t("about.eduLabel")}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                      {t("about.eduVal")}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider block mb-0.5">
                      {t("about.focusLabel")}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                      {t("about.focusVal")}
                    </span>
                  </div>
                </div>

                {/* 7. Professional Bio */}
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed pt-1 font-medium">
                  {t("about.bio")}
                </p>

                {/* 8. Download Resume Link */}
                <div className="pt-2">
                  {siteConfig.resumeAvailable && siteConfig.resumePath ? (
                    <a
                      href={siteConfig.resumePath}
                      download
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-xs sm:text-sm hover:opacity-90 transition-all shadow-md"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{t("about.downloadResume")}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <span>{t("about.requestResume")}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Lower Block: CURRENTLY (Bottom Left) + TRAIT Cards Stacked Auto-Switching (Bottom Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 9. CURRENTLY Section on Bottom Left */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={160}>
              <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-300/80 dark:border-white/10 shadow-xl bg-white/70 dark:bg-[#111116]/80">
                <div className="flex items-center gap-2 mb-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <h4 className="text-xs font-mono font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase">
                    {t("about.currentlyTitle")}
                  </h4>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/5 transition-colors">
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase block mb-1">
                      • {t("about.currentlyBuildingLabel")}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {t("about.currentlyBuildingDesc")}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/5 transition-colors">
                    <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase block mb-1">
                      • {t("about.currentlyExploringLabel")}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {t("about.currentlyExploringDesc")}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/5 transition-colors">
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase block mb-1">
                      • {t("about.currentlyLearningLabel")}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {t("about.currentlyLearningDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 10. TRAIT Cards Stacked and Auto-Switching every 2s on Bottom Right */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up" delay={200}>
              <div
                className="flex flex-col items-center justify-center py-4"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
              >
                <div className="flex items-center justify-between w-full max-w-sm mb-4 px-2">
                  <span className="text-xs font-mono text-slate-700 dark:text-slate-300 uppercase tracking-widest font-bold">
                    {t("about.traitsTitle")}
                  </span>
                  <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded-full">
                    Auto-switch (2s)
                  </span>
                </div>

                {/* Stacked Cards Fan Container with 3 Rotating Cards */}
                <div className="relative w-full max-w-sm h-64 sm:h-72 flex items-center justify-center">
                  {traits.map((trait, index) => {
                    const offset = (index - activeTrait + traits.length) % traits.length;
                    const isFront = offset === 0;
                    const isMiddle = offset === 1;

                    let cardTransform = "translate3d(0, 18px, 0) rotate(0deg) scale(1)";
                    let zIndex = 30;
                    let opacity = "opacity-100";
                    let cardBg = "bg-white dark:bg-[#1e1e28] border-indigo-500/50 shadow-2xl";

                    if (isMiddle) {
                      cardTransform = "translate3d(8px, 4px, 0) rotate(3deg) scale(0.96)";
                      zIndex = 20;
                      opacity = "opacity-90";
                      cardBg = "bg-slate-100 dark:bg-[#161620] border-slate-300 dark:border-white/10 shadow-lg";
                    } else if (!isFront) {
                      cardTransform = "translate3d(-10px, -12px, 0) rotate(-6deg) scale(0.92)";
                      zIndex = 10;
                      opacity = "opacity-75";
                      cardBg = "bg-slate-200/90 dark:bg-[#111116] border-slate-300 dark:border-white/5 shadow-md";
                    }

                    return (
                      <div
                        key={trait.id}
                        onClick={() => setActiveTrait(index)}
                        style={{
                          transform: cardTransform,
                          zIndex,
                        }}
                        className={`absolute w-[94%] p-5 sm:p-6 rounded-2xl glass-panel transition-all duration-500 ease-out cursor-pointer select-none ${opacity} ${cardBg}`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${trait.accent}`}>
                            {trait.id} • TRAIT
                          </span>
                          {isFront && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          )}
                        </div>
                        <h5 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 font-sans">
                          {trait.title}
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          {trait.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* 3 Interactive Dots for Visual Feedback */}
                <div className="flex items-center gap-2 mt-4" role="tablist" aria-label="Personal Traits Indicators">
                  {traits.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveTrait(i)}
                      aria-label={`Lihat trait ke-${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === activeTrait
                          ? "w-6 bg-indigo-600 shadow-sm"
                          : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
