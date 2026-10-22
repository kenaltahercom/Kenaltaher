"use client";

import React, { useState } from "react";
import { contactChannels } from "@/data/siteConfig";
import { contactConfig } from "@/config/contact";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import {
  MessageSquare,
  Mail,
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  Briefcase,
  DollarSign,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Stepper, { Step } from "@/components/ui/Stepper";

export default function ContactSection() {
  const { lang, theme, t } = useLanguageTheme();
  const isDark = theme === "dark";

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
          "Web Application or Web-Based System",
          "UI/UX Design",
          "Graphic Design or Visual Assets",
          "Other",
        ]
      : [
          "Website atau Company Profile",
          "Landing Page",
          "Web Application atau Sistem Berbasis Web",
          "Desain UI/UX",
          "Desain Grafis atau Materi Visual",
          "Lainnya",
        ];

  const budgetOptions =
    lang === "en"
      ? [
          "Not decided yet",
          "Under Rp1 million",
          "Rp1–3 million",
          "Rp3–5 million",
          "Above Rp5 million",
          "Want to discuss first",
        ]
      : [
          "Belum ditentukan",
          "Di bawah Rp1 juta",
          "Rp1–3 juta",
          "Rp3–5 juta",
          "Di atas Rp5 juta",
          "Ingin mendiskusikannya terlebih dahulu",
        ];

  const timelineOptions =
    lang === "en"
      ? [
          "As soon as possible",
          "Within 1–2 weeks",
          "Within 1 month",
          "More than 1 month",
          "Not decided yet",
        ]
      : [
          "Secepatnya",
          "Dalam 1–2 minggu",
          "Dalam 1 bulan",
          "Lebih dari 1 bulan",
          "Belum ditentukan",
        ];

  // Default values based on current active language if empty
  const activeProjectType = projectType || projectTypeOptions[0];
  const activeBudget = budget || budgetOptions[2];
  const activeTimeline = timeline || timelineOptions[1];

  const isOther =
    activeProjectType === "Lainnya" ||
    activeProjectType === "Other";

  const finalProjectType =
    isOther && otherProjectType.trim()
      ? `${lang === "en" ? "Other" : "Lainnya"}: ${otherProjectType.trim()}`
      : activeProjectType;

  const handleNextStep = () => {
    setErrorMsg("");
    if (currentStep === 1) {
      if (isOther && !otherProjectType.trim()) {
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
        return <Mail className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <section
      id="contact"
      aria-label={t("contact.title")}
      className="relative z-10 py-20 sm:py-28 overflow-hidden transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t("contact.tag")}</span>
            </div>

            <h2 className="section-headline-gallery mb-4">
              {t("contact.title")} {t("contact.titleOutline")}
            </h2>

            <p className="max-w-xl section-desc-gallery">
              {t("contact.desc")}
            </p>
          </div>
        </ScrollReveal>

        {/* Stepper Consultation Workspace */}
        <ScrollReveal direction="up" delay={120}>
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-300/80 dark:border-white/10 shadow-2xl bg-white/80 dark:bg-[#111116]/85 mb-12">
            <Stepper
              step={currentStep}
              onStepChange={(s) => {
                setErrorMsg("");
                setCurrentStep(s);
              }}
              theme={isDark ? "dark" : "light"}
              accentColor="#6366f1"
              showFooter={false}
              radius={20}
              className="w-full"
            >
              {/* STEP 1: Jenis Proyek */}
              <Step title={t("contact.step1Title")} icon={<Briefcase className="w-3.5 h-3.5" />}>
                <div className="space-y-6 pt-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 font-sans">
                      {t("contact.step1Heading")}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {t("contact.step1Desc")}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {projectTypeOptions.map((type) => {
                      const selected = activeProjectType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setProjectType(type)}
                          className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                            selected
                              ? "bg-indigo-500/10 border-indigo-600 dark:border-indigo-400 text-indigo-950 dark:text-white shadow-sm ring-1 ring-indigo-500/50"
                              : "bg-slate-100/70 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300 hover:border-slate-400 dark:hover:border-white/20"
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-semibold">{type}</span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                              selected
                                ? "border-indigo-600 bg-indigo-600 text-white"
                                : "border-slate-400 dark:border-slate-600"
                            }`}
                          >
                            {selected && <Check className="w-2.5 h-2.5" strokeWidth={3} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {isOther && (
                    <div className="pt-2 animate-in fade-in duration-200">
                      <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">
                        {t("contact.otherTypeLabel")}
                      </label>
                      <input
                        type="text"
                        value={otherProjectType}
                        onChange={(e) => setOtherProjectType(e.target.value)}
                        placeholder={t("contact.otherTypePlaceholder")}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  )}
                </div>
              </Step>

              {/* STEP 2: Ide dan Kebutuhan */}
              <Step title={t("contact.step2Title")} icon={<MessageSquare className="w-3.5 h-3.5" />}>
                <div className="space-y-5 pt-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 font-sans">
                      {t("contact.step2Heading")}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {t("contact.step2Desc")}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                      {t("contact.projectNameLabel")} <span className="text-slate-400 font-normal">{t("contact.optional")}</span>
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder={t("contact.projectNamePlaceholder")}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                      {t("contact.projectDescLabel")} <span className="text-rose-500">{t("contact.required")}</span>
                    </label>
                    <textarea
                      rows={4}
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder={t("contact.projectDescPlaceholder")}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                        {t("contact.projectGoalLabel")} <span className="text-slate-400 font-normal">{t("contact.optional")}</span>
                      </label>
                      <input
                        type="text"
                        value={projectGoal}
                        onChange={(e) => setProjectGoal(e.target.value)}
                        placeholder={t("contact.projectGoalPlaceholder")}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                        {t("contact.extraFeaturesLabel")} <span className="text-slate-400 font-normal">{t("contact.optional")}</span>
                      </label>
                      <input
                        type="text"
                        value={extraFeatures}
                        onChange={(e) => setExtraFeatures(e.target.value)}
                        placeholder={t("contact.extraFeaturesPlaceholder")}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </Step>

              {/* STEP 3: Anggaran dan Target Waktu */}
              <Step title={t("contact.step3Title")} icon={<DollarSign className="w-3.5 h-3.5" />}>
                <div className="space-y-6 pt-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 font-sans">
                      {t("contact.step3Heading")}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {t("contact.step3Desc")}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-2.5">
                      {t("contact.budgetLabel")}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setBudget(opt)}
                          className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                            activeBudget === opt
                              ? "bg-indigo-500/10 border-indigo-600 dark:border-indigo-400 text-indigo-950 dark:text-white ring-1 ring-indigo-500/50"
                              : "bg-slate-100/70 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-400"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-2.5">
                      {t("contact.timelineLabel")}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {timelineOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setTimeline(opt)}
                          className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                            activeTimeline === opt
                              ? "bg-indigo-500/10 border-indigo-600 dark:border-indigo-400 text-indigo-950 dark:text-white ring-1 ring-indigo-500/50"
                              : "bg-slate-100/70 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-400"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                      {t("contact.extraNotesLabel")} <span className="text-slate-400 font-normal">{t("contact.optional")}</span>
                    </label>
                    <input
                      type="text"
                      value={extraNotes}
                      onChange={(e) => setExtraNotes(e.target.value)}
                      placeholder={t("contact.extraNotesPlaceholder")}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </Step>

              {/* STEP 4: Tinjau Rencana Proyek */}
              <Step title={t("contact.step4Title")} icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                <div className="space-y-6 pt-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 font-sans">
                      {t("contact.step4Heading")}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {t("contact.step4Desc")}
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-5 rounded-2xl bg-slate-100/90 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/10 space-y-3 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
                      <div>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-0.5">
                          {t("contact.summaryType")}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">{finalProjectType}</span>
                      </div>
                      {projectName && (
                        <div>
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-0.5">
                            {t("contact.summaryName")}
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white">{projectName}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-0.5">
                          {t("contact.summaryBudget")}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">{activeBudget}</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-0.5">
                          {t("contact.summaryTimeline")}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">{activeTimeline}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-0.5">
                        {t("contact.summaryDesc")}
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">
                        {projectDescription || (lang === "en" ? "(Not specified)" : "(Belum diisi)")}
                      </p>
                    </div>

                    {projectGoal && (
                      <div>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-0.5">
                          {t("contact.summaryGoal")}
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 font-medium">{projectGoal}</p>
                      </div>
                    )}

                    {extraFeatures && (
                      <div>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-0.5">
                          {t("contact.summaryFeatures")}
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 font-medium">{extraFeatures}</p>
                      </div>
                    )}
                  </div>

                  {/* Client Identification Inputs */}
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                        {t("contact.clientNameLabel")} <span className="text-rose-500">{t("contact.required")}</span>
                      </label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder={t("contact.clientNamePlaceholder")}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                          {t("contact.clientPhoneLabel")} <span className="text-slate-400 font-normal">{t("contact.optional")}</span>
                        </label>
                        <input
                          type="tel"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder={t("contact.clientPhonePlaceholder")}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                          {t("contact.clientEmailLabel")} <span className="text-slate-400 font-normal">{t("contact.optional")}</span>
                        </label>
                        <input
                          type="email"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder={t("contact.clientEmailPlaceholder")}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {whatsappTriggered && (
                    <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-900 dark:text-indigo-300 leading-relaxed">
                      💡 {t("contact.waTriggeredNotice")}
                    </div>
                  )}
                </div>
              </Step>
            </Stepper>

            {/* Error Message Feedback */}
            {errorMsg && (
              <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  currentStep === 1
                    ? "opacity-0 pointer-events-none"
                    : "glass-panel text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10"
                }`}
              >
                {t("contact.btnBack")}
              </button>

              <div className="flex items-center gap-2">
                {currentStep === 4 ? (
                  <>
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="px-4 py-2.5 rounded-xl glass-panel text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 flex items-center gap-1.5 cursor-pointer"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? t("contact.btnCopied") : t("contact.btnCopy")}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>{t("contact.btnSendWA")}</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black hover:opacity-90 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <span>{t("contact.btnNext")}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Secondary Contact Strip (Preserving All 5 Verified Channels) */}
        <ScrollReveal direction="up" delay={200}>
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-300/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>{t("contact.verifiedChannels")}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {contactChannels.map((c) => (
                <a
                  key={c.channel}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-white/10 transition-colors"
                  aria-label={`Hubungi via ${c.label}`}
                >
                  {renderSocialIcon(c.channel)}
                  <span>{c.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
