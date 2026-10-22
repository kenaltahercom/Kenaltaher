"use client";

import React, { useState } from "react";
import Image from "next/image";
import { achievementsData } from "@/data/achievements";
import { Achievement } from "@/types";
import LightboxModal from "@/components/ui/LightboxModal";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { Award, ZoomIn, Calendar } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AchievementsSection() {
  const { lang, t } = useLanguageTheme();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  return (
    <section
      id="awards"
      aria-label="Awards dan Pencapaian"
      className="relative z-10 py-20 sm:py-28 overflow-hidden border-b border-slate-200 dark:border-white/5 transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Anchor alias to support both #awards and #achievements */}
      <div id="achievements" className="absolute -top-24 sm:-top-28 pointer-events-none invisible" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-500 dark:text-indigo-400 mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>{t("awards.tag")}</span>
            </div>

            <h2 className="section-headline-gallery">
              {t("awards.title")} {t("awards.titleOutline")}
            </h2>

            <p className="max-w-xl section-desc-gallery mt-4">
              {t("awards.desc")}
            </p>
          </div>
        </ScrollReveal>

        {/* Responsive Grid with Lightbox Interaction */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {achievementsData.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={90 * (idx + 1)}>
              <div
                onClick={() => setSelectedAchievement(item)}
                className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-lg hover:-translate-y-1 h-full"
              >
                <div>
                  {/* Visual Thumbnail with unoptimized */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={item.image}
                      alt={`Dokumentasi ${item.title}`}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Badge */}
                    {item.badge && (
                      <span className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-600 text-white shadow-md">
                        {item.badge}
                      </span>
                    )}

                    {/* Zoom Icon overlay */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-4 h-4" />
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[11px] font-mono text-indigo-400 block mb-0.5">
                        {item.organizer}
                      </span>
                      <h3 className="text-base font-bold text-white leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed font-medium mb-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{item.date}</span>
                  </div>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:underline">
                    {lang === "id" ? "Buka Foto" : "View"}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
        imageSrc={selectedAchievement ? selectedAchievement.image : ""}
        title={selectedAchievement ? selectedAchievement.title : ""}
        description={selectedAchievement ? selectedAchievement.description : undefined}
      />
    </section>
  );
}
