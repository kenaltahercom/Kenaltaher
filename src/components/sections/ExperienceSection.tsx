"use client";

import React from "react";
import { experienceData } from "@/data/experience";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ExperienceSection() {
  const { t } = useLanguageTheme();

  return (
    <section
      id="experience"
      aria-label="Trainings dan Pengalaman"
      className="relative z-10 py-20 sm:py-28 overflow-hidden border-b border-slate-200 dark:border-white/5 transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-500 dark:text-indigo-400 mb-4">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t("trainings.tag")}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              {t("trainings.title")} <span className="text-outline">{t("trainings.titleOutline")}</span>
            </h2>

            <p className="max-w-xl text-slate-700 dark:text-slate-300 font-medium text-sm sm:text-base mt-4">
              {t("trainings.desc")}
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline Layout */}
        <div className="max-w-3xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-5 before:w-0.5 before:bg-slate-300 dark:before:bg-white/10">
          {experienceData.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={80 * (idx + 1)}>
              <div className="relative pl-8 sm:pl-12 group">
                {/* Timeline marker node */}
                <div className="absolute left-1.5 sm:left-3.5 top-2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-500 group-hover:scale-125 group-hover:bg-indigo-600 transition-all duration-300 shadow-sm" />

                {/* Experience Card */}
                <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 hover:border-indigo-500/30 transition-all duration-300 shadow-xl group-hover:-translate-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 w-fit">
                      <Calendar className="w-3 h-3" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-400 mb-4 pb-3 border-b border-slate-200 dark:border-white/5">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{item.organization}</span>
                    {item.location && (
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400 font-medium">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4 font-medium">
                    {item.description}
                  </p>

                  {/* Highlights list */}
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {item.highlights.map((hl, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Technologies tags */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
