"use client";

import React, { useState } from "react";
import { achievementsData } from "@/data/achievements";
import { Achievement } from "@/types";
import LightboxModal from "@/components/ui/LightboxModal";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import DriftWall, { DriftWallItem } from "@/components/ui/DriftWall";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import TextType from "@/components/ui/TextType";

export default function AchievementsSection() {
  const { lang, t, theme } = useLanguageTheme();
  const isDark = theme === "dark";
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Map authentic awards data to DriftWall items with pure title text only
  const driftWallItems: DriftWallItem[] = achievementsData.map((item) => ({
    image: item.image,
    title: item.title,
    date: item.date,
    organizer: item.organizer,
    description: item.description,
    badge: item.badge,
    onClick: () => setSelectedAchievement(item),
  }));

  // Top highlight items for SpotlightCard showcase
  const highlightItems = achievementsData.slice(0, 4);

  return (
    <section
      id="awards"
      aria-label="Awards dan Pencapaian"
      className="relative z-10 py-20 sm:py-28 overflow-hidden transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Anchor alias to support both #awards and #achievements */}
      <div id="achievements" className="absolute -top-24 sm:-top-28 pointer-events-none invisible" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header: Headline & Description */}
        <ScrollReveal direction="up" delay={40}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
            <div>
              <SectionHeading
                sentence={`${t("awards.title")} ${t("awards.titleOutline")}`}
                blurAmount={3}
                pauseBetweenAnimations={2}
              />
            </div>

            <p className="max-w-md text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              <TextType
                as="span"
                text={[t("awards.desc")]}
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
        </ScrollReveal>

        {/* 3D DriftWall Showcase Container */}
        <ScrollReveal direction="up" delay={80}>
          <div className="relative w-full h-[580px] sm:h-[640px] md:h-[680px] rounded-3xl overflow-hidden bg-slate-900/40 dark:bg-black/50 border border-slate-200/80 dark:border-white/10 shadow-2xl backdrop-blur-sm group">
            {/* Ambient lighting gradient inside wall */}
            <div
              className="absolute -top-20 -left-20 w-80 h-80 bg-slate-400/10 dark:bg-white/5 rounded-full blur-[100px] pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -right-20 w-80 h-80 bg-slate-400/10 dark:bg-white/5 rounded-full blur-[100px] pointer-events-none"
              aria-hidden="true"
            />

            {/* Interactive 3D Drifting Wall */}
            <DriftWall
              items={driftWallItems}
              columns={5}
              tileWidth={250}
              tileHeight={165}
              gap={18}
              radius={16}
              tilt={15}
              turn={-14}
              perspective={1200}
              depth={115}
              speed={36}
              direction="up"
              variance={0.42}
              parallax={0.55}
              lift={65}
              fade={0.6}
              dim={0.62}
              overlayColor={isDark ? "#060012" : "#0f172a"}
              onTileClick={(item) => {
                const match = achievementsData.find((a) => a.image === item.image);
                if (match) setSelectedAchievement(match);
              }}
            />

            {/* Relevant Bold Text Badge at Top Right (No trophy icon) */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:flex items-center px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-lg">
              <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-white/90">
                {lang === "id" ? "Dokumentasi & Penghargaan Resmi" : "Official Awards & Documentation"}
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom Showcase: SpotlightCard Grid */}
        <ScrollReveal direction="up" delay={120}>
          <div className="mt-8 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {highlightItems.map((item) => (
                <SpotlightCard
                  key={item.id}
                  theme={isDark ? "dark" : "light"}
                  spotlightColor={isDark ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.08)"}
                  intensity={0.2}
                  spotlightSize={240}
                  softness={0.7}
                  shape="circle"
                  borderGlow={0.6}
                  proximity={80}
                  smoothing={0.3}
                  flare
                  className="p-5 flex flex-col justify-between cursor-pointer group transition-transform duration-300 hover:-translate-y-1 rounded-2xl"
                  onClick={() => setSelectedAchievement(item)}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded border border-slate-200 dark:border-white/10">
                        {item.badge}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                        {item.date}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-2 leading-snug group-hover:text-black dark:group-hover:text-white transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/10 mt-2">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[160px]">
                      {item.organizer}
                    </span>
                    <div className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                      <span>{lang === "id" ? "Buka" : "View"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox Modal for high-resolution inspection */}
      <LightboxModal
        isOpen={Boolean(selectedAchievement)}
        onClose={() => setSelectedAchievement(null)}
        imageSrc={selectedAchievement?.image || ""}
        title={selectedAchievement?.title || ""}
        description={selectedAchievement?.description}
      />
    </section>
  );
}
