"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import KenaltaherMascot from "@/components/mascot/KenaltaherMascot";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { Menu, X, ArrowUpRight, Sun, Moon, Mail } from "lucide-react";
import GooeyNav from "@/components/ui/GooeyNav";
import { contactConfig } from "@/config/contact";
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";

export default function Navbar() {
  const { lang, setLang, theme, toggleTheme, t } = useLanguageTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("nav.work"), href: "/#work" },
    { label: t("nav.services"), href: "/#services" },
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.awards"), href: "/#awards" },
    { label: t("nav.trainings"), href: "/#experience" },
  ];

  const scrollToSection = (href: string) => {
    if (typeof window === "undefined") return;
    const targetId = href.replace(/^\/?#/, "");
    const targetEl =
      document.getElementById(targetId) ||
      (targetId === "awards" ? document.getElementById("achievements") : null) ||
      (targetId === "achievements" ? document.getElementById("awards") : null);

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${targetId}`);
    } else if (href) {
      window.location.href = href;
    }
  };

  // Sync activeNavIndex with scroll position accurately
  useEffect(() => {
    const navSections = [
      { id: "work", index: 0 },
      { id: "services", index: 1 },
      { id: "about", index: 2 },
      { id: "awards", aliasId: "achievements", index: 3 },
      { id: "experience", index: 4 },
    ];

    const onScroll = () => {
      const scrollY = window.scrollY + 140;
      let active = 0;
      let highestTop = -1;

      navSections.forEach(({ id, aliasId, index }) => {
        const el = document.getElementById(id) || (aliasId ? document.getElementById(aliasId) : null);
        if (el) {
          const top = el.offsetTop;
          if (top <= scrollY && top > highestTop) {
            highestTop = top;
            active = index;
          }
        }
      });

      setActiveNavIndex(active);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 sm:pt-5 transition-all duration-300">
      <nav
        aria-label="Navigasi Utama"
        className={`w-full max-w-6xl rounded-2xl transition-all duration-300 px-6 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between ${
          scrolled
            ? "glass-panel shadow-2xl shadow-black/10 dark:shadow-black/70 border border-slate-300/80 dark:border-white/10"
            : "glass-panel shadow-lg shadow-black/5 dark:shadow-black/40 border border-slate-300/60 dark:border-white/10"
        }`}
      >
        {/* Brand / Logo di Sebelah Kiri */}
        <div className="flex items-center gap-3.5">
          <KenaltaherMascot
            initialPose="navbar"
            size="sm"
            showGreeting={true}
            interactive={true}
            className="hover:rotate-3 transition-transform"
          />
          <Link
            href="/"
            className="flex flex-col text-foreground group focus-visible:outline-2 focus-visible:outline-indigo-500 rounded-lg"
            aria-label="Kembali ke Beranda Kenaltaher"
          >
            <span className="font-extrabold tracking-wider text-lg sm:text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase">
              {siteConfig.brandName}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tracking-tight hidden sm:block">
              {siteConfig.ownerName}
            </span>
          </Link>
        </div>

        {/* Desktop Links — GooeyNav (Work, What I Can Do, About, Awards, Trainings) */}
        <div className="hidden lg:flex items-center">
          <GooeyNav
            items={navLinks}
            activeIndex={activeNavIndex}
            onChange={(index) => {
              setActiveNavIndex(index);
              const href = navLinks[index]?.href;
              if (href) scrollToSection(href);
            }}
            theme={theme}
            size="md"
            frame={false}
            gooeyness={0.45}
            wobble={0.4}
            particleCount={12}
            animationTime={550}
            spread={48}
          />
        </div>

        {/* Controls: Theme Toggle + Language (ID | EN) + Hire Me Button */}
        <div className="hidden sm:flex items-center gap-3.5">
          {/* Theme Toggle (Dark / Light) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-full glass-panel hover:bg-slate-200/60 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-white/10 transition-colors focus:outline-none cursor-pointer"
            aria-label={`Ganti ke mode ${theme === "dark" ? "terang" : "gelap"}`}
            title={`Mode: ${theme}`}
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Language Selector (ID | EN) Tepat di sebelah kontrol tema */}
          <div className="flex items-center rounded-full glass-panel p-0.5 border border-slate-300 dark:border-white/10 text-xs sm:text-[13px] font-mono">
            <button
              type="button"
              onClick={() => setLang("id")}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                lang === "id"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
              aria-label="Bahasa Indonesia"
            >
              ID
            </button>
            <span className="text-slate-400 dark:text-slate-600">|</span>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
              aria-label="English Language"
            >
              EN
            </button>
          </div>

          {/* Tombol Hire Me di Ujung Kanan */}
          <Link
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("/#contact");
            }}
            className="group relative inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300 shadow-md shadow-black/10 dark:shadow-white/10"
          >
            <span>{t("nav.hireMe")}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Controls & Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Quick Language Toggle on Mobile */}
          <button
            type="button"
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className="px-2 py-1 rounded-lg glass-panel text-[11px] font-mono font-bold text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-white/10"
            aria-label="Ganti Bahasa"
          >
            {lang.toUpperCase()}
          </button>

          {/* Mobile Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-1.5 rounded-lg glass-panel text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-white/10"
            aria-label="Ganti Tema"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-expanded={mobileMenuOpen}
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-4 top-20 rounded-2xl glass-panel p-5 border border-slate-300 dark:border-white/15 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col divide-y divide-slate-200 dark:divide-white/5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  scrollToSection(link.href);
                }}
                className="py-3 px-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/10">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">Bahasa / Language:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setLang("id")}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  lang === "id" ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
                }`}
              >
                Bahasa Indonesia (ID)
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  lang === "en" ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
                }`}
              >
                English (EN)
              </button>
            </div>
          </div>

          {/* Quick Official Social & Contact Icons */}
          <div className="flex items-center justify-around py-2 border-t border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
            <a
              href={contactConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors"
              aria-label="Hubungi Taher via WhatsApp"
              title={`WhatsApp: ${contactConfig.whatsappDisplay}`}
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-500" />
            </a>
            <a
              href={contactConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              aria-label="Profil GitHub Kenaltaher"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4 text-slate-800 dark:text-slate-200" />
            </a>
            <a
              href={contactConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl hover:bg-sky-500/10 hover:text-sky-500 transition-colors"
              aria-label="Profil LinkedIn Kenaltaher"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4 text-sky-500" />
            </a>
            <a
              href={contactConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl hover:bg-pink-500/10 hover:text-pink-500 transition-colors"
              aria-label="Instagram Kenaltaher"
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4 text-pink-500" />
            </a>
            <a
              href={contactConfig.emailUrl}
              className="p-2 rounded-xl hover:bg-indigo-500/10 hover:text-indigo-500 transition-colors"
              aria-label="Kirim Email"
              title={`Email: ${contactConfig.email}`}
            >
              <Mail className="w-4 h-4 text-indigo-500" />
            </a>
          </div>

          <a
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              scrollToSection("/#contact");
            }}
            className="mt-1 text-center py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black font-bold text-sm transition-colors shadow-lg"
          >
            {t("nav.hireMe")}
          </a>
        </div>
      )}
    </header>
  );
}
