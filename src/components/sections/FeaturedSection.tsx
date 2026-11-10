"use client";

import React, { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { Project } from "@/types";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import StarBorder from "@/components/ui/StarBorder";
import SectionHeading from "@/components/ui/SectionHeading";
import TextType from "@/components/ui/TextType";

// Dynamic import with SSR disabled for WebGL/Canvas rendering
const FlexCarousel = dynamic(() => import("@/components/ui/FlexCarousel"), {
  ssr: false,
});

interface FeaturedSectionProps {
  projects: Project[];
}

export default function FeaturedSection({ projects }: FeaturedSectionProps) {
  const { lang, theme } = useLanguageTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  // Map project data to FlexCarousel item format
  const carouselItems = useMemo(() => {
    return projects.map((project) => ({
      src: project.image,
      alt: `Tangkapan layar ${project.title}`,
      title: project.title,
      subtitle: project.category,
      slug: project.slug,
      summary: project.summary,
    }));
  }, [projects]);

  const handleChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const activeProject = projects[activeIndex % projects.length] || projects[0];

  return (
    <section
      id="work"
      aria-label="Work Gallery"
      className="relative z-10 py-20 sm:py-28 overflow-hidden transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header: Work Gallery + View More Projects Button */}
        <ScrollReveal direction="up" delay={40}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
            <div className="space-y-2">
              <SectionHeading
                sentence={lang === "en" ? "Work Gallery" : "Galeri Karya"}
                blurAmount={3}
                pauseBetweenAnimations={2}
              />
              <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-normal max-w-xl">
                <TextType
                  as="span"
                  text={[
                    lang === "en"
                      ? "A collection of systems, digital projects, and technical work I've built."
                      : "Koleksi sistem, proyek digital, dan karya teknis yang telah saya bangun."
                  ]}
                  typingSpeed={25}
                  pauseDuration={3000}
                  deletingSpeed={15}
                  showCursor={true}
                  cursorStyle="bar"
                  cursorGlide={true}
                  loop={false}
                  startOnVisible={true}
                />
              </p>
            </div>

            <StarBorder
              as={Link}
              href="/work"
              theme={theme === "light" ? "light" : "dark"}
              color={theme === "light" ? "#18181b" : "#ffffff"}
              duration={3.5}
              thickness={1}
              radius={9999}
              glow={0.5}
              className="self-start sm:self-auto !px-5 !py-2.5 !text-xs sm:!text-sm font-semibold tracking-wide"
            >
              <span>{lang === "en" ? "View More Projects" : "Lihat Semua Proyek"}</span>
              <ArrowUpRight className="w-4 h-4 ml-1 inline-block" />
            </StarBorder>
          </div>
        </ScrollReveal>

        {/* FlexCarousel Showcase */}
        <ScrollReveal direction="up" delay={80}>
          <div className="w-full flex flex-col items-center select-none">
            {/* Liquid / Arch WebGL FlexCarousel Container */}
            <div className="relative w-full h-[460px] sm:h-[520px] md:h-[560px] rounded-2xl overflow-hidden">
              <FlexCarousel
                items={carouselItems}
                preset="arch"
                intro="rise"
                cardHeight={0.5}
                gap={16}
                radius={16}
                squeeze={0.2}
                focusOnClick={true}
                captions={true}
                lensWidth={0.8}
                lensHeight={0.8}
                tilt={0}
                bend={0.3}
                reach={0.36}
                curl="rise"
                dispersion={0.4}
                onChange={handleChange}
              />
            </div>

            {/* Synchronized Project Information Panel */}
            {activeProject && (
              <div
                id={`project-panel-${activeProject.slug}`}
                key={activeProject.slug}
                className="w-full max-w-2xl flex flex-col items-center text-center px-4 pt-6 sm:pt-8 transition-all duration-300"
              >
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                  {activeProject.summary}
                </p>

                <div className="mt-4">
                  <Link
                    href={`/work/${activeProject.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300 transition-colors group"
                  >
                    <span>{lang === "en" ? "View Project Details" : "Lihat Detail Proyek"}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
