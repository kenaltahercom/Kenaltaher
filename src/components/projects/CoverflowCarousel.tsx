"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { ChevronLeft, ChevronRight, ArrowUpRight, BookOpen, Layers } from "lucide-react";

interface CoverflowCarouselProps {
  projects: Project[];
}

export default function CoverflowCarousel({ projects }: CoverflowCarouselProps) {
  const { t } = useLanguageTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = projects.length;

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay every 4 seconds (PRD 2.4)
  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    timerRef.current = setInterval(() => {
      goToNext();
    }, 4000);
  }, [goToNext]);

  // Initialize and reset autoplay timer on activeIndex change
  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex, startAutoplay]);

  // Manual navigation that resets autoplay interval cleanly
  const handleManualNext = useCallback(() => {
    goToNext();
  }, [goToNext]);

  const handleManualPrev = useCallback(() => {
    goToPrev();
  }, [goToPrev]);

  const handleSelectProject = (index: number) => {
    setActiveIndex(index);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }
      if (e.key === "ArrowRight") {
        handleManualNext();
      } else if (e.key === "ArrowLeft") {
        handleManualPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleManualNext, handleManualPrev]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleManualNext();
    } else if (diff < -50) {
      handleManualPrev();
    }
    touchStartX.current = null;
  };

  const activeProject = projects[activeIndex];

  return (
    <div
      className="w-full flex flex-col items-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Showcase Proyek Unggulan Carousel"
    >
      {/* 3D Gallery Stage (Work Gallery Style: Center Active, Left & Right Side Cards in Background) */}
      <div className="relative w-full h-[280px] sm:h-[390px] md:h-[450px] flex items-center justify-center overflow-hidden coverflow-container py-4">
        {projects.map((project, index) => {
          let offset = index - activeIndex;
          if (offset < -1) offset += total;
          if (offset > 1) offset -= total;

          const isActive = index === activeIndex;
          const isLeft = offset === -1 || (activeIndex === 0 && index === total - 1 && total > 2);
          const isRight = offset === 1 || (activeIndex === total - 1 && index === 0 && total > 2);

          let transformStyle = "scale(0.65) translateZ(-250px) opacity(0)";
          let zIndex = 0;
          let opacity = 0;
          let pointerEvents = "none";

          if (isActive) {
            transformStyle = "translateX(0) scale(1) translateZ(0) rotateY(0deg)";
            zIndex = 25;
            opacity = 1;
            pointerEvents = "auto";
          } else if (isLeft) {
            transformStyle = "translateX(-62%) scale(0.82) translateZ(-120px) rotateY(16deg)";
            zIndex = 10;
            opacity = 0.45;
            pointerEvents = "auto";
          } else if (isRight) {
            transformStyle = "translateX(62%) scale(0.82) translateZ(-120px) rotateY(-16deg)";
            zIndex = 10;
            opacity = 0.45;
            pointerEvents = "auto";
          }

          return (
            <div
              key={project.slug}
              onClick={() => handleSelectProject(index)}
              style={{
                transform: transformStyle,
                zIndex,
                opacity,
                pointerEvents: pointerEvents as "auto" | "none",
              }}
              className={`absolute w-[84%] sm:w-[580px] md:w-[660px] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-out cursor-pointer group border ${
                isActive
                  ? "border-indigo-500/50 shadow-indigo-500/20"
                  : "border-slate-300/30 dark:border-white/10"
              } bg-slate-900`}
            >
              {/* Reliable Image Container with unoptimized flag */}
              <div className="relative w-full h-full bg-slate-900">
                <Image
                  src={project.image}
                  alt={`Tangkapan layar ${project.title}`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 660px"
                  className="object-cover transition-transform duration-700 group-hover:scale-102"
                  priority={isActive}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Badge Category & Year on Card */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/70 backdrop-blur-md text-indigo-300 border border-indigo-500/30">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-black/70 backdrop-blur-md text-slate-300 border border-white/10">
                    {project.year}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Control Buttons */}
        <button
          type="button"
          onClick={handleManualPrev}
          aria-label="Proyek Sebelumnya"
          className="absolute left-2 sm:left-6 z-40 p-3 rounded-full glass-panel hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/15 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xl"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleManualNext}
          aria-label="Proyek Selanjutnya"
          className="absolute right-2 sm:right-6 z-40 p-3 rounded-full glass-panel hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/15 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xl"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators / Dots */}
      <div className="flex items-center gap-2.5 mt-4 mb-8" role="tablist" aria-label="Slide Indicator Carousel">
        {projects.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Buka slide proyek ke-${i + 1}`}
            onClick={() => handleSelectProject(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-8 bg-indigo-600 shadow-sm shadow-indigo-600/50"
                : "w-2.5 bg-slate-400 dark:bg-slate-700 hover:bg-indigo-400"
            }`}
          />
        ))}
      </div>

      {/* Synchronized Project Information Panel (Always in sync with activeIndex) */}
      {activeProject && (
        <div className="w-full max-w-4xl glass-panel rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-2xl transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-500 dark:text-indigo-400 mb-1.5 uppercase tracking-wider font-semibold">
                <Layers className="w-3.5 h-3.5" />
                <span>{activeProject.category} • {activeProject.role}</span>
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

          <p className="text-slate-700 dark:text-slate-300 font-medium text-sm sm:text-base leading-relaxed pt-5 pb-6">
            {activeProject.summary}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mr-2">Teknologi:</span>
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

      {/* Button to Archive (PRD 2.5: Pertahankan tombol 'Lihat Seluruh Karya' ke /work) */}
      <div className="mt-10 text-center">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-white/15 text-sm font-semibold transition-all duration-300 shadow-lg"
        >
          <span>{t("featured.viewAllArchive")} ({total}+ Proyek)</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
