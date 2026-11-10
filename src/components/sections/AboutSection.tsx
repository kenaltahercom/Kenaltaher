"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { FileText, ArrowUpRight, Code2, FlaskConical, Rocket } from "lucide-react";
import { VerifiedBadge } from "@/components/ui/Icons";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Stack from "@/components/ui/Stack";
import SectionHeading from "@/components/ui/SectionHeading";
import TextType from "@/components/ui/TextType";

export default function AboutSection() {
  const { t, lang } = useLanguageTheme();

  const traits = [
    { title: "Detail-Oriented" },
    { title: "Creative" },
    { title: "Adaptable" },
    { title: "Problem Solver" },
  ];

  const currentlyItems = [
    {
      icon: <Code2 className="w-4 h-4" />,
      label: "Building",
      desc: lang === "en" ? "Web & digital projects" : "Proyek web & digital",
    },
    {
      icon: <FlaskConical className="w-4 h-4" />,
      label: "Exploring",
      desc: lang === "en" ? "Software testing & QA" : "Software testing & QA",
    },
    {
      icon: <Rocket className="w-4 h-4" />,
      label: "Learning",
      desc: lang === "en" ? "Full-stack development" : "Pengembangan full-stack",
    },
  ];

  return (
    <section
      id="about"
      aria-label="Tentang Saya"
      className="relative z-10 py-24 sm:py-32 overflow-hidden transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Headline ── */}
        <ScrollReveal direction="up" delay={40}>
          <SectionHeading
            sentence={t("about.headline")}
            className="mb-10 max-w-3xl"
            blurAmount={3}
            pauseBetweenAnimations={2}
          />
        </ScrollReveal>

        {/* ── Profile row: Photo + Name + Stats ── */}
        <ScrollReveal direction="up" delay={80}>
          <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-8">
            {/* Circular portrait */}
            <div className="relative shrink-0 group">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-slate-300/80 dark:border-white/20 shadow-xl bg-slate-900">
                <Image
                  src="/images/taher-latest.png"
                  alt="Foto Profil Taher Daeng Matora"
                  fill
                  unoptimized
                  className="object-cover object-top filter contrast-105 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Name + inline stats */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-wide uppercase font-sans leading-tight">
                  TAHER DAENG MATORA
                </h3>
                <VerifiedBadge className="w-5 h-5 shrink-0" />
              </div>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                Creative Developer &amp; UI Specialist
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-0.5">
                    01 / {t("about.projectsLabel")}
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {t("about.projectsVal")}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-0.5">
                    02 / {t("about.eduLabel")}
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {t("about.eduVal")}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-0.5">
                    03 / {t("about.focusLabel")}
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {t("about.focusVal")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Bio paragraph ── */}
        <ScrollReveal direction="up" delay={120}>
          <p className="max-w-2xl text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-5">
            <TextType
              as="span"
              text={[t("about.bio")]}
              typingSpeed={18}
              deletingSpeed={8}
              pauseDuration={6000}
              deleteMode="backspace"
              typeEffect="fade"
              showCursor={true}
              cursorStyle="bar"
              cursorGlide={true}
              loop={false}
              startOnVisible={true}
            />
          </p>

          {/* Resume CTA inline text link */}
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-16 sm:mb-20">
            {lang === "id"
              ? "Ingin tahu lebih lanjut tentang pengalaman saya? "
              : "Want to know more about my experience? "}
            {siteConfig.resumeAvailable && siteConfig.resumePath ? (
              <a
                href={siteConfig.resumePath}
                download
                className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 text-slate-900 dark:text-white hover:opacity-70 transition-opacity"
              >
                {t("about.downloadResume")}
                <ArrowUpRight className="w-3 h-3" />
              </a>
            ) : (
              <Link
                href="/#contact"
                className="font-semibold underline underline-offset-2 text-slate-900 dark:text-white hover:opacity-70 transition-opacity"
              >
                {t("about.requestResume")}
              </Link>
            )}
          </p>
        </ScrollReveal>

        {/* ── CURRENTLY + TRAIT ── */}
        <div className="pt-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">

          {/* CURRENTLY */}
          <ScrollReveal direction="up" delay={160}>
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold block mb-4">
                CURRENTLY
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                {currentlyItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white/[0.08] border border-slate-700/60 dark:border-white/10 flex items-center justify-center shrink-0 text-slate-300 dark:text-slate-200 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block leading-tight mb-0.5">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug block">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Compact TRAIT card with interactive 3D Stack */}
          <ScrollReveal direction="up" delay={200}>
            <div className="shrink-0 self-center lg:self-auto">
              <div className="w-[220px] sm:w-[230px] h-[145px] sm:h-[155px]">
                <Stack
                  cards={traits.map((trait, i) => (
                    <div
                      key={i}
                      className="w-full h-full p-4 sm:p-5 flex flex-col justify-between bg-slate-900/95 dark:bg-[#121216] border border-slate-700/80 dark:border-white/10 text-white rounded-2xl shadow-xl select-none"
                    >
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        TRAIT
                      </span>
                      <div>
                        <h4 className="text-lg sm:text-xl font-black text-white leading-tight font-sans">
                          {trait.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                  layout="fan"
                  sendToBackOnClick={true}
                  autoplay={true}
                  autoplayDelay={1000}
                  pauseOnHover={true}
                  radius={16}
                  shadow={true}
                  spread={0.5}
                  depth={0.4}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
