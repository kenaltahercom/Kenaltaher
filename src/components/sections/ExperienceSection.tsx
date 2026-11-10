"use client";

import React from "react";
import Image from "next/image";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { GraduationCap, MapPin, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PixelCard from "@/components/ui/PixelCard";
import SectionHeading from "@/components/ui/SectionHeading";
import TextType from "@/components/ui/TextType";

export default function ExperienceSection() {
  const { t, lang, theme } = useLanguageTheme();

  const educationData = [
    {
      id: "mts",
      step: "01",
      level: lang === "id" ? "PENDIDIKAN MENENGAH PERTAMA" : "JUNIOR HIGH SCHOOL",
      institution: "MTs Muhammadiyah Al-Fattah Nangahale",
      period: "2019 — 2022",
      location: "Nangahale, Sikka, NTT",
      logo: "/images/education/mts-nangahale.png",
      description:
        lang === "id"
          ? "Menempuh pendidikan menengah pertama dengan fondasi nilai akademik, integritas, dan pengenalan dasar literasi teknologi informasi."
          : "Completed junior high school education with a solid foundation in academic disciplines, ethics, and early digital literacy.",
      highlights: [
        lang === "id" ? "Fondasi logika matematika & sains" : "Foundational mathematics & logic",
        lang === "id" ? "Organisasi & kepemimpinan madrasah" : "Student leadership & organization",
      ],
      tags: ["Muhammadiyah", "Madrasah Tsanawiyah", "Nangahale"],
    },
    {
      id: "makn",
      step: "02",
      level: lang === "id" ? "PENDIDIKAN MENENGAH ATAS" : "VOCATIONAL HIGH SCHOOL",
      institution: "Madrasah Aliyah Kejuruan Negeri Ende",
      subtitle: "MAKN Ende",
      period: "2022 — 2025",
      location: "Ende, Flores, NTT",
      logo: "/images/education/makn-ende.png",
      description:
        lang === "id"
          ? "Pendidikan vokasi kejuruan negeri tingkat menengah atas dengan pendalaman keahlian terapan, logika teknis, dan kesiapan praktis."
          : "State vocational senior high school education with intensive applied technical training, computational logic, and career readiness.",
      highlights: [
        lang === "id" ? "Keterampilan kejuruan terapan" : "Applied vocational skills",
        lang === "id" ? "Kedisiplinan teknis & alur kerja" : "Technical workflows & discipline",
      ],
      tags: ["Kejuruan Negeri", "Vokasi Terapan", "MAKN Ende"],
    },
    {
      id: "stekom",
      step: "03",
      level: lang === "id" ? "PERGURUAN TINGGI" : "HIGHER EDUCATION",
      institution: "Universitas STEKOM",
      subtitle: lang === "id" ? "Program Studi Sistem Informasi" : "Information Systems Major",
      period: lang === "id" ? "2025 — Sekarang" : "2025 — Present",
      location: "Semarang, Jawa Tengah",
      logo: "/images/education/univ-stekom.png",
      description:
        lang === "id"
          ? "Pendidikan sarjana sistem informasi dengan fokus pada rekayasa web modern, basis data relasional, pengujian kualitas (QA), dan arsitektur kode."
          : "Undergraduate degree in Information Systems focusing on modern web engineering, relational database management, and structured QA.",
      highlights: [
        lang === "id" ? "Rekayasa perangkat lunak web modern" : "Modern web software engineering",
        lang === "id" ? "Basis data relasional & arsitektur sistem" : "Relational databases & architecture",
      ],
      tags: ["Sistem Informasi", "Rekayasa Web", "Universitas STEKOM"],
    },
  ];

  return (
    <section
      id="experience"
      aria-label={lang === "id" ? "Latar Belakang Pendidikan" : "Education Background"}
      className="relative z-10 py-24 sm:py-32 overflow-hidden transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={40}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
            <div>
              <SectionHeading
                sentence={`${t("trainings.title")} ${t("trainings.titleOutline")}`}
                blurAmount={3}
                pauseBetweenAnimations={2}
              />
            </div>

            <p className="max-w-md text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              <TextType
                as="span"
                text={[t("trainings.desc")]}
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

        {/* Education PixelCard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {educationData.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={80 * (idx + 1)}>
              <PixelCard
                variant="default"
                theme={theme === "light" ? "light" : "dark"}
                colors={
                  theme === "light"
                    ? ["#0f172a", "#334155", "#64748b"]
                    : ["#ffffff", "#e2e8f0", "#94a3b8"]
                }
                glowColor={theme === "light" ? "#64748b" : "#ffffff"}
                gap={6}
                speed={30}
                pixelSize={2}
                spotlight={0.65}
                glow={0.5}
                opacity={theme === "light" ? 0.3 : 0.4}
                fade={0.35}
                radius={24}
                trigger="hover"
                clickPulse={true}
                className="w-full h-full min-h-[440px] text-left"
              >
                <div className="w-full h-full p-6 sm:p-7 flex flex-col justify-between">
                  {/* Top Area: Step, Level, and Logo */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs font-mono font-bold text-black dark:text-white">
                            {item.step}
                          </span>
                          <span className="text-slate-400 dark:text-slate-600 text-xs">•</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-slate-100 dark:bg-white/[0.08] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10">
                            {item.period}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-black dark:text-white font-bold block">
                          {item.level}
                        </span>
                      </div>

                      {/* Transparent Logo smoothly integrated */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center p-2 rounded-2xl bg-white/60 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-sm">
                        <Image
                          src={item.logo}
                          alt={item.institution}
                          width={60}
                          height={60}
                          className="object-contain max-h-full max-w-full filter contrast-105"
                        />
                      </div>
                    </div>

                    {/* Institution Title & Subtitle */}
                    <div className="mb-4">
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-sans tracking-tight leading-snug">
                        {item.institution}
                      </h3>
                      {item.subtitle && (
                        <p className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mt-1">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-5">
                      {item.highlights.map((hl, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Location & Tags */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 mt-auto">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2.5">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span>{item.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/[0.05] border border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </PixelCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
