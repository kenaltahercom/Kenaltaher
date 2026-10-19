"use client";

import React from "react";
import DepthCarouselShowcase from "@/components/projects/DepthCarouselShowcase";
import { Project } from "@/types";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface FeaturedSectionProps {
  projects: Project[];
}

export default function FeaturedSection({ projects }: FeaturedSectionProps) {
  const { t } = useLanguageTheme();
  const featured = projects.filter((p) => p.featured);

  return (
    <section
      id="work"
      aria-label="Showcase Proyek Unggulan"
      className="relative z-10 py-20 sm:py-28 overflow-hidden border-t border-b border-slate-200 dark:border-white/5 transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-500 dark:text-indigo-400 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("featured.tag")}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              {t("featured.title")} <span className="text-outline">{t("featured.titleOutline")}</span>
            </h2>

            <p className="max-w-xl text-slate-700 dark:text-slate-300 font-medium text-sm sm:text-base mt-4">
              {t("featured.desc")}
            </p>
          </div>
        </ScrollReveal>

        {/* 3D Depth Carousel Showcase */}
        <ScrollReveal direction="up" delay={150}>
          <DepthCarouselShowcase projects={featured.length > 0 ? featured : projects} />
        </ScrollReveal>
      </div>
    </section>
  );
}
