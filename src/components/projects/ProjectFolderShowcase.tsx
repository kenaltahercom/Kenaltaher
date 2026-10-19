"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Project } from "@/types";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import Folder from "@/components/ui/Folder";
import { Layers, BookOpen, ArrowUpRight, FolderKanban, Sparkles } from "lucide-react";

interface ProjectFolderShowcaseProps {
  projects: Project[];
}

const PROJECT_META: Record<
  string,
  {
    color: string;
    label: string;
  }
> = {
  "kenaltaher-portfolio": {
    color: "#6366f1",
    label: "Kenaltaher",
  },
  "modern-business-landing": {
    color: "#0284c7",
    label: "Business",
  },
  "educational-portal-system": {
    color: "#059669",
    label: "Education",
  },
  "creative-showcase-concept": {
    color: "#8b5cf6",
    label: "Creative Hub",
  },
};

export default function ProjectFolderShowcase({ projects }: ProjectFolderShowcaseProps) {
  const { theme, t } = useLanguageTheme();

  // Stable single source of truth: selected project slug
  const [activeSlug, setActiveSlug] = useState<string>(() => {
    return projects[0]?.slug ?? "kenaltaher-portfolio";
  });

  // Responsive folder scale based on viewport width
  const [folderSize, setFolderSize] = useState<number>(0.9);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setFolderSize(0.72);
      } else if (width < 640) {
        setFolderSize(0.78);
      } else if (width < 1024) {
        setFolderSize(0.85);
      } else {
        setFolderSize(0.92);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle project selection cleanly, ignoring re-selection of current active
  const handleSelectProject = useCallback(
    (slug: string) => {
      if (slug === activeSlug) return;
      setActiveSlug(slug);
    },
    [activeSlug]
  );

  // Keyboard navigation support: ArrowLeft and ArrowRight to switch folders
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      const currentIndex = projects.findIndex((p) => p.slug === activeSlug);
      if (currentIndex === -1) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % projects.length;
        setActiveSlug(projects[nextIndex].slug);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
        setActiveSlug(projects[prevIndex].slug);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects, activeSlug]);

  const activeProject = useMemo(() => {
    return projects.find((p) => p.slug === activeSlug) ?? projects[0];
  }, [projects, activeSlug]);

  const total = projects.length;

  return (
    <div
      className="w-full flex flex-col items-center select-none"
      role="region"
      aria-label="3D Interactive Project Folders Showcase"
    >
      {/* Interactive 3D Folders Stage */}
      <div
        className="w-full flex flex-wrap items-end justify-center gap-6 sm:gap-8 md:gap-10 py-6 sm:py-10"
        role="tablist"
        aria-label="Daftar Folder Proyek"
      >
        {projects.map((project, index) => {
          const isActive = project.slug === activeSlug;
          const meta = PROJECT_META[project.slug] || {
            color: "#6366f1",
            label: project.title.split(" — ")[0].slice(0, 14),
          };

          return (
            <div
              key={project.slug}
              className={`relative flex flex-col items-center transition-transform duration-500 ease-out ${
                isActive ? "scale-105 z-20" : "scale-95 opacity-80 hover:opacity-100 hover:scale-100 z-10"
              }`}
            >
              {/* Active Indicator Halo Glow behind Folder */}
              {isActive && (
                <div
                  className="absolute -inset-4 rounded-3xl blur-2xl opacity-40 dark:opacity-50 pointer-events-none transition-all duration-500"
                  style={{
                    backgroundColor: meta.color,
                  }}
                />
              )}

              {/* 3D Folder Component */}
              <div
                onClick={() => handleSelectProject(project.slug)}
                className="cursor-pointer"
              >
                <Folder
                  label={meta.label}
                  color={meta.color}
                  variant={theme === "light" ? "solid" : "glass"}
                  theme={theme === "light" ? "light" : "dark"}
                  mode="flap"
                  layout="spread"
                  size={folderSize}
                  open={isActive}
                  tabPosition={
                    index === 0
                      ? "left"
                      : index === projects.length - 1
                        ? "right"
                        : "center"
                  }
                  items={[
                    {
                      image: project.image,
                      title: project.title,
                      alt: `Pratinjau visual ${project.title}`,
                    },
                    {
                      title: project.title,
                      description: `${project.category} (${project.year})`,
                    },
                    {
                      title: project.role,
                      description: project.technologies.slice(0, 3).join(", "),
                    },
                  ]}
                  onOpenChange={(nextOpen) => {
                    if (nextOpen) {
                      handleSelectProject(project.slug);
                    }
                  }}
                  onItemClick={() => {
                    handleSelectProject(project.slug);
                  }}
                />
              </div>

              {/* Folder Selector Tab / Pill Button below */}
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`project-panel-${project.slug}`}
                onClick={() => handleSelectProject(project.slug)}
                className={`mt-4 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-300 flex items-center gap-1.5 border shadow-sm ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-black border-slate-950 dark:border-white shadow-md shadow-indigo-500/20"
                    : "glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border-slate-300 dark:border-white/10"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full transition-transform duration-300"
                  style={{
                    backgroundColor: meta.color,
                    transform: isActive ? "scale(1.3)" : "scale(1)",
                  }}
                />
                <span>{meta.label}</span>
                {isActive && (
                  <span className="text-[10px] uppercase font-bold text-indigo-400 dark:text-indigo-600 ml-1">
                    • Active
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Synchronized Project Information Panel (Directly driven by activeProject) */}
      {activeProject && (
        <div
          id={`project-panel-${activeProject.slug}`}
          key={activeProject.slug}
          className="w-full max-w-4xl glass-panel rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-2xl mt-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
        >
          {/* Header Row: Category, Role, Title & CTA Buttons */}
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
