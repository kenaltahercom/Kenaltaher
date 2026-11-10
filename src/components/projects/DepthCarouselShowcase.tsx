"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { Project } from "@/types";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import DepthCarousel, { DepthCarouselItem } from "@/components/ui/DepthCarousel";
import { ArrowRight } from "lucide-react";

interface DepthCarouselShowcaseProps {
  projects: Project[];
}

export default function DepthCarouselShowcase({ projects }: DepthCarouselShowcaseProps) {
  const { lang, theme } = useLanguageTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  // Dynamic card dimensions for optimal responsiveness
  const [cardDims, setCardDims] = useState({
    width: 520,
    height: 330,
    depth: 180,
    spread: 115,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCardDims({ width: 300, height: 200, depth: 110, spread: 65 });
      } else if (w < 640) {
        setCardDims({ width: 380, height: 245, depth: 130, spread: 80 });
      } else if (w < 1024) {
        setCardDims({ width: 450, height: 290, depth: 150, spread: 95 });
      } else {
        setCardDims({ width: 540, height: 340, depth: 180, spread: 115 });
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

  const handleChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const activeProject = projects[activeIndex % projects.length] || projects[0];

  return (
    <div
      className="w-full flex flex-col items-center select-none"
      role="region"
      aria-label="Work Gallery Showcase"
    >
      {/* 3D Depth Carousel Stage */}
      <div className="relative w-full h-[340px] sm:h-[400px] md:h-[460px] lg:h-[500px] flex items-center justify-center overflow-hidden py-2">
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
          showControls={false}
          showIndicators={true}
          theme={theme === "light" ? "light" : "dark"}
          tint={theme === "light" ? "rgba(148, 163, 184, 0.35)" : "#05060a"}
          activeIndex={activeIndex}
          onChange={handleChange}
        />
      </div>

      {/* Synchronized Project Information (Centered Editorial Style matching Richard Miculob reference) */}
      {activeProject && (
        <div
          id={`project-panel-${activeProject.slug}`}
          key={activeProject.slug}
          className="w-full max-w-3xl flex flex-col items-center text-center px-4 pt-6 sm:pt-8 transition-all duration-300"
        >
          {/* Centered Project Title */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
            {activeProject.title}
          </h3>

          {/* Centered Project Description */}
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm md:text-[15px] leading-relaxed mt-3 max-w-2xl font-normal">
            {activeProject.summary}
          </p>

          {/* Centered "View Project →" Link */}
          <div className="mt-4">
            <Link
              href={`/work/${activeProject.slug}`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
            >
              <span>{lang === "en" ? "View Project" : "Lihat Proyek"}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
