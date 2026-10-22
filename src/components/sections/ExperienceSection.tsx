"use client";

import React from "react";
import { experienceData } from "@/data/experience";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { Briefcase, Calendar, MapPin, CheckCircle2, Milestone } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ExperienceSection() {
  const { t, lang } = useLanguageTheme();

  // Categorized skill structure for each experience item (addressing Requirement 8)
  const getSkillCategories = (id: string) => {
    if (id === "exp-freelance-web") {
      return [
        { category: "Programming & Web", items: ["TypeScript"] },
        { category: "Framework & Styling", items: ["Next.js", "Tailwind CSS"] },
        { category: "Design & Platform", items: ["UI/UX Design", "Vercel"] },
      ];
    }
    return [
      { category: "Web Technologies", items: ["HTML", "CSS", "Frontend"] },
      { category: "Workflow", items: ["Content Architecture", "Digital Documentation"] },
    ];
  };

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

            <h2 className="section-headline-gallery">
              {t("trainings.title")} {t("trainings.titleOutline")}
            </h2>

            <p className="max-w-xl section-desc-gallery mt-4">
              {t("trainings.desc")}
            </p>
          </div>
        </ScrollReveal>

        {/* Horizontal Professional Timeline (Requirement 7) */}
        <div className="relative">
          {/* Desktop Connecting Horizontal Timeline Bar */}
          <div className="hidden lg:block absolute top-[28px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-500/30 via-indigo-500/70 to-indigo-500/30 z-0 pointer-events-none" />

          {/* Milestone Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch relative z-10">
            {experienceData.map((item, idx) => {
              const categories = getSkillCategories(item.id);

              return (
                <ScrollReveal key={item.id} direction="up" delay={100 * (idx + 1)} className="h-full">
                  <div className="h-full flex flex-col glass-panel rounded-3xl p-6 sm:p-8 border border-slate-300/80 dark:border-white/10 hover:border-indigo-500/40 bg-white/70 dark:bg-[#111116]/80 shadow-xl transition-all duration-300 group">
                    {/* Top Milestone Indicator & Date Period */}
                    <div className="flex items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-200 dark:border-white/10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                          <Milestone className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                          Milestone {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-white/[0.06] px-3 py-1.5 rounded-full border border-slate-300/80 dark:border-white/10 shadow-xs">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    {/* Role Title & Organization */}
                    <div className="mb-4">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors font-sans leading-snug mb-1.5">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
                        <span className="font-bold text-slate-900 dark:text-slate-200">
                          {item.organization}
                        </span>
                        {item.location && (
                          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
                            <span>•</span>
                            <MapPin className="w-3 h-3" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Brief Narrative */}
                    <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 font-medium">
                      {item.description}
                    </p>

                    {/* Factual Highlights */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="space-y-2 mb-6">
                        {item.highlights.map((hl, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Categorized Skills & Technologies (Requirement 8) */}
                    <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/10 space-y-3">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                        {lang === "id" ? "Kategori Keahlian Terapan:" : "Applied Skill Categories:"}
                      </div>
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <div key={cat.category} className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold mr-1">
                              {cat.category}:
                            </span>
                            {cat.items.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-slate-100 dark:bg-white/[0.04] text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-white/10"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
