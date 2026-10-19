import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { ArrowUpRight, BookOpen } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:-translate-y-1">
      <div>
        {/* Card Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
          <Image
            src={project.image}
            alt={project.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-black/60 backdrop-blur-md text-indigo-300 border border-indigo-500/30">
              {project.category}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-black/60 backdrop-blur-md text-slate-300 border border-white/10">
              {project.year}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
            {project.summary}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 sm:px-6 pb-6 pt-2 flex items-center gap-2 border-t border-slate-200 dark:border-white/5">
        <Link
          href={`/work/${project.slug}`}
          className="flex-1 py-2 px-3 rounded-lg bg-indigo-600/15 hover:bg-indigo-600 text-indigo-600 dark:text-indigo-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-indigo-500/20"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Studi Kasus</span>
        </Link>

        {project.projectUrl && project.projectUrl !== "#" && (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-900 hover:text-white dark:bg-white/5 dark:hover:bg-white dark:hover:text-black text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors border border-slate-200 dark:border-white/10"
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
