"use client";

import React, { useState } from "react";
import { contactChannels, siteConfig } from "@/data/siteConfig";
import { contactConfig } from "@/config/contact";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import {
  MessageSquare,
  Mail,
  ArrowUpRight,
  Copy,
  Check,
  AlertCircle,
  Briefcase,
  Layers,
  Clock,
  Send,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import ScrollReveal from "@/components/ui/ScrollReveal";
import DodgeField from "@/components/ui/DodgeField";

export default function ContactSection() {
  const { lang, theme, t } = useLanguageTheme();

  // Form State
  const [projectType, setProjectType] = useState("");
  const [otherProjectType, setOtherProjectType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectGoal, setProjectGoal] = useState("");
  const [extraFeatures, setExtraFeatures] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [extraNotes, setExtraNotes] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  // Stepper & Validation State
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [whatsappTriggered, setWhatsappTriggered] = useState(false);

  const projectTypeOptions =
    lang === "en"
      ? [
          "Website or Company Profile",
          "Landing Page",
          "Web Application",
          "UI/UX Design",
          "Graphic Design & Visuals",
          "Other",
        ]
      : [
          "Website / Company Profile",
          "Landing Page",
          "Web Application",
          "Desain UI/UX",
          "Desain Grafis & Materi Visual",
          "Lainnya",
        ];

  const budgetOptions =
    lang === "en"
      ? [
          "To be discussed",
          "Under Rp1 million",
          "Rp1–3 million",
          "Rp3–5 million",
          "Above Rp5 million",
        ]
      : [
          "Ingin diskusi dulu",
          "Di bawah Rp1 juta",
          "Rp1–3 juta",
          "Rp3–5 juta",
          "Di atas Rp5 juta",
        ];

  const timelineOptions =
    lang === "en"
      ? [
          "As soon as possible",
          "Within 1–2 weeks",
          "Within 1 month",
          "Flexible / TBD",
        ]
      : [
          "Secepatnya",
          "Dalam 1–2 minggu",
          "Dalam 1 bulan",
          "Fleksibel / Diskusi",
        ];

  const activeProjectType = projectType || projectTypeOptions[0];
  const finalProjectType =
    activeProjectType === "Other" || activeProjectType === "Lainnya"
      ? otherProjectType.trim() || activeProjectType
      : activeProjectType;

  const activeBudget = budget || budgetOptions[0];
  const activeTimeline = timeline || timelineOptions[0];

  const handleNextStep = () => {
    setErrorMsg("");
    if (currentStep === 1) {
      if (
        (activeProjectType === "Other" || activeProjectType === "Lainnya") &&
        !otherProjectType.trim()
      ) {
        setErrorMsg(t("contact.errOtherType"));
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!projectDescription.trim()) {
        setErrorMsg(t("contact.errDescReq"));
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handlePrevStep = () => {
    setErrorMsg("");
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const constructMessage = () => {
    if (lang === "en") {
      return (
        `*PROJECT PLAN — KENALTAHER*\n` +
        `--------------------------------------\n` +
        `*Client Name:* ${clientName.trim()}\n` +
        (clientPhone.trim() ? `*WhatsApp Number:* ${clientPhone.trim()}\n` : "") +
        (clientEmail.trim() ? `*Email:* ${clientEmail.trim()}\n` : "") +
        `\n*1. Project Type:* ${finalProjectType}\n` +
        (projectName.trim() ? `*Project/Business Name:* ${projectName.trim()}\n` : "") +
        `*2. Requirements Scope:* ${projectDescription.trim()}\n` +
        (projectGoal.trim() ? `*Project Objective:* ${projectGoal.trim()}\n` : "") +
        (extraFeatures.trim() ? `*Additional Features:* ${extraFeatures.trim()}\n` : "") +
        `*3. Estimated Budget:* ${activeBudget}\n` +
        `*4. Target Timeline:* ${activeTimeline}\n` +
        (extraNotes.trim() ? `*Additional Notes:* ${extraNotes.trim()}\n` : "") +
        `--------------------------------------\n` +
        `Hello Taher (Kenaltaher), I would like to discuss the project plan above. Thank you!`
      );
    }

    return (
      `*RENCANA PROYEK — KENALTAHER*\n` +
      `--------------------------------------\n` +
      `*Nama Klien:* ${clientName.trim()}\n` +
      (clientPhone.trim() ? `*No. WhatsApp Klien:* ${clientPhone.trim()}\n` : "") +
      (clientEmail.trim() ? `*Email Klien:* ${clientEmail.trim()}\n` : "") +
      `\n*1. Jenis Proyek:* ${finalProjectType}\n` +
      (projectName.trim() ? `*Nama Proyek/Bisnis:* ${projectName.trim()}\n` : "") +
      `*2. Deskripsi Kebutuhan:* ${projectDescription.trim()}\n` +
      (projectGoal.trim() ? `*Tujuan Proyek:* ${projectGoal.trim()}\n` : "") +
      (extraFeatures.trim() ? `*Fitur Tambahan:* ${extraFeatures.trim()}\n` : "") +
      `*3. Perkiraan Anggaran:* ${activeBudget}\n` +
      `*4. Target Waktu:* ${activeTimeline}\n` +
      (extraNotes.trim() ? `*Catatan Tambahan:* ${extraNotes.trim()}\n` : "") +
      `--------------------------------------\n` +
      `Halo Taher (Kenaltaher), saya ingin mendiskusikan rencana proyek di atas. Terima kasih!`
    );
  };

  const handleSendViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!clientName.trim()) {
      setErrorMsg(t("contact.errNameReq"));
      return;
    }

    if (!projectDescription.trim()) {
      setErrorMsg(t("contact.errDescReq"));
      return;
    }

    const message = constructMessage();
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${contactConfig.whatsappNumber}?text=${encoded}`;

    setWhatsappTriggered(true);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopyMessage = () => {
    const message = constructMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const renderSocialIcon = (channel: string) => {
    switch (channel) {
      case "GitHub":
        return <GithubIcon className="w-4 h-4 text-slate-800 dark:text-slate-200" />;
      case "LinkedIn":
        return <LinkedinIcon className="w-4 h-4 text-sky-500" />;
      case "Instagram":
        return <InstagramIcon className="w-4 h-4 text-pink-500" />;
      case "WhatsApp":
        return <WhatsAppIcon className="w-4 h-4 text-emerald-500" />;
      default:
        return <Mail className="w-4 h-4 text-slate-700 dark:text-slate-300" />;
    }
  };

  return (
    <section
      id="contact"
      aria-label={t("contact.title")}
      className="relative z-10 py-24 sm:py-32 overflow-hidden transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Editorial Hero Contact Layout (Inspired by Reference) */}
        <ScrollReveal direction="up" delay={40}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20 sm:mb-24">
            {/* Left Column: Big Bold Statement & Resume Button */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.88] text-slate-900 dark:text-white font-sans">
                  LET&apos;S<br />
                  WORK<br />
                  TOGETHER
                </h2>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-6 sm:mt-8">
                  {lang === "en"
                    ? "Looking for the next problem worth solving."
                    : "Mencari tantangan berikutnya yang layak diselesaikan."}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md leading-relaxed mt-3">
                  {lang === "en"
                    ? "I'm open to opportunities where I can contribute to software testing, web development, IT operations, and digital workflows."
                    : "Terbuka untuk peluang kolaborasi dalam rekayasa web, pengembangan antarmuka, sistem digital, dan alur kerja teknologi modern."}
                </p>
              </div>

              <div className="mt-8 sm:mt-10">
                <a
                  href={
                    siteConfig.resumeAvailable && siteConfig.resumePath
                      ? siteConfig.resumePath
                      : `https://wa.me/${contactConfig.whatsappNumber}?text=${encodeURIComponent("Halo Taher, saya ingin meminta berkas CV / Resume terbaru Anda.")}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] shadow-xl active:scale-[0.98]"
                >
                  <span>{lang === "en" ? "DOWNLOAD RESUME" : "UNDUH RESUME"}</span>
                  <span className="text-base leading-none">→</span>
                </a>
              </div>
            </div>

            {/* Right Column: Stacked Contact Cards & Message CTA Button */}
            <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4">
              {/* Card 01: INSTAGRAM */}
              <DodgeField patience={2} reach={28} radius={85} axis="x">
                <a
                  href={contactConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-[#12131a]/90 border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 transition-all duration-300 flex items-center justify-between shadow-sm hover:shadow-md w-full"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-slate-200 shrink-0">
                      <InstagramIcon className="w-5 h-5 text-pink-500" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500 block mb-0.5">
                        INSTAGRAM
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate block group-hover:underline">
                        @kenaltaher
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 pl-2">
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                      01
                    </span>
                  </div>
                </a>
              </DodgeField>

              {/* Card 02: GITHUB */}
              <DodgeField patience={2} reach={28} radius={85} axis="x">
                <a
                  href={contactConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-[#12131a]/90 border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 transition-all duration-300 flex items-center justify-between shadow-sm hover:shadow-md w-full"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-slate-200 shrink-0">
                      <GithubIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500 block mb-0.5">
                        GITHUB
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate block group-hover:underline">
                        github.com/kenaltahercom
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                      02
                    </span>
                  </div>
                </a>
              </DodgeField>

              {/* Card 03: LINKEDIN */}
              <DodgeField patience={2} reach={28} radius={85} axis="x">
                <a
                  href={contactConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-[#12131a]/90 border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 transition-all duration-300 flex items-center justify-between shadow-sm hover:shadow-md w-full"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-slate-200 shrink-0">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500 block mb-0.5">
                        LINKEDIN
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate block group-hover:underline">
                        linkedin.com/in/kenaltaher
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                      03
                    </span>
                  </div>
                </a>
              </DodgeField>

              {/* Card 04: WHATSAPP */}
              <DodgeField patience={2} reach={28} radius={85} axis="x">
                <a
                  href={contactConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-[#12131a]/90 border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 transition-all duration-300 flex items-center justify-between shadow-sm hover:shadow-md w-full"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-slate-200 shrink-0">
                      <WhatsAppIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500 block mb-0.5">
                        WHATSAPP
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate block group-hover:underline">
                        {contactConfig.whatsappDisplay}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                      04
                    </span>
                  </div>
                </a>
              </DodgeField>

              {/* SEND ME A MESSAGE → Button */}
              <button
                type="button"
                onClick={() => {
                  const formEl = document.getElementById("project-planner-form");
                  if (formEl) {
                    formEl.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full mt-2 py-4 px-6 rounded-full border border-slate-300 dark:border-white/20 hover:border-slate-900 dark:hover:border-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-slate-900 dark:text-white font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-sm hover:shadow-lg active:scale-[0.99]"
              >
                <span>{lang === "en" ? "SEND ME A MESSAGE" : "KIRIM PESAN LANGSUNG"}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Clean Editorial Interactive Project Planner (Preserved Step-by-Step Column) */}
        <ScrollReveal direction="up" delay={80}>
          <div
            id="project-planner-form"
            className="max-w-4xl mx-auto pt-16 border-t border-slate-200 dark:border-white/10 scroll-mt-28 space-y-8"
          >
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="px-3.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-[10px] font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-2 inline-block">
                {lang === "en" ? "SYSTEMATIC CONSULTATION" : "KONSULTASI SISTEMATIS"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {lang === "en" ? "Plan Your Project in 4 Steps" : "Rencanakan Proyek Anda dalam 4 Langkah"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
                {t("contact.desc")}
              </p>
            </div>

            {/* Step Indicators */}
            <div className="grid grid-cols-4 gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
              {[
                { step: 1, label: lang === "en" ? "01 / Type" : "01 / Jenis" },
                { step: 2, label: lang === "en" ? "02 / Scope" : "02 / Kebutuhan" },
                { step: 3, label: lang === "en" ? "03 / Budget" : "03 / Waktu" },
                { step: 4, label: lang === "en" ? "04 / Send" : "04 / Kirim" },
              ].map((s) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => {
                    setErrorMsg("");
                    setCurrentStep(s.step);
                  }}
                  className={`text-left transition-all ${
                    currentStep === s.step
                      ? "text-slate-950 dark:text-white font-bold"
                      : currentStep > s.step
                      ? "text-slate-900 dark:text-white opacity-80"
                      : "text-slate-400 dark:text-slate-600"
                  }`}
                >
                  <span className="text-[11px] font-mono block uppercase tracking-wider">
                    {s.label}
                  </span>
                  <div
                    className={`h-0.5 mt-2 rounded-full transition-all duration-300 ${
                      currentStep === s.step
                        ? "bg-slate-950 dark:bg-white"
                        : currentStep > s.step
                        ? "bg-slate-400 dark:bg-slate-700"
                        : "bg-transparent"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STEP 1: Jenis Proyek */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 font-sans">
                    {t("contact.step1Heading")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {t("contact.step1Desc")}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {projectTypeOptions.map((type) => {
                    const isSelected = activeProjectType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProjectType(type)}
                        className={`p-3.5 rounded-xl text-left transition-all duration-150 flex items-center justify-between ${
                          isSelected
                            ? "bg-slate-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm"
                            : "bg-slate-50 dark:bg-white/[0.03] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-slate-200/80 dark:border-white/5"
                        }`}
                      >
                        <span className="text-xs sm:text-sm">{type}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {(activeProjectType === "Other" || activeProjectType === "Lainnya") && (
                  <div className="pt-2">
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-2">
                      {t("contact.otherTypeLabel")}
                    </label>
                    <input
                      type="text"
                      value={otherProjectType}
                      onChange={(e) => setOtherProjectType(e.target.value)}
                      placeholder={t("contact.otherTypePlaceholder")}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white"
                    />
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity"
                  >
                    {t("contact.btnNext")}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Ide & Kebutuhan */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 font-sans">
                    {t("contact.step2Heading")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {t("contact.step2Desc")}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1.5">
                      {t("contact.projectNameLabel")} <span className="opacity-60">{t("contact.optional")}</span>
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder={t("contact.projectNamePlaceholder")}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1.5">
                      {t("contact.projectDescLabel")} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder={t("contact.projectDescPlaceholder")}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1.5">
                      {t("contact.projectGoalLabel")} <span className="opacity-60">{t("contact.optional")}</span>
                    </label>
                    <input
                      type="text"
                      value={projectGoal}
                      onChange={(e) => setProjectGoal(e.target.value)}
                      placeholder={t("contact.projectGoalPlaceholder")}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-2.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  >
                    {t("contact.btnBack")}
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity"
                  >
                    {t("contact.btnNext")}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Rencana & Waktu */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 font-sans">
                    {t("contact.step3Heading")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {t("contact.step3Desc")}
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-2">
                      {t("contact.budgetLabel")}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((opt) => {
                        const isSelected = activeBudget === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setBudget(opt)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                              isSelected
                                ? "bg-slate-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm"
                                : "bg-slate-50 dark:bg-white/[0.03] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/5 hover:bg-slate-100"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-2">
                      {t("contact.timelineLabel")}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {timelineOptions.map((opt) => {
                        const isSelected = activeTimeline === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setTimeline(opt)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                              isSelected
                                ? "bg-slate-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm"
                                : "bg-slate-50 dark:bg-white/[0.03] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/5 hover:bg-slate-100"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1.5">
                      {t("contact.extraNotesLabel")} <span className="opacity-60">{t("contact.optional")}</span>
                    </label>
                    <input
                      type="text"
                      value={extraNotes}
                      onChange={(e) => setExtraNotes(e.target.value)}
                      placeholder={t("contact.extraNotesPlaceholder")}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-2.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  >
                    {t("contact.btnBack")}
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity"
                  >
                    {t("contact.btnNext")}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Tinjau & Kirim Rencana */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 font-sans">
                    {t("contact.step4Heading")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {t("contact.step4Desc")}
                  </p>
                </div>

                {/* Concise Plan Summary */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 text-xs sm:text-sm space-y-2">
                  <div className="flex justify-between gap-4">
                    <span className="font-mono text-slate-500 dark:text-slate-400">{t("contact.summaryType")}</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-right">{finalProjectType}</span>
                  </div>
                  {projectName && (
                    <div className="flex justify-between gap-4">
                      <span className="font-mono text-slate-500 dark:text-slate-400">{t("contact.summaryName")}</span>
                      <span className="font-semibold text-slate-900 dark:text-white text-right">{projectName}</span>
                    </div>
                  )}
                  <div className="flex justify-between gap-4">
                    <span className="font-mono text-slate-500 dark:text-slate-400">{t("contact.summaryBudget")}</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-right">{activeBudget}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="font-mono text-slate-500 dark:text-slate-400">{t("contact.summaryTimeline")}</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-right">{activeTimeline}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 dark:border-white/5">
                    <span className="font-mono text-slate-500 dark:text-slate-400 block mb-1">{t("contact.summaryDesc")}</span>
                    <p className="text-slate-800 dark:text-slate-200 text-xs leading-relaxed line-clamp-3">
                      {projectDescription}
                    </p>
                  </div>
                </div>

                {/* Client Contact Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1.5">
                      {t("contact.clientNameLabel")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder={t("contact.clientNamePlaceholder")}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1.5">
                      {t("contact.clientPhoneLabel")} <span className="opacity-60">{t("contact.optional")}</span>
                    </label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder={t("contact.clientPhonePlaceholder")}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1.5">
                      {t("contact.clientEmailLabel")} <span className="opacity-60">{t("contact.optional")}</span>
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder={t("contact.clientEmailPlaceholder")}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white"
                    />
                  </div>
                </div>

                {whatsappTriggered && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {t("contact.waTriggeredNotice")}
                  </p>
                )}

                {/* Final Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  >
                    {t("contact.btnBack")}
                  </button>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? t("contact.btnCopied") : t("contact.btnCopy")}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white" />
                      <span>{t("contact.btnSendWA")}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
