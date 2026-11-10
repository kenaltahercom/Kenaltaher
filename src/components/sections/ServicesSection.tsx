"use client";

import React from "react";
import Link from "next/link";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import LogoLoop from "@/components/ui/LogoLoop";
import CardNav, { CardNavItem } from "@/components/ui/CardNav";
import SectionHeading from "@/components/ui/SectionHeading";
import TextType from "@/components/ui/TextType";
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
  const { t, lang, theme } = useLanguageTheme();

  // All 16 core technologies fully represented with dark/light mode adaptive contrast
  const techLogos = [
    { title: "HTML5", node: <Html5Icon className="w-9 h-9" />, hoverColor: "#E34F26" },
    { title: "CSS3", node: <Css3Icon className="w-9 h-9" />, hoverColor: "#1572B6" },
    { title: "JavaScript", node: <JavascriptIcon className="w-9 h-9" />, hoverColor: "#F7DF1E" },
    { title: "TypeScript", node: <TypescriptIcon className="w-9 h-9" />, hoverColor: "#3178C6" },
    { title: "React", node: <ReactIcon className="w-9 h-9" />, hoverColor: "#61DAFB" },
    { title: "Next.js", node: <NextjsIcon className="w-9 h-9 text-slate-900 dark:text-white" />, hoverColor: "#6366f1" },
    { title: "Tailwind CSS", node: <TailwindIcon className="w-9 h-9" />, hoverColor: "#06B6D4" },
    { title: "Node.js", node: <NodejsIcon className="w-9 h-9" />, hoverColor: "#5FA04E" },
    { title: "Python", node: <PythonIcon className="w-9 h-9" />, hoverColor: "#3776AB" },
    { title: "PHP", node: <PhpIcon className="w-9 h-9" />, hoverColor: "#777BB4" },
    { title: "Git", node: <GitIcon className="w-9 h-9" />, hoverColor: "#F05032" },
    { title: "GitHub", node: <GithubIcon className="w-9 h-9 text-slate-900 dark:text-white" />, hoverColor: "#818cf8" },
    { title: "Figma", node: <FigmaIcon className="w-9 h-9" />, hoverColor: "#F24E1E" },
    { title: "PostgreSQL", node: <PostgresqlIcon className="w-9 h-9" />, hoverColor: "#4169E1" },
    { title: "Vercel", node: <VercelIcon className="w-9 h-9 text-slate-900 dark:text-white" />, hoverColor: "#6366f1" },
    { title: "VS Code", node: <VscodeIcon className="w-9 h-9" />, hoverColor: "#007ACC" },
  ];

  const cardNavItems: CardNavItem[] = [
    {
      label: "IT, Web Development & QA",
      description:
        lang === "id"
          ? "Membangun dan menguji sistem web cepat, andal, responsif, dan kode arsitektur bersih."
          : "Building and testing fast, reliable, responsive web systems with clean code architecture.",
      links: [
        { label: "Next.js, React & TypeScript", href: "/#contact" },
        { label: "Tailwind CSS & Responsive UI", href: "/#contact" },
        { label: "RESTful API & PostgreSQL", href: "/#contact" },
        { label: "Web QA, Testing & Bug Fixing", href: "/#contact" },
        { label: t("services.service1CTA"), href: "/#contact" },
      ],
    },
    {
      label: "VA & Digital Operations",
      description:
        lang === "id"
          ? "Mendukung kelancaran operasional digital melalui data akurat, riset, dan alur kerja terstruktur."
          : "Supporting digital operations through accurate data, research, and structured workflows.",
      links: [
        { label: "UI/UX Prototyping (Figma)", href: "/#contact" },
        { label: "Brand & Digital Visual Assets", href: "/#contact" },
        { label: "Spreadsheet & Data Systems", href: "/#contact" },
        { label: "Technical Documentation", href: "/#contact" },
        { label: t("services.service2CTA"), href: "/#contact" },
      ],
    },
    {
      label: lang === "id" ? "Architecture & Solutions" : "Architecture & Solutions",
      description:
        lang === "id"
          ? "Optimasi performa web berkelanjutan, version control terstruktur, dan integrasi andal."
          : "Sustainable web performance optimization, structured version control, and reliable integration.",
      links: [
        { label: "Performance Audit & SEO Optimization", href: "/#contact" },
        { label: "Git & GitHub Version Control", href: "/#contact" },
        { label: "Cloud Deployment (Vercel)", href: "/#contact" },
        { label: "WhatsApp Direct CTA Integration", href: "/#contact" },
        { label: lang === "id" ? "Mulai Diskusi Proyek" : "Start Project Discussion", href: "/#contact" },
      ],
    },
  ];

  const navLogo = (
    <div className="flex items-center gap-2 select-none px-2 py-1">
      <span className="font-mono font-black text-xs sm:text-sm tracking-wider text-slate-900 dark:text-white uppercase">
        KENALTAHER
      </span>
      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-400">
        SERVICES
      </span>
    </div>
  );

  const navCta = {
    label: lang === "id" ? "Konsultasi Proyek" : "Consult Project",
    href: "/#contact",
  };

  return (
    <section
      id="services"
      aria-label="What I Can Do"
      className="relative z-10 py-24 sm:py-32 overflow-hidden transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header: Headline & Desc */}
        <ScrollReveal direction="up" delay={40}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <SectionHeading
                sentence={t("services.title")}
                blurAmount={3}
                pauseBetweenAnimations={2}
              />
            </div>
            <p className="max-w-md text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              <TextType
                as="span"
                text={[
                  lang === "en"
                    ? "I combine technical, problem-solving, and digital skills to build reliable systems, test systems, manage data, and support efficient digital workflows."
                    : t("services.desc")
                ]}
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

        {/* CardNav Component Display for What I Can Do */}
        <ScrollReveal direction="up" delay={80}>
          <div className="mb-20 sm:mb-24">
            <CardNav
              logo={navLogo}
              logoAlt="Kenaltaher Services"
              logoHref="/#services"
              items={cardNavItems}
              cta={navCta}
              theme={theme === "light" ? "light" : "dark"}
              surface="glass"
              cardEffect="rise"
              openOn="click"
              defaultOpen={true}
              maxWidth={1100}
              cardHeight={210}
              linkComponent={Link}
              ariaLabel="What I Can Do Services"
            />
          </div>
        </ScrollReveal>

        {/* Continuous LogoLoop — Clean Open Editorial Band (No boxed card) */}
        <ScrollReveal direction="up" delay={140}>
          <div className="pt-10">
            <div className="flex items-center justify-between gap-4 mb-8">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
                {lang === "id"
                  ? "TEKNOLOGI & ALAT KERJA TERVERIFIKASI (16 TOTAL)"
                  : "VERIFIED TECHNOLOGIES & TOOLING (16 TOTAL)"}
              </span>
              <span className="text-[11px] font-mono text-black dark:text-white">
                INTERACTIVE
              </span>
            </div>

            <div className="py-2">
              <LogoLoop
                logos={techLogos}
                speed={75}
                direction="left"
                logoHeight={44}
                gap={52}
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
