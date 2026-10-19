"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Project } from "@/types";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import CircularGallery, { CircularGalleryItem } from "@/components/ui/CircularGallery";
import { Layers, BookOpen, ArrowUpRight, FolderKanban } from "lucide-react";

interface CircularGalleryShowcaseProps {
  projects: Project[];
}

export default function CircularGalleryShowcase({ projects }: CircularGalleryShowcaseProps) {
  const { theme, t } = useLanguageTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  // Map project data to CircularGallery items with actual assets and titles
  const galleryItems: CircularGalleryItem[] = useMemo(() => {
    return projects.map((project) => ({
      image: project.image,
      text: project.title.split(" — ")[0], // Clear, concise label above card
      title: project.title,
      alt: `Tangkapan layar ${project.title}`,
      description: project.summary,
      slug: project.slug,
    }));
  }, [projects]);

  // Synchronize active project when circular gallery moves or snaps
  const handleActiveChange = useCallback(
    (index: number) => {
      const normalized = Math.abs(index) % projects.length;
      setActiveIndex(normalized);
    },
    [projects.length]
  );

  // When card is clicked
  const handleItemClick = useCallback(
    (_item: CircularGalleryItem, index: number) => {
      const normalized = Math.abs(index) % projects.length;
      setActiveIndex(normalized);
    },
    [projects.length]
  );

  const activeProject = projects[activeIndex % projects.length] || projects[0];
  const total = projects.length;

  return (
    <div
      className="w-full flex flex-col items-center select-none"
      role="region"
      aria-label="Interactive Circular Gallery Showcase"
    >
      {/* 3D WebGL2 Circular Gallery Stage */}
      <div className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] lg:h-[520px] overflow-hidden rounded-3xl">
        <CircularGallery
          items={galleryItems}
          bend={2.8}
          textColor={theme === "dark" ? "#f8fafc" : "#0f172a"}
          borderRadius={0.06}
          scrollSpeed={2}
          scrollEase={0.06}
          itemSize={0.95}
          itemAspect={1.3}
          gap={0.3}
          wave={0.8}
          fadeEdges={0.15}
          shadow={theme === "dark" ? 0.35 : 0.2}
          grayscale={false}
          showTitles={true}
          snap={true}
          autoScroll={0}
          openOnClick={true}
          intro={true}
          onActiveChange={handleActiveChange}
          onItemClick={handleItemClick}
        />
      </div>

      {/* Quick dots navigation for accessible slide indication */}
      <div className="flex items-center gap-2 mt-4 mb-2" role="tablist" aria-label="Indikator Proyek Galeri">
        {projects.map((proj, i) => (
          <button
            key={proj.slug}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Pilih proyek ${proj.title}`}
            onClick={() => setActiveIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-8 bg-indigo-600 shadow-sm shadow-indigo-600/50"
                : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-indigo-400"
            }`}
          />
        ))}
      </div>

      {/* Synchronized Project Information Panel (Preserved layout, driven by activeProject) */}
      {activeProject && (
        <div
          id={`project-panel-${activeProject.slug}`}
          key={activeProject.slug}
          className="w-full max-w-4xl glass-panel rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-2xl mt-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
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
              Teknologi:
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

      {/* Button to Archive (PRD 2.5: Pertahankan tombol 'Lihat Seluruh Karya' ke /work) */}
      <div className="mt-10 text-center">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-white/15 text-sm font-semibold transition-all duration-300 shadow-lg"
        >
          <FolderKanban className="w-4 h-4 text-indigo-500" />
          <span>
            {t("featured.viewAllArchive")} ({total}+ Proyek)
          </span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
