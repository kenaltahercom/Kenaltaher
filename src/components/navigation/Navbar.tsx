"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { Menu, X, ArrowUpRight, Sun, Moon, Mail } from "lucide-react";
import { contactConfig } from "@/config/contact";
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import PillNav from "@/components/ui/PillNav";
import StarBorder from "@/components/ui/StarBorder";
import BellToggle from "@/components/ui/BellToggle";

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
    { label: t("nav.trainings"), href: "/#experience" },
    { label: t("nav.awards"), href: "/#awards" },
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
      { id: "experience", index: 3 },
      { id: "awards", aliasId: "achievements", index: 4 },
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
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 text-foreground group focus-visible:outline-2 focus-visible:outline-indigo-500 rounded-lg"
          aria-label="Kembali ke Beranda Kenaltaher"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl p-1.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 bg-slate-200/60 dark:bg-white/[0.08] border border-slate-300/80 dark:border-white/15 shadow-sm">
            {/* Dark logo for Light Mode */}
            <Image
              src="/images/logo-k-dark.png"
              alt="Kenaltaher Logo"
              width={36}
              height={36}
              className="object-contain w-full h-full dark:hidden"
              priority
            />
            {/* White logo for Dark Mode */}
            <Image
              src="/images/logo-k-white.png"
              alt="Kenaltaher Logo"
              width={36}
              height={36}
              className="object-contain w-full h-full hidden dark:block"
              priority
            />
          </div>
          <span
            className="font-black tracking-normal text-xl sm:text-2xl text-slate-900 dark:text-white transition-colors"
            style={{ fontFamily: "'Varien', sans-serif" }}
          >
            Kenaltaher
          </span>
        </Link>

        {/* Desktop Links â€” Animated PillNav from React Bits */}
        <div className="hidden lg:flex items-center">
          <PillNav
            key={lang}
            items={navLinks}
            activeHref={navLinks[activeNavIndex]?.href}
            onItemClick={(item, index, event) => {
              event.preventDefault();
              setActiveNavIndex(index);
              if (item.href) scrollToSection(item.href);
            }}
            theme={theme === "light" ? "light" : "dark"}
            itemStyle="pill"
            hoverEffect="fill"
            indicator="dot"
            size="sm"
            surface="none"
            collapse="never"
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
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-800" />}
          </button>

          {/* Language Toggle with BellToggle from React Bits */}
          <BellToggle
            offLabel="ID"
            onLabel="EN"
            label="Toggle Language"
            pressed={lang === "en"}
            onChange={(isEn) => setLang(isEn ? "en" : "id")}
            size="sm"
            radius={20}
            color={theme === "light" ? "#18181b" : "#f5f5f5"}
            background={theme === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.08)"}
            onColor={theme === "light" ? "#ffffff" : "#18181b"}
            onBackground={theme === "light" ? "#0f172a" : "#f5f5f5"}
            badge={false}
            waves={true}
          />

          {/* Tombol Hire Me di Ujung Kanan dengan StarBorder */}
          <StarBorder
            as={Link}
            href="/#contact"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              scrollToSection("/#contact");
            }}
            theme={theme === "light" ? "light" : "dark"}
            color={theme === "light" ? "#18181b" : "#ffffff"}
            duration={3.5}
            thickness={1}
            radius={9999}
            glow={0.5}
            className="!px-4 !py-2 !text-xs sm:!text-sm font-semibold tracking-wide"
          >
            <span>{t("nav.hireMe")}</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 inline-block" />
          </StarBorder>
        </div>

        {/* Mobile Controls & Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Quick BellToggle Language Switcher on Mobile */}
          <BellToggle
            offLabel="ID"
            onLabel="EN"
            label="Toggle Language"
            pressed={lang === "en"}
            onChange={(isEn) => setLang(isEn ? "en" : "id")}
            size="sm"
            radius={18}
            color={theme === "light" ? "#18181b" : "#f5f5f5"}
            background={theme === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.08)"}
            onColor={theme === "light" ? "#ffffff" : "#18181b"}
            onBackground={theme === "light" ? "#0f172a" : "#f5f5f5"}
            badge={false}
            waves={false}
          />

          {/* Mobile Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-1.5 rounded-lg glass-panel text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-white/10"
            aria-label="Ganti Tema"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-800" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-zinc-400"
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
                className="py-3 px-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/10">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">Bahasa / Language:</span>
            <BellToggle
              offLabel="ID"
              onLabel="EN"
              label="Toggle Language"
              pressed={lang === "en"}
              onChange={(isEn) => setLang(isEn ? "en" : "id")}
              size="sm"
              radius={18}
              color={theme === "light" ? "#18181b" : "#f5f5f5"}
              background={theme === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.08)"}
              onColor={theme === "light" ? "#ffffff" : "#18181b"}
              onBackground={theme === "light" ? "#0f172a" : "#f5f5f5"}
              badge={false}
              waves={true}
            />
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

          <StarBorder
            as="a"
            href="/#contact"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              scrollToSection("/#contact");
            }}
            theme={theme === "light" ? "light" : "dark"}
            color={theme === "light" ? "#18181b" : "#ffffff"}
            duration={3.5}
            thickness={1}
            radius={12}
            glow={0.5}
            className="mt-1 w-full text-center !py-2.5 font-bold text-sm"
          >
            <span>{t("nav.hireMe")}</span>
          </StarBorder>
        </div>
      )}
    </header>
  );
}
