"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/types";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import Folder from "@/components/ui/Folder";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { theme } = useLanguageTheme();

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 transition-all duration-300 flex flex-col justify-between group bg-white/70 dark:bg-[#111116]/60 backdrop-blur-sm shadow-sm hover:shadow-md">
      <div>
        {/* Interactive 3D Folder Storage Stage */}
        <div className="relative w-full h-[220px] sm:h-[230px] flex items-center justify-center bg-slate-100/80 dark:bg-[#0c0d12]/95 border-b border-slate-200/80 dark:border-white/5 select-none overflow-hidden">
          {/* Subtle workspace dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Top Category and Year Badges (Monochromatic, No Blue) */}
          <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 pointer-events-none">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-slate-900/80 dark:bg-black/70 backdrop-blur-md text-white border border-white/10">
              {project.category}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-900/80 dark:bg-black/70 backdrop-blur-md text-slate-300 border border-white/10">
              {project.year}
            </span>
          </div>

          {/* 3D Folder from React Bits */}
          <div className="pt-2">
            <Folder
              label={project.category}
              color={theme === "light" ? "#334155" : "#18181b"}
              paperColor="#ffffff"
              variant={theme === "light" ? "solid" : "glass"}
              theme={theme === "light" ? "light" : "dark"}
              mode="flap"
              layout="spread"
              size={0.82}
              items={[
                {
                  image: project.image,
                  title: project.title,
                  alt: `Pratinjau visual ${project.title}`,
                },
                {
                  title: project.title,
                  description: project.summary,
                },
                {
                  title: `${project.role} (${project.year})`,
                  description: project.technologies.slice(0, 4).join(" • "),
                },
              ]}
            />
          </div>
        </div>

        {/* Content: Title, Description & Tech Stack */}
        <div className="p-5 sm:p-6 space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {project.summary}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-3 flex items-center gap-2 border-t border-slate-200/60 dark:border-white/5">
        <Link
          href={`/work/${project.slug}`}
          className="flex-1 py-2 px-3 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black text-xs font-semibold flex items-center justify-center gap-1.5 transition-opacity hover:opacity-90 shadow-sm"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Studi Kasus</span>
        </Link>

        {project.projectUrl && project.projectUrl !== "#" && (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 rounded-full text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/10 text-xs font-medium flex items-center gap-1 transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
            aria-label={`Buka demo ${project.title}`}
          >
            <span>Live</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
