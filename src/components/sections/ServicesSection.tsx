"use client";

import React from "react";
import Link from "next/link";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { Code2, Palette, ArrowUpRight, CheckCircle2, Cpu } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import LogoLoop from "@/components/ui/LogoLoop";
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

export default function ServicesSection() {
  const { t, lang } = useLanguageTheme();

  // All 16 core technologies fully represented with dark/light mode adaptive contrast
  const techLogos = [
    { title: "HTML5", node: <Html5Icon className="w-10 h-10" />, hoverColor: "#E34F26" },
    { title: "CSS3", node: <Css3Icon className="w-10 h-10" />, hoverColor: "#1572B6" },
    { title: "JavaScript", node: <JavascriptIcon className="w-10 h-10" />, hoverColor: "#F7DF1E" },
    { title: "TypeScript", node: <TypescriptIcon className="w-10 h-10" />, hoverColor: "#3178C6" },
    { title: "React", node: <ReactIcon className="w-10 h-10" />, hoverColor: "#61DAFB" },
    { title: "Next.js", node: <NextjsIcon className="w-10 h-10 text-slate-900 dark:text-white" />, hoverColor: "#6366f1" },
    { title: "Tailwind CSS", node: <TailwindIcon className="w-10 h-10" />, hoverColor: "#06B6D4" },
    { title: "Node.js", node: <NodejsIcon className="w-10 h-10" />, hoverColor: "#5FA04E" },
    { title: "Python", node: <PythonIcon className="w-10 h-10" />, hoverColor: "#3776AB" },
    { title: "PHP", node: <PhpIcon className="w-10 h-10" />, hoverColor: "#777BB4" },
    { title: "Git", node: <GitIcon className="w-10 h-10" />, hoverColor: "#F05032" },
    { title: "GitHub", node: <GithubIcon className="w-10 h-10 text-slate-900 dark:text-white" />, hoverColor: "#818cf8" },
    { title: "Figma", node: <FigmaIcon className="w-10 h-10" />, hoverColor: "#F24E1E" },
    { title: "PostgreSQL", node: <PostgresqlIcon className="w-10 h-10" />, hoverColor: "#4169E1" },
    { title: "Vercel", node: <VercelIcon className="w-10 h-10 text-slate-900 dark:text-white" />, hoverColor: "#6366f1" },
    { title: "VS Code", node: <VscodeIcon className="w-10 h-10" />, hoverColor: "#007ACC" },
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
          "Desain UI/UX & Prototyping",
          "Desain Grafis & Identitas Brand",
          "Administrasi Digital",
          "Pengelolaan Data & Spreadsheet",
          "Dokumentasi Teknis",
          "Riset Online & Fact-Checking",
          "Otomasi Alur Kerja",
          "Produktivitas Digital",
        ]
      : [
          "UI/UX Design & Prototyping",
          "Graphic Design & Brand Identity",
          "Digital Administration",
          "Data & Spreadsheet Management",
          "Technical Documentation",
          "Online Research & Fact-Checking",
          "Workflow Automation",
          "Digital Productivity",
        ];

  return (
    <section
      id="services"
      aria-label="What I Can Do"
      className="relative z-10 py-20 sm:py-28 overflow-hidden border-b border-slate-200 dark:border-white/5 transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header: Editorial Lead */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-slate-200 dark:border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-4">
                <Cpu className="w-3.5 h-3.5" />
                <span>{t("services.capabilitiesTag")}</span>
              </div>
              <h2 className="section-headline-gallery">
                {t("services.title")}
              </h2>
            </div>
            <p className="max-w-md section-desc-gallery">
              {t("services.desc")}
            </p>
          </div>
        </ScrollReveal>

        {/* Editorial Asymmetric Grid: 2 Distinct Panels with Hierarchy & Depth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-16">
          {/* Panel 1: Primary Service (IT & Web Development) - Takes 7 cols */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={100} className="h-full">
              <div className="h-full glass-panel rounded-3xl p-7 sm:p-9 border border-slate-300/80 dark:border-white/10 bg-white/70 dark:bg-[#111116]/80 shadow-2xl flex flex-col justify-between group hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-4xl font-mono font-black text-indigo-600 dark:text-indigo-400">
                      01
                    </span>
                    <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shadow-sm">
                      <Code2 className="w-7 h-7" />
                    </div>
                  </div>

                  <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-bold block mb-1">
                    Engineering &amp; Architecture
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3 font-sans">
                    {t("services.service1Title")}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                    {t("services.service1Desc")}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{t("services.service1Bullet1")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{t("services.service1Bullet2")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{t("services.service1Bullet3")}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-white/10">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
                    {t("services.scopeLabel1")}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service1Badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-white/[0.05] text-slate-800 dark:text-slate-200 border border-slate-300/70 dark:border-white/10"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase text-indigo-600 dark:text-indigo-400 hover:underline group"
                  >
                    <span>{t("services.service1CTA")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Panel 2: Secondary Service (Graphic Design & Digital Operations) - Takes 5 cols */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up" delay={150} className="h-full">
              <div className="h-full glass-panel rounded-3xl p-7 sm:p-9 border border-slate-300/80 dark:border-white/10 bg-white/70 dark:bg-[#111116]/80 shadow-2xl flex flex-col justify-between group hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-52 h-52 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-4xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                      02
                    </span>
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm">
                      <Palette className="w-7 h-7" />
                    </div>
                  </div>

                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-bold block mb-1">
                    Design &amp; Operations
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3 font-sans">
                    {t("services.service2Title")}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                    {t("services.service2Desc")}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{t("services.service2Bullet1")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{t("services.service2Bullet2")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{t("services.service2Bullet3")}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-white/10">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
                    {t("services.scopeLabel2")}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service2Badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-white/[0.05] text-slate-800 dark:text-slate-200 border border-slate-300/70 dark:border-white/10"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase text-emerald-600 dark:text-emerald-400 hover:underline group"
                  >
                    <span>{t("services.service2CTA")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* SECTION 6: React Bits LogoLoop Showcase — Preserving ALL 16 Tech Logos Seamlessly */}
        <ScrollReveal direction="up" delay={200}>
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-300/80 dark:border-white/10 shadow-xl bg-white/70 dark:bg-[#111116]/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">
                {lang === "id"
                  ? "Teknologi, Framework & Alat Kerja (16 Terverifikasi)"
                  : "Verified Technologies, Frameworks & Tooling (16 Total)"}
              </span>
              <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                Continuous Interactive Loop
              </span>
            </div>

            {/* Official LogoLoop Component */}
            <div className="py-2">
              <LogoLoop
                logos={techLogos}
                speed={80}
                direction="left"
                logoHeight={48}
                gap={56}
                hoverSpeed={0}
                scaleOnHover={true}
                labels="hover"
                ariaLabel="Programming languages and technologies"
                className="w-full"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
