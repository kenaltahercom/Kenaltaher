"use client";

import React from "react";
import Link from "next/link";
import KenaltaherMascot from "@/components/mascot/KenaltaherMascot";
import { siteConfig } from "@/data/siteConfig";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-[#050507] text-slate-600 dark:text-slate-400 text-xs sm:text-sm py-12 sm:py-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <KenaltaherMascot size="sm" showGreeting={false} />
              <span className="font-extrabold text-base text-slate-900 dark:text-white uppercase tracking-wider">
                {siteConfig.brandName}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed max-w-sm">
              Portofolio personal dan showcase rekayasa web <strong className="text-slate-900 dark:text-slate-200">Taher Daeng Matora</strong>. 
              Membangun solusi digital yang elegan, cepat, dan berdaya guna.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-mono text-slate-900 dark:text-slate-200 font-semibold uppercase tracking-wider block mb-3">
              Navigasi Cepat
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/#work" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Karya Pilihan
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Arsip Seluruh Proyek
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Layanan &amp; Kemampuan
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Tentang Taher
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Pengalaman &amp; Sertifikasi
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Kontak &amp; Diskusi
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials / Channels */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono text-slate-900 dark:text-slate-200 font-semibold uppercase tracking-wider block mb-3">
              Koneksi Digital
            </span>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href="https://github.com/kenaltaher"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>GitHub / kenaltaher</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/in/taher-daeng-matora"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>LinkedIn / Taher Daeng Matora</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com/kenaltaher"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Instagram / @kenaltaher</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:taherdaengmatora@gmail.com"
                className="hover:text-indigo-600 dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Email / taherdaengmatora@gmail.com</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {currentYear} Kenaltaher — Taher Daeng Matora. Hak cipta dilindungi.</p>
          <p className="flex items-center gap-1">
            <span>Didesain &amp; direkayasa dari nol dengan Next.js &amp; Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
