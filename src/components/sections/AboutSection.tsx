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
    }, 4000);

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

          <h2 className="section-headline-gallery mb-12 sm:mb-16">
            {t("about.headline")}
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
                <p className="section-desc-gallery pt-1">
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

        {/* Lower Block: CURRENTLY (Bottom Left) + PERSONAL TRAITS (Bottom Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 9. CURRENTLY Section (Requirement 9: Editorial, Structured, and Concise) */}
          <div className="lg:col-span-7 flex flex-col">
            <ScrollReveal direction="up" delay={160} className="h-full">
              <div className="h-full glass-panel rounded-3xl p-6 sm:p-8 border border-slate-300/80 dark:border-white/10 shadow-xl bg-white/70 dark:bg-[#111116]/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6 pb-3 border-b border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-slate-800 dark:text-slate-200 uppercase">
                        {t("about.currentlyTitle")}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                      Live Status
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {/* Item 1: Building */}
                    <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/5 hover:border-indigo-500/30 transition-all duration-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                          • {t("about.currentlyBuildingLabel")}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Active</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {t("about.currentlyBuildingDesc")}
                      </p>
                    </div>

                    {/* Item 2: Exploring */}
                    <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/5 hover:border-sky-500/30 transition-all duration-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wide">
                          • {t("about.currentlyExploringLabel")}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">R&amp;D</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {t("about.currentlyExploringDesc")}
                      </p>
                    </div>

                    {/* Item 3: Learning */}
                    <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                          • {t("about.currentlyLearningLabel")}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Continuous</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {t("about.currentlyLearningDesc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 10. PERSONAL TRAITS (Requirement 10: Premium card without 'Auto-switch (2s)' label) */}
          <div className="lg:col-span-5 flex flex-col">
            <ScrollReveal direction="up" delay={200} className="h-full">
              <div
                className="h-full glass-panel rounded-3xl p-6 sm:p-8 border border-slate-300/80 dark:border-white/10 shadow-xl bg-white/70 dark:bg-[#111116]/80 flex flex-col justify-between"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-white/10">
                    <span className="text-xs font-mono text-slate-800 dark:text-slate-200 uppercase tracking-widest font-bold">
                      {t("about.traitsTitle")}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                      {String(activeTrait + 1).padStart(2, "0")} / {String(traits.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Smooth Transition Card */}
                  <div className="relative min-h-[170px] sm:min-h-[190px] flex items-center justify-center">
                    {traits.map((trait, index) => {
                      const isActive = index === activeTrait;

                      return (
                        <div
                          key={trait.id}
                          className={`absolute inset-0 p-5 sm:p-6 rounded-2xl glass-panel border transition-all duration-700 ease-out flex flex-col justify-between ${
                            isActive
                              ? "opacity-100 translate-y-0 scale-100 z-20 pointer-events-auto bg-white/95 dark:bg-[#181822] border-indigo-500/40 shadow-xl"
                              : "opacity-0 translate-y-3 scale-95 z-0 pointer-events-none border-transparent"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${trait.accent}`}>
                                {t("about.traitProfessional")} #{trait.id}
                              </span>
                              <span className="w-2 h-2 rounded-full bg-indigo-500" />
                            </div>
                            <h5 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2.5 font-sans leading-tight">
                              {trait.title}
                            </h5>
                            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                              {trait.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Interactive Dots for Visual Feedback & Direct Selection */}
                <div className="flex items-center justify-between pt-6 mt-4 border-t border-slate-200 dark:border-white/10">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {t("about.selectTrait")}
                  </span>
                  <div className="flex items-center gap-2" role="tablist" aria-label="Personal Traits Indicators">
                    {traits.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveTrait(i)}
                        aria-label={`${t("about.viewTrait")}${i + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          i === activeTrait
                            ? "w-7 bg-indigo-600 shadow-xs"
                            : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
