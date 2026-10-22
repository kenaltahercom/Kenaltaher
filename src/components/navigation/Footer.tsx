"use client";

import React from "react";
import Link from "next/link";
import KenaltaherMascot from "@/components/mascot/KenaltaherMascot";
import PulseCoffee from "@/components/ui/PulseCoffee";
import { siteConfig } from "@/data/siteConfig";
import { contactConfig } from "@/config/contact";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const { t } = useLanguageTheme();
  const currentYear = 2026;

  return (
    <footer className="border-t border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-[#050507] text-slate-600 dark:text-slate-400 text-xs sm:text-sm py-12 sm:py-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <KenaltaherMascot size="sm" showGreeting={false} />
              <span className="font-extrabold text-base text-slate-900 dark:text-white uppercase tracking-wider">
                {siteConfig.brandName}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed max-w-sm">
              {t("footer.tagline")}
            </p>
            {/* PulseCoffee in Footer */}
            <div className="pt-2">
              <PulseCoffee size="sm" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-mono text-slate-900 dark:text-slate-200 font-semibold uppercase tracking-wider block mb-3">
              {t("footer.quickLinks")}
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/#work" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {t("footer.linkWork")}
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {t("footer.linkArchive")}
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {t("footer.linkServices")}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {t("footer.linkAbout")}
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {t("footer.linkExperience")}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {t("footer.linkContact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials / Channels */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono text-slate-900 dark:text-slate-200 font-semibold uppercase tracking-wider block mb-3">
              {t("footer.socialTitle")}
            </span>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href={contactConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-between group transition-colors"
                aria-label="Hubungi Taher via WhatsApp"
              >
                <span className="flex items-center gap-2">
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-500" />
                  <span>WhatsApp / {contactConfig.whatsappDisplay}</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href={contactConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 dark:hover:text-white flex items-center justify-between group transition-colors"
                aria-label="Profil GitHub Kenaltaher"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon className="w-3.5 h-3.5 text-slate-800 dark:text-slate-200" />
                  <span>GitHub / kenaltahercom</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href={contactConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 dark:hover:text-white flex items-center justify-between group transition-colors"
                aria-label="Profil LinkedIn Kenaltaher"
              >
                <span className="flex items-center gap-2">
                  <LinkedinIcon className="w-3.5 h-3.5 text-sky-500" />
                  <span>LinkedIn / Kenaltaher</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href={contactConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 dark:hover:text-white flex items-center justify-between group transition-colors"
                aria-label="Instagram Kenaltaher"
              >
                <span className="flex items-center gap-2">
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-500" />
                  <span>Instagram / @kenaltaher</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href={contactConfig.emailUrl}
                className="hover:text-indigo-600 dark:hover:text-white flex items-center justify-between group transition-colors"
                aria-label="Kirim Email ke Kenaltaher"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Email / {contactConfig.email}</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {currentYear} {t("footer.copyright")}</p>
          <p className="flex items-center gap-1 text-slate-600 dark:text-slate-400 font-medium">
            <span>{t("footer.motto")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
