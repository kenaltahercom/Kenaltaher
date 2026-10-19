"use client";

import React, { useState } from "react";
import { siteConfig, contactChannels } from "@/data/siteConfig";
import KenaltaherMascot from "@/components/mascot/KenaltaherMascot";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import {
  MessageSquare,
  Mail,
  ArrowUpRight,
  FileText,
  CheckCircle,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactSection() {
  const { lang, t } = useLanguageTheme();
  const [senderName, setSenderName] = useState("");
  const [projectType, setProjectType] = useState("Pengembangan Website");
  const [message, setMessage] = useState("");

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedText = encodeURIComponent(
      `Halo Taher (Kenaltaher),\n\nNama saya: ${senderName || "Klien"}\nKebutuhan proyek: ${projectType}\nPesan: ${message || "Saya ingin mendiskusikan rencana proyek website."}`
    );
    window.open(`https://wa.me/6282200000000?text=${encodedText}`, "_blank");
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry Proyek: ${projectType} - ${senderName || "Klien"}`);
    const body = encodeURIComponent(
      `Halo Taher Daeng Matora,\n\nNama: ${senderName}\nKategori Kebutuhan: ${projectType}\n\nDetail Kebutuhan:\n${message}\n\nTerima kasih.`
    );
    window.location.href = `mailto:taherdaengmatora@gmail.com?subject=${subject}&body=${body}`;
  };

  const renderSocialIcon = (channel: string) => {
    switch (channel) {
      case "GitHub":
        return <GithubIcon className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      case "LinkedIn":
        return <LinkedinIcon className="w-5 h-5 text-sky-500 dark:text-sky-400" />;
      case "Instagram":
        return <InstagramIcon className="w-5 h-5 text-pink-500 dark:text-pink-400" />;
      case "WhatsApp":
        return <WhatsAppIcon className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />;
      default:
        return <Mail className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />;
    }
  };

  return (
    <section
      id="contact"
      aria-label="Kontak dan Diskusi Proyek"
      className="relative z-10 py-20 sm:py-28 overflow-hidden transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Background radial glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-500 dark:text-indigo-400 mb-4">
              <Mail className="w-3.5 h-3.5" />
              <span>{t("contact.tag")}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              {t("contact.title")} <span className="text-outline">{t("contact.titleOutline")}</span>
            </h2>

            <p className="max-w-xl text-slate-700 dark:text-slate-300 font-medium text-sm sm:text-base mt-4">
              {t("contact.desc")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact & Social Channels */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="up" delay={120}>
              <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-xl space-y-6">
                <div className="flex items-center gap-4">
                  <KenaltaherMascot size="sm" showGreeting={false} />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Taher Daeng Matora
                    </h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-semibold">
                      Owner &amp; Lead Developer — Kenaltaher
                    </p>
                  </div>
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                  {lang === "en"
                    ? "I always welcome new collaboration opportunities. Initial consultations regarding technical scope, timeline estimates, and architectural recommendations are complimentary."
                    : "Saya selalu menyambut peluang kolaborasi baru. Diskusi awal mengenai cakupan teknis, estimasi waktu, dan rekomendasi arsitektur tidak dipungut biaya."}
                </p>

                {/* Verified Contact Channels */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
                    {t("contact.verifiedChannels")}
                  </span>

                  {contactChannels.map((c) => (
                    <a
                      key={c.channel}
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-100/60 hover:bg-slate-200/80 dark:bg-white/[0.02] dark:hover:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white dark:bg-white/5 shadow-xs">
                          {renderSocialIcon(c.channel)}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white block">
                            {c.label}
                          </span>
                          <span className="text-[11px] font-mono font-medium text-slate-600 dark:text-slate-400">
                            {c.value}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
                    </a>
                  ))}
                </div>

                {/* Resume Status */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/5">
                  <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-2">
                    {lang === "en" ? "Professional Resume:" : "Dokumen Profesional:"}
                  </span>
                  {siteConfig.resumeAvailable && siteConfig.resumePath ? (
                    <a
                      href={siteConfig.resumePath}
                      download
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{lang === "en" ? "Download Resume (PDF)" : "Unduh Resume (PDF)"}</span>
                    </a>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                      <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>
                        {lang === "en"
                          ? "Verified CV/Resume can be requested directly via WhatsApp or Email."
                          : "Resume terverifikasi dapat diminta langsung melalui WhatsApp atau Email."}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Instant Message Generator */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={200}>
              <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {t("contact.sendMessage")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium mb-6">
                  {t("contact.sendSubtitle")}
                </p>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="name-input" className="text-xs font-mono text-slate-700 dark:text-slate-300 block mb-1.5 font-semibold">
                      {t("contact.nameLabel")}
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder={lang === "en" ? "e.g. John / Tech Agency" : "Contoh: Rian / PT Solusi Digital"}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="project-select" className="text-xs font-mono text-slate-700 dark:text-slate-300 block mb-1.5 font-semibold">
                      {t("contact.categoryLabel")}
                    </label>
                    <select
                      id="project-select"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                      <option value="Pengembangan Website Kustom" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                        {lang === "en" ? "Custom Modern Website (Next.js / React)" : "Pengembangan Website Kustom (Next.js / React)"}
                      </option>
                      <option value="Landing Page Konversi" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                        {lang === "en" ? "Conversion Landing Page & Business Profile" : "Landing Page & Web Representasi Bisnis"}
                      </option>
                      <option value="Revamp & Optimasi Website" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                        {lang === "en" ? "Website Revamp & Speed Optimization" : "Revamp & Optimasi Kecepatan Website"}
                      </option>
                      <option value="Konsultasi Teknis & Kolaborasi" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                        {lang === "en" ? "Technical Consultation & Collaboration" : "Konsultasi Teknis & Kolaborasi Lainnya"}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message-input" className="text-xs font-mono text-slate-700 dark:text-slate-300 block mb-1.5 font-semibold">
                      {t("contact.messageLabel")}
                    </label>
                    <textarea
                      id="message-input"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        lang === "en"
                          ? "Describe your project timeline, goals, or reference website..."
                          : "Jelaskan kebutuhan, target peluncuran, atau referensi website yang Anda inginkan..."
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none"
                    />
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/20"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{t("contact.btnWhatsApp")}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendEmail}
                      className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-600/20"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{t("contact.btnEmail")}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-400 font-medium pt-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{t("contact.fastNote")}</span>
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
