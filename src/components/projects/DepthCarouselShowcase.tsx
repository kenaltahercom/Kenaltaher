"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { Project } from "@/types";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import DepthCarousel, { DepthCarouselItem } from "@/components/ui/DepthCarousel";
import { Layers, BookOpen, ArrowUpRight, FolderKanban } from "lucide-react";

interface DepthCarouselShowcaseProps {
  projects: Project[];
}

export default function DepthCarouselShowcase({ projects }: DepthCarouselShowcaseProps) {
  const { lang, theme, t } = useLanguageTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  // Dynamic card dimensions for optimal responsiveness
  const [cardDims, setCardDims] = useState({
    width: 500,
    height: 320,
    depth: 180,
    spread: 110,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCardDims({ width: 290, height: 195, depth: 110, spread: 65 });
      } else if (w < 640) {
        setCardDims({ width: 360, height: 235, depth: 130, spread: 80 });
      } else if (w < 1024) {
        setCardDims({ width: 440, height: 280, depth: 150, spread: 95 });
      } else {
        setCardDims({ width: 520, height: 330, depth: 180, spread: 115 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Map authentic project data
  const carouselItems: DepthCarouselItem[] = useMemo(() => {
    return projects.map((project) => ({
      image: project.image,
      alt: `Tangkapan layar ${project.title}`,
      title: project.title,
      category: project.category,
      year: project.year,
      slug: project.slug,
    }));
  }, [projects]);

  // Synchronize active project when carousel moves, animates or snaps
  const handleChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const activeProject = projects[activeIndex % projects.length] || projects[0];
  const total = projects.length;

  return (
    <div
      className="w-full flex flex-col items-center select-none"
      role="region"
      aria-label="3D Depth Project Carousel Showcase"
    >
      {/* 3D Depth Carousel Stage */}
      <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[520px] flex items-center justify-center overflow-hidden py-4">
        <DepthCarousel
          items={carouselItems}
          cardWidth={cardDims.width}
          cardHeight={cardDims.height}
          depth={cardDims.depth}
          spread={cardDims.spread}
          tilt={18}
          tiltDirection="right"
          perspective={1400}
          visibleCards={3}
          falloff={0.22}
          blur={5}
          duration={650}
          loop={true}
          showControls={true}
          showIndicators={true}
          theme={theme === "light" ? "light" : "dark"}
          tint={theme === "light" ? "rgba(148, 163, 184, 0.35)" : "#05060a"}
          activeIndex={activeIndex}
          onChange={handleChange}
        />
      </div>

      {/* Synchronized Project Information Panel (Preserved layout, driven by activeProject) */}
      {activeProject && (
        <div
          id={`project-panel-${activeProject.slug}`}
          key={activeProject.slug}
          className="w-full max-w-4xl glass-panel rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-2xl mt-4 sm:mt-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
        >
          {/* Header Row: Category, Role, Title & CTA Action Buttons */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-500 dark:text-indigo-400 mb-1.5 uppercase tracking-wider font-semibold">
                <Layers className="w-3.5 h-3.5" />
                <span>
                  {activeProject.category} • {activeProject.role}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200/60 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/10">
                  {activeProject.year}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {activeProject.title}
              </h3>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href={`/work/${activeProject.slug}`}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-lg shadow-indigo-600/30"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t("featured.viewCaseStudy")}</span>
              </Link>

              {activeProject.projectUrl && activeProject.projectUrl !== "#" && (
                <a
                  href={activeProject.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl glass-panel hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-slate-800 dark:text-slate-200 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all border border-slate-300 dark:border-white/10"
                >
                  <span>{t("featured.liveDemo")}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Project Summary */}
          <p className="text-slate-700 dark:text-slate-300 font-medium text-sm sm:text-base leading-relaxed pt-5 pb-6">
            {activeProject.summary}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mr-2">
              {lang === "en" ? "Technologies:" : "Teknologi:"}
            </span>
            {activeProject.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Button to Archive */}
      <div className="mt-10 text-center">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-white/15 text-sm font-semibold transition-all duration-300 shadow-lg"
        >
          <FolderKanban className="w-4 h-4 text-indigo-500" />
          <span>
            {t("featured.viewAllArchive")} ({total}+ {lang === "en" ? "Projects" : "Proyek"})
          </span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
