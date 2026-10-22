"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "id" | "en";
export type Theme = "dark" | "light";

interface LanguageThemeContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Nav
    "nav.work": "Work",
    "nav.services": "What I Can Do",
    "nav.about": "About",
    "nav.awards": "Awards",
    "nav.trainings": "Trainings",
    "nav.hireMe": "Hire Me",
    "nav.contact": "Kontak",

    // Intro
    "intro.greeting": "Selamat datang di portofolio Kenaltaher",
    "intro.skip": "Masuk ke Portofolio →",

    // Hero
    "hero.badge": "TERSEDIA UNTUK FREELANCE & PROYEK DIGITAL",
    "hero.role": "Web Developer & Digital Solutions",
    "hero.headline": "Membangun Solusi Web Modern & Berperforma Tinggi",
    "hero.subheadline": "Portofolio rekayasa web personal Taher Daeng Matora (Kenaltaher). Menggabungkan kecepatan, presisi desain, dan struktur kode bersih.",
    "hero.ctaWork": "Lihat Karya",
    "hero.ctaHire": "Hire Me / Konsultasi",
    "hero.ctaArchive": "Buka Arsip →",
    "hero.experienceYears": "2+ Tahun Pengalaman",
    "hero.focus": "Fokus Next.js & UI",
    "hero.creatorProfile": "Profil Kreator",
    "hero.creatorRole": "IT Developer & Graphic Designer",
    "hero.creatorBio": "Membangun website modern, antarmuka interaktif, dan identitas visual digital yang berkarakter.",
    "hero.ctaDiscuss": "Mulai Diskusi Proyek",

    // Featured Work (Showcase Proyek Unggulan)
    "featured.tag": "SHOWCASE PROYEK UNGGULAN",
    "featured.title": "Showcase Proyek",
    "featured.titleOutline": "Unggulan",
    "featured.desc": "Eksplorasi karya yang dikembangkan secara orisinal dengan standar rekayasa modern, performa tinggi, dan pengalaman antarmuka yang intuitif.",
    "featured.viewCaseStudy": "Pelajari Studi Kasus",
    "featured.liveDemo": "Kunjungi Website",
    "featured.viewAllArchive": "Lihat Seluruh Karya",

    // Services / What I Can Do
    "services.capabilitiesTag": "MY CAPABILITIES",
    "services.title": "Yang Bisa Saya Lakukan",
    "services.desc": "Saya memadukan keahlian teknis, pemecahan masalah, dan solusi digital untuk membangun sistem yang handal, menguji sistem, mengelola data, serta mendukung alur kerja digital yang efisien.",
    "services.service1Title": "IT, Web Development & QA",
    "services.service1Desc": "Membangun dan menguji website serta sistem digital yang cepat, andal, dan responsif. Berfokus pada arsitektur kode bersih, pengelolaan database, identifikasi bug terstruktur, dan pengembangan antarmuka pengguna responsif.",
    "services.service1Bullet1": "Arsitektur modern berbasis Next.js, React & TypeScript",
    "services.service1Bullet2": "Desain responsif lintas layar ponsel, tablet, dan desktop",
    "services.service1Bullet3": "Audit performa web, optimasi SEO, dan integrasi WhatsApp CTA",
    "services.service1CTA": "Konsultasi Pengembangan Web",
    "services.service2Title": "VA & Digital Operations",
    "services.service2Desc": "Mendukung kelancaran operasional digital melalui pengelolaan data yang akurat, riset online mendalam, penyusunan dokumentasi teknis rapi, administrasi digital, dan alur kerja produktif yang terstruktur.",
    "services.service2Bullet1": "Desain materi promosi, banner, dan visual branding digital",
    "services.service2Bullet2": "Manajemen data, spreadsheet, dan dokumentasi sistem",
    "services.service2Bullet3": "Alur kerja terstruktur dengan version control & task tracking",
    "services.service2CTA": "Konsultasi Desain & Digital",
    "services.scopeLabel1": "Ruang Lingkup & Keterampilan:",
    "services.scopeLabel2": "Ruang Lingkup & Keterampilan:",

    // About Me
    "about.tag": "ABOUT ME",
    "about.headline": "Problem Solver. Digital Generalist.",
    "about.projectsLabel": "PROJECTS",
    "about.projectsVal": "4 Proyek Selesai",
    "about.eduLabel": "EDUCATION",
    "about.eduVal": "Sistem Informasi, Universitas STEKOM",
    "about.focusLabel": "FOCUS",
    "about.focusVal": "Web Development & Digital Solutions",
    "about.bio": "Saya berfokus merancang dan merekayasa antarmuka web modern yang cepat, andal, dan memikat. Menggabungkan ketelitian logika pemrograman dengan kepekaan desain antarmuka, saya membantu individu dan bisnis menghadirkan identitas digital yang berdaya saing tinggi.",
    "about.downloadResume": "Unduh Resume (PDF)",
    "about.requestResume": "Minta CV Lengkap →",
    "about.currentlyTitle": "CURRENTLY",
    "about.currentlyBuildingLabel": "Building",
    "about.currentlyBuildingDesc": "Aplikasi web modern, cepat, dan responsif menggunakan Next.js, React, dan Tailwind CSS.",
    "about.currentlyExploringLabel": "Exploring",
    "about.currentlyExploringDesc": "Interaksi antarmuka interaktif, 3D CSS perspectives, dan arsitektur TypeScript modern.",
    "about.currentlyLearningLabel": "Learning",
    "about.currentlyLearningDesc": "Deployment cloud, integrasi backend API, dan optimasi performa web berkelanjutan.",
    "about.traitsTitle": "PERSONAL TRAITS",
    "about.traitCreative": "Creative",
    "about.traitCreativeDesc": "Membawa ide visual segar dan solusi desain inovatif ke setiap proyek.",
    "about.traitAdaptable": "Adaptable",
    "about.traitAdaptableDesc": "Cepat menyesuaikan diri dengan teknologi baru dan alur kerja tim.",
    "about.traitProblemSolver": "Problem Solver",
    "about.traitProblemSolverDesc": "Fokus pada akar permasalahan untuk menghasilkan solusi teknis yang tepat guna.",
    "about.traitProfessional": "Karakter Profesional",
    "about.selectTrait": "Pilih Karakter:",
    "about.viewTrait": "Lihat karakter ke-",

    // Experience / Trainings
    "trainings.tag": "TRAININGS & PENGALAMAN",
    "trainings.title": "Perjalanan",
    "trainings.titleOutline": "Profesional",
    "trainings.desc": "Rekam jejak pengerjaan proyek rekayasa web, pelatihan, dan kolaborasi digital.",
    "trainings.skillCategoriesLabel": "Area Keahlian & Teknologi:",

    // Awards
    "awards.tag": "AWARDS & SERTIFIKASI",
    "awards.title": "Bukti Mutu &",
    "awards.titleOutline": "Dokumentasi",
    "awards.desc": "Dokumentasi sertifikasi kompetensi rekayasa perangkat lunak dan apresiasi kontribusi nyata.",
    "awards.zoomHint": "Klik untuk perbesar dokumen",
    "awards.viewPhoto": "Buka Foto",

    // Contact
    "contact.tag": "KONTAK & DISKUSI",
    "contact.title": "Mulai Diskusi",
    "contact.titleOutline": "Proyek Anda",
    "contact.desc": "Konsultasikan ide digital, kebutuhan teknis, anggaran, dan target waktu secara langsung dan terstruktur dalam 4 langkah mudah.",
    "contact.verifiedChannels": "Saluran Kontak Terverifikasi:",
    "contact.step1Title": "1. Jenis Proyek",
    "contact.step1Heading": "Proyek apa yang ingin kamu buat?",
    "contact.step1Desc": "Pilih kategori layanan yang paling menggambarkan rencana kebutuhan digital Anda.",
    "contact.otherTypeLabel": "Jelaskan Jenis Proyek Lainnya:",
    "contact.otherTypePlaceholder": "Contoh: Integrasi bot pesan, katalog interaktif, atau konsultasi UI",
    "contact.step2Title": "2. Ide & Kebutuhan",
    "contact.step2Heading": "Ceritakan ide proyekmu",
    "contact.step2Desc": "Bantu kami memahami gambaran, fungsi yang diharapkan, dan tujuan utama pembuatan website ini.",
    "contact.projectNameLabel": "Nama Proyek atau Bisnis",
    "contact.projectNamePlaceholder": "Contoh: Brand Fashion Kenal, Kantor Notaris XYZ, dll.",
    "contact.projectDescLabel": "Deskripsi Kebutuhan",
    "contact.projectDescPlaceholder": "Jelaskan kebutuhan utama website, konten yang ingin ditampilkan, atau masalah yang ingin diselesaikan...",
    "contact.projectGoalLabel": "Tujuan Proyek",
    "contact.projectGoalPlaceholder": "Contoh: Meningkatkan branding, konversi penjualan, profil resmi",
    "contact.extraFeaturesLabel": "Fitur Tambahan",
    "contact.extraFeaturesPlaceholder": "Contoh: Integrasi WhatsApp, formulir kustom, mode gelap",
    "contact.step3Title": "3. Rencana & Waktu",
    "contact.step3Heading": "Sesuaikan rencana proyekmu",
    "contact.step3Desc": "Informasi anggaran dan waktu membantu kami menyusun pendekatan arsitektur yang paling tepat dan realistis.",
    "contact.budgetLabel": "Perkiraan Anggaran:",
    "contact.timelineLabel": "Target Waktu Penyelesaian:",
    "contact.extraNotesLabel": "Catatan Tambahan",
    "contact.extraNotesPlaceholder": "Referensi website yang disukai, domain yang sudah dimiliki, dll.",
    "contact.step4Title": "4. Tinjau Rencana",
    "contact.step4Heading": "Periksa rencana proyekmu",
    "contact.step4Desc": "Berikut ringkasan jawaban Anda. Lengkapi nama Anda sebelum mengirim ringkasan ini ke WhatsApp Kenaltaher.",
    "contact.summaryType": "Jenis Proyek:",
    "contact.summaryName": "Nama Proyek:",
    "contact.summaryBudget": "Anggaran:",
    "contact.summaryTimeline": "Target Waktu:",
    "contact.summaryDesc": "Deskripsi Kebutuhan:",
    "contact.summaryGoal": "Tujuan Proyek:",
    "contact.summaryFeatures": "Fitur Tambahan:",
    "contact.clientNameLabel": "Nama Anda",
    "contact.clientNamePlaceholder": "Tulis nama lengkap atau panggilan Anda...",
    "contact.clientPhoneLabel": "No. WhatsApp Anda",
    "contact.clientPhonePlaceholder": "08xxxxxxxxxx",
    "contact.clientEmailLabel": "Email Anda",
    "contact.clientEmailPlaceholder": "email@anda.com",
    "contact.waTriggeredNotice": "WhatsApp Web / Aplikasi WhatsApp telah dibuka dengan pesan Anda. Jika tidak terbuka otomatis, gunakan tombol Salin Pesan di bawah untuk menyalin dan mengirimkannya secara manual.",
    "contact.btnCopy": "Salin Pesan",
    "contact.btnCopied": "Tersalin!",
    "contact.btnSendWA": "Kirim Rencana via WhatsApp",
    "contact.btnBack": "← Kembali",
    "contact.btnNext": "Lanjut →",
    "contact.errOtherType": "Silakan tuliskan jenis proyek yang Anda butuhkan.",
    "contact.errDescReq": "Deskripsi kebutuhan proyek wajib diisi.",
    "contact.errNameReq": "Nama Anda wajib diisi sebelum mengirim rencana proyek.",
    "contact.optional": "(Opsional)",
    "contact.required": "*Wajib",

    // PulseCoffee
    "coffee.label": "Beri Aku Kopi",
    "coffee.tooltip": "Beri dukungan secangkir kopi untuk Taher",
    "coffee.ariaLabel": "Beri aku kopi - jumlah dukungan saat ini: ",
    "coffee.thanks": "Terima kasih atas kopinya!",

    // Footer
    "footer.tagline": "Portofolio personal dan showcase rekayasa web Taher Daeng Matora. Membangun solusi digital yang elegan, cepat, dan berdaya guna.",
    "footer.quickLinks": "Navigasi Cepat",
    "footer.linkWork": "Karya Pilihan",
    "footer.linkArchive": "Arsip Seluruh Proyek",
    "footer.linkServices": "Layanan & Kemampuan",
    "footer.linkAbout": "Tentang Taher",
    "footer.linkExperience": "Pengalaman & Sertifikasi",
    "footer.linkContact": "Kontak & Diskusi",
    "footer.socialTitle": "Koneksi Digital Resmi",
    "footer.copyright": "Kenaltaher — Taher Daeng Matora. Hak cipta dilindungi.",
    "footer.motto": "Mengubah ide menjadi solusi digital yang fungsional, relevan, dan bermakna.",
    "backToTop.tooltip": "Kembali ke atas!",
  },
  en: {
    // Nav
    "nav.work": "Work",
    "nav.services": "What I Can Do",
    "nav.about": "About",
    "nav.awards": "Awards",
    "nav.trainings": "Trainings",
    "nav.hireMe": "Hire Me",
    "nav.contact": "Contact",

    // Intro
    "intro.greeting": "Welcome to the Kenaltaher Portfolio",
    "intro.skip": "Enter Portfolio →",

    // Hero
    "hero.badge": "AVAILABLE FOR FREELANCE & DIGITAL PROJECTS",
    "hero.role": "Web Developer & Digital Solutions",
    "hero.headline": "Crafting High-Performance & Bespoke Web Experiences",
    "hero.subheadline": "Personal engineering portfolio of Taher Daeng Matora (Kenaltaher). Blending speed, editorial design, and clean architecture.",
    "hero.ctaWork": "Explore Work",
    "hero.ctaHire": "Hire Me / Inquire",
    "hero.ctaArchive": "Open Archive →",
    "hero.experienceYears": "2+ Years Experience",
    "hero.focus": "Next.js & Modern UI",
    "hero.creatorProfile": "Creator Profile",
    "hero.creatorRole": "IT Developer & Graphic Designer",
    "hero.creatorBio": "Crafting modern websites, interactive interfaces, and distinct digital visual identities.",
    "hero.ctaDiscuss": "Start Project Discussion",

    // Featured Work
    "featured.tag": "FEATURED PROJECTS SHOWCASE",
    "featured.title": "Featured Projects",
    "featured.titleOutline": "Showcase",
    "featured.desc": "Exploration of works developed originally with modern engineering standards, high performance, and intuitive interface experience.",
    "featured.viewCaseStudy": "View Case Study",
    "featured.liveDemo": "Visit Website",
    "featured.viewAllArchive": "View All Projects",

    // Services / What I Can Do
    "services.capabilitiesTag": "MY CAPABILITIES",
    "services.title": "What I Can Do",
    "services.desc": "I combine technical, problem-solving, and digital skills to build reliable systems, test systems, manage data, and support efficient digital workflows.",
    "services.service1Title": "IT, Web Development & QA",
    "services.service1Desc": "Building and testing fast, reliable, and responsive web systems. Focusing on clean code architecture, database management, systematic bug identification, and responsive frontend interfaces.",
    "services.service1Bullet1": "Modern architecture built on Next.js, React & TypeScript",
    "services.service1Bullet2": "Responsive design across mobile, tablet, and desktop screens",
    "services.service1Bullet3": "Web performance auditing, SEO optimization, and WhatsApp CTA integration",
    "services.service1CTA": "Web Development Consultation",
    "services.service2Title": "VA & Digital Operations",
    "services.service2Desc": "Supporting seamless digital operations through accurate data management, in-depth online research, organized technical documentation, digital administration, and productive digital workflows.",
    "services.service2Bullet1": "Promotional material, banners, and digital visual branding design",
    "services.service2Bullet2": "Data management, spreadsheets, and system documentation",
    "services.service2Bullet3": "Structured workflows with version control & task tracking",
    "services.service2CTA": "Design & Digital Consultation",
    "services.scopeLabel1": "Scope & Core Stack:",
    "services.scopeLabel2": "Scope & Capabilities:",

    // About Me
    "about.tag": "ABOUT ME",
    "about.headline": "Problem Solver. Digital Generalist.",
    "about.projectsLabel": "PROJECTS",
    "about.projectsVal": "4 Projects Completed",
    "about.eduLabel": "EDUCATION",
    "about.eduVal": "Information Systems, STEKOM University",
    "about.focusLabel": "FOCUS",
    "about.focusVal": "Web Development & Digital Solutions",
    "about.bio": "I specialize in engineering modern, fast, and accessible web interfaces. Blending analytical problem-solving with keen visual design, I help clients and teams build impactful, production-ready digital solutions.",
    "about.downloadResume": "Download Resume (PDF)",
    "about.requestResume": "Request Full CV →",
    "about.currentlyTitle": "CURRENTLY",
    "about.currentlyBuildingLabel": "Building",
    "about.currentlyBuildingDesc": "Modern, responsive web applications using Next.js, React, and Tailwind CSS.",
    "about.currentlyExploringLabel": "Exploring",
    "about.currentlyExploringDesc": "Interactive UI interactions, 3D CSS perspectives, and modern TypeScript architectures.",
    "about.currentlyLearningLabel": "Learning",
    "about.currentlyLearningDesc": "Cloud deployment pipelines, backend API integrations, and ongoing web performance tuning.",
    "about.traitsTitle": "PERSONAL TRAITS",
    "about.traitCreative": "Creative",
    "about.traitCreativeDesc": "Bringing fresh visual perspectives and creative design solutions to every project.",
    "about.traitAdaptable": "Adaptable",
    "about.traitAdaptableDesc": "Swiftly adjusting to new technologies, modern toolchains, and collaborative workflows.",
    "about.traitProblemSolver": "Problem Solver",
    "about.traitProblemSolverDesc": "Targeting core root problems to deliver reliable, robust, and clean technical solutions.",
    "about.traitProfessional": "Professional Trait",
    "about.selectTrait": "Select Trait:",
    "about.viewTrait": "View trait #",

    // Experience / Trainings
    "trainings.tag": "TRAININGS & EXPERIENCE",
    "trainings.title": "Professional",
    "trainings.titleOutline": "Journey",
    "trainings.desc": "Verified track record of web engineering projects, technical trainings, and digital initiatives.",
    "trainings.skillCategoriesLabel": "Skill Areas & Tech Stack:",

    // Awards
    "awards.tag": "AWARDS & CERTIFICATES",
    "awards.title": "Verified Quality &",
    "awards.titleOutline": "Documentation",
    "awards.desc": "Official software engineering certifications and recognition for digital contributions.",
    "awards.zoomHint": "Click to enlarge document",
    "awards.viewPhoto": "View Photo",

    // Contact
    "contact.tag": "CONTACT & INQUIRIES",
    "contact.title": "Let's Discuss",
    "contact.titleOutline": "Your Project",
    "contact.desc": "Consult your digital ideas, technical specifications, budget, and delivery timeline directly and systematically in 4 easy steps.",
    "contact.verifiedChannels": "Verified Contact Channels:",
    "contact.step1Title": "1. Project Type",
    "contact.step1Heading": "What kind of project do you want to build?",
    "contact.step1Desc": "Select the service category that best describes your digital plan.",
    "contact.otherTypeLabel": "Describe Other Project Type:",
    "contact.otherTypePlaceholder": "E.g.: Chatbot integration, interactive catalog, or UI consultation",
    "contact.step2Title": "2. Ideas & Scope",
    "contact.step2Heading": "Tell us about your project idea",
    "contact.step2Desc": "Help us understand your vision, desired functionality, and the primary objective of this website.",
    "contact.projectNameLabel": "Project or Business Name",
    "contact.projectNamePlaceholder": "E.g.: Kenal Fashion Brand, XYZ Law Firm, etc.",
    "contact.projectDescLabel": "Scope & Requirements",
    "contact.projectDescPlaceholder": "Describe key website needs, content you wish to showcase, or problems to solve...",
    "contact.projectGoalLabel": "Project Objective",
    "contact.projectGoalPlaceholder": "E.g.: Brand awareness, sales conversion, official web presence",
    "contact.extraFeaturesLabel": "Additional Features",
    "contact.extraFeaturesPlaceholder": "E.g.: WhatsApp integration, custom inquiry form, dark mode",
    "contact.step3Title": "3. Budget & Timeline",
    "contact.step3Heading": "Define your project scope",
    "contact.step3Desc": "Budget and timeline expectations help us structure the most suitable and realistic technical approach.",
    "contact.budgetLabel": "Estimated Budget:",
    "contact.timelineLabel": "Target Delivery Time:",
    "contact.extraNotesLabel": "Additional Notes",
    "contact.extraNotesPlaceholder": "Website references you like, pre-purchased domain name, etc.",
    "contact.step4Title": "4. Review Plan",
    "contact.step4Heading": "Review your project plan",
    "contact.step4Desc": "Here is a summary of your answers. Please fill in your name before sending this summary to Kenaltaher's WhatsApp.",
    "contact.summaryType": "Project Type:",
    "contact.summaryName": "Project Name:",
    "contact.summaryBudget": "Budget:",
    "contact.summaryTimeline": "Target Delivery:",
    "contact.summaryDesc": "Requirements Description:",
    "contact.summaryGoal": "Project Objective:",
    "contact.summaryFeatures": "Additional Features:",
    "contact.clientNameLabel": "Your Name",
    "contact.clientNamePlaceholder": "Enter your full name or nickname...",
    "contact.clientPhoneLabel": "Your WhatsApp Number",
    "contact.clientPhonePlaceholder": "08xxxxxxxxxx",
    "contact.clientEmailLabel": "Your Email",
    "contact.clientEmailPlaceholder": "email@example.com",
    "contact.waTriggeredNotice": "WhatsApp Web / Application has been opened with your message. If it did not open automatically, use the Copy Message button below to copy and send manually.",
    "contact.btnCopy": "Copy Message",
    "contact.btnCopied": "Copied!",
    "contact.btnSendWA": "Send Plan via WhatsApp",
    "contact.btnBack": "← Back",
    "contact.btnNext": "Next →",
    "contact.errOtherType": "Please specify the project type you need.",
    "contact.errDescReq": "Project requirements description is required.",
    "contact.errNameReq": "Your name is required before sending the project plan.",
    "contact.optional": "(Optional)",
    "contact.required": "*Required",

    // PulseCoffee
    "coffee.label": "Get me a coffee",
    "coffee.tooltip": "Support Taher with a cup of coffee",
    "coffee.ariaLabel": "Get me a coffee - current supporters count: ",
    "coffee.thanks": "Thank you for the coffee!",

    // Footer
    "footer.tagline": "Personal portfolio and web engineering showcase of Taher Daeng Matora. Crafting elegant, fast, and purposeful digital solutions.",
    "footer.quickLinks": "Quick Navigation",
    "footer.linkWork": "Featured Work",
    "footer.linkArchive": "Full Projects Archive",
    "footer.linkServices": "Services & Capabilities",
    "footer.linkAbout": "About Taher",
    "footer.linkExperience": "Experience & Certifications",
    "footer.linkContact": "Contact & Inquiries",
    "footer.socialTitle": "Official Digital Channels",
    "footer.copyright": "Kenaltaher — Taher Daeng Matora. All rights reserved.",
    "footer.motto": "Transforming ideas into functional, relevant, and meaningful digital solutions.",
    "backToTop.tooltip": "Back to top!",
  },
};

const LanguageThemeContext = createContext<LanguageThemeContextType | undefined>(undefined);

export function LanguageThemeProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("kenaltaher_lang") as Language | null;
      if (savedLang === "id" || savedLang === "en") return savedLang;
    }
    return "id";
  });

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("kenaltaher_theme") as Theme | null;
      if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        localStorage.setItem("kenaltaher_theme", next);
      }
      return next;
    });
  };

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("kenaltaher_lang", newLang);
    }
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations["id"]?.[key] || key;
  };

  return (
    <LanguageThemeContext.Provider value={{ lang, setLang: handleSetLang, theme, toggleTheme, t }}>
      {children}
    </LanguageThemeContext.Provider>
  );
}

export function useLanguageTheme() {
  const context = useContext(LanguageThemeContext);
  if (!context) {
    throw new Error("useLanguageTheme must be used within a LanguageThemeProvider");
  }
  return context;
}
