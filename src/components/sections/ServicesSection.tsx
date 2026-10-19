"use client";

import React from "react";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { Code2, Layers } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  Html5Icon,
  Css3Icon,
  JavascriptIcon,
  TypescriptIcon,
  ReactIcon,
  NextjsIcon,
  TailwindIcon,
  NodejsIcon,
  PythonIcon,
  PhpIcon,
  GitIcon,
  GithubIcon,
  FigmaIcon,
  PostgresqlIcon,
  VercelIcon,
  VscodeIcon,
} from "@/components/ui/Icons";
import GlassIcons from "@/components/ui/GlassIcons";

export default function ServicesSection() {
  const { t, lang, theme } = useLanguageTheme();

  // Logos restored to full original prominent size (w-8 h-8)
  const technologies = [
    { name: "HTML5", icon: <Html5Icon className="w-8 h-8" /> },
    { name: "CSS3", icon: <Css3Icon className="w-8 h-8" /> },
    { name: "JavaScript", icon: <JavascriptIcon className="w-8 h-8" /> },
    { name: "TypeScript", icon: <TypescriptIcon className="w-8 h-8" /> },
    { name: "React", icon: <ReactIcon className="w-8 h-8" /> },
    { name: "Next.js", icon: <NextjsIcon className="w-8 h-8 text-slate-900 dark:text-white" /> },
    { name: "Tailwind CSS", icon: <TailwindIcon className="w-8 h-8" /> },
    { name: "Node.js", icon: <NodejsIcon className="w-8 h-8" /> },
    { name: "Python", icon: <PythonIcon className="w-8 h-8" /> },
    { name: "PHP", icon: <PhpIcon className="w-8 h-8" /> },
    { name: "Git", icon: <GitIcon className="w-8 h-8" /> },
    { name: "GitHub", icon: <GithubIcon className="w-8 h-8 text-slate-900 dark:text-white" /> },
    { name: "Figma", icon: <FigmaIcon className="w-8 h-8" /> },
    { name: "PostgreSQL", icon: <PostgresqlIcon className="w-8 h-8" /> },
    { name: "Vercel", icon: <VercelIcon className="w-8 h-8 text-slate-900 dark:text-white" /> },
    { name: "VS Code", icon: <VscodeIcon className="w-8 h-8" /> },
  ];

  const service1Badges =
    lang === "id"
      ? [
          "Next.js & React",
          "TypeScript & JS",
          "Tailwind CSS",
          "Web QA & Bug Fixing",
          "PostgreSQL & PHP",
          "RESTful API & Git",
          "Sistem Digital Responsif",
          "Performance Tuning",
        ]
      : [
          "Next.js & React",
          "TypeScript & JS",
          "Tailwind CSS",
          "Web QA & Bug Fixing",
          "PostgreSQL & PHP",
          "RESTful API & Git",
          "Responsive Web Systems",
          "Performance Tuning",
        ];

  const service2Badges =
    lang === "id"
      ? [
          "Administrasi Digital",
          "Pengelolaan Data & Spreadsheet",
          "Dokumentasi Teknis",
          "Riset Online & Fact-Checking",
          "Analisis Sistem",
          "Otomasi Alur Kerja",
          "Manajemen Tugas & Git Sync",
          "Produktivitas Digital",
        ]
      : [
          "Digital Administration",
          "Data & Spreadsheet Management",
          "Technical Documentation",
          "Online Research & Fact-Checking",
          "System Analysis",
          "Workflow Optimization",
          "Task Tracking & Git Sync",
          "Digital Productivity",
        ];

  return (
    <section
      id="services"
      aria-label="What I Can Do"
      className="relative z-10 py-20 sm:py-28 overflow-hidden border-b border-slate-200 dark:border-white/5 transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* KOLOM KIRI (lg:col-span-5): Label, Judul, Deskripsi, & 16 Ikon Teknologi */}
          <div className="lg:col-span-5 flex flex-col">
            <ScrollReveal direction="up" delay={50}>
              {/* Label Kecil "MY CAPABILITIES" */}
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-slate-200/90 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-white/10 mb-4 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                {t("services.capabilitiesTag")}
              </div>

              {/* Judul Besar Rata Kiri */}
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase mb-4 leading-tight text-left">
                {t("services.title")}
              </h2>

              {/* Deskripsi Singkat Rata Kiri */}
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed text-left mb-8 font-medium">
                {t("services.desc")}
              </p>
            </ScrollReveal>

            {/* Kumpulan Ikon Teknologi: Tile pembungkus kompak & rapi, ukuran logo utuh w-8 h-8 */}
            <ScrollReveal direction="up" delay={150}>
              <div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
                  {lang === "id" ? "Teknologi & Alat Utama" : "Core Tech Stack & Tools"}
                </div>
                <div className="grid grid-cols-4 gap-2 sm:gap-2.5 max-w-sm sm:max-w-md">
                  {technologies.map((tech) => (
                    <div
                      key={tech.name}
                      title={tech.name}
                      className="group relative aspect-square rounded-xl bg-white dark:bg-[#121217] border border-slate-200/90 dark:border-white/10 hover:border-indigo-500/60 dark:hover:border-indigo-400/50 hover:bg-slate-50 dark:hover:bg-white/[0.08] flex items-center justify-center p-2 sm:p-2.5 transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md cursor-default select-none"
                    >
                      <div className="transition-transform duration-200 group-hover:scale-105 flex items-center justify-center">
                        {tech.icon}
                      </div>

                      {/* Tooltip Popup on Hover (Label nama teknologi utuh tanpa terpotong) */}
                      <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-30">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* KOLOM KANAN (lg:col-span-7): Dua Kartu Layanan Besar Berdampingan pada Desktop */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* KARTU 01 - IT, Web Development & QA */}
            <ScrollReveal direction="up" delay={100} className="h-full">
              <div className="h-full group relative bg-white dark:bg-[#111116] border border-slate-200/90 dark:border-white/10 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-lg shadow-black/5 dark:shadow-black/40 transition-all duration-300">
                {/* Subtle Ambient Glow */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
                </div>

                <div>
                  {/* Header Kartu: Nomor Urut 01 + GlassIcon wadah ikon */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-3xl sm:text-4xl font-mono font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
                      01
                    </span>

                    {/* Interactive GlassIcon container */}
                    <div className="relative shrink-0 flex items-center justify-center -mr-1 -mt-1">
                      <GlassIcons
                        items={[
                          {
                            icon: <Code2 className="w-8 h-8" strokeWidth={2.2} />,
                            color: "indigo",
                            label: t("services.service1Title"),
                          },
                        ]}
                        size={82}
                        gap={0}
                        columns={1}
                        roundness={0.6}
                        refraction={0.8}
                        bevel={0.6}
                        dispersion={0}
                        frost={0.2}
                        shine={0.85}
                        tint="#dfdfdf"
                        tintOpacity={0.2}
                        iconColor={theme === "dark" ? "#ffffff" : "#312e81"}
                        plate="tilt"
                        tilt={30}
                        spread={0.5}
                        hover="press"
                        parallax={1}
                        labels="hover"
                        intro={true}
                        theme={theme}
                      />
                    </div>
                  </div>

                  {/* Judul Kategori Layanan */}
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
                    {t("services.service1Title")}
                  </h3>

                  {/* Deskripsi Kemampuan */}
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                    {t("services.service1Desc")}
                  </p>
                </div>

                {/* Daftar Keterampilan dalam Bentuk Badge Kecil */}
                <div className="pt-4 border-t border-slate-200/90 dark:border-white/10">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2.5">
                    {lang === "id" ? "Keahlian & Ruang Lingkup:" : "Scope & Core Capabilities:"}
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {service1Badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-white/10 group-hover:border-indigo-500/30 transition-colors"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* KARTU 02 - VA & Digital Operations */}
            <ScrollReveal direction="up" delay={200} className="h-full">
              <div className="h-full group relative bg-white dark:bg-[#111116] border border-slate-200/90 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-lg shadow-black/5 dark:shadow-black/40 transition-all duration-300">
                {/* Subtle Ambient Glow */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
                </div>

                <div>
                  {/* Header Kartu: Nomor Urut 02 + GlassIcon wadah ikon */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-3xl sm:text-4xl font-mono font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                      02
                    </span>

                    {/* Interactive GlassIcon container */}
                    <div className="relative shrink-0 flex items-center justify-center -mr-1 -mt-1">
                      <GlassIcons
                        items={[
                          {
                            icon: <Layers className="w-8 h-8" strokeWidth={2.2} />,
                            color: "green",
                            label: t("services.service2Title"),
                          },
                        ]}
                        size={82}
                        gap={0}
                        columns={1}
                        roundness={0.6}
                        refraction={0.8}
                        bevel={0.6}
                        dispersion={0}
                        frost={0.2}
                        shine={0.85}
                        tint="#dfdfdf"
                        tintOpacity={0.2}
                        iconColor={theme === "dark" ? "#ffffff" : "#064e3b"}
                        plate="tilt"
                        tilt={30}
                        spread={0.5}
                        hover="press"
                        parallax={1}
                        labels="hover"
                        intro={true}
                        theme={theme}
                      />
                    </div>
                  </div>

                  {/* Judul Kategori Layanan */}
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
                    {t("services.service2Title")}
                  </h3>

                  {/* Deskripsi Kemampuan */}
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                    {t("services.service2Desc")}
                  </p>
                </div>

                {/* Daftar Keterampilan dalam Bentuk Badge Kecil */}
                <div className="pt-4 border-t border-slate-200/90 dark:border-white/10">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2.5">
                    {lang === "id" ? "Keahlian & Ruang Lingkup:" : "Scope & Core Capabilities:"}
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {service2Badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-white/10 group-hover:border-emerald-500/30 transition-colors"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
