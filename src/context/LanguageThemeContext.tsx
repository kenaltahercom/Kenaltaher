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
    "services.service2Title": "VA & Digital Operations",
    "services.service2Desc": "Mendukung kelancaran operasional digital melalui pengelolaan data yang akurat, riset online mendalam, penyusunan dokumentasi teknis rapi, administrasi digital, dan alur kerja produktif yang terstruktur.",

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

    // Experience / Trainings
    "trainings.tag": "TRAININGS & PENGALAMAN",
    "trainings.title": "Perjalanan",
    "trainings.titleOutline": "Profesional",
    "trainings.desc": "Rekam jejak pengerjaan proyek rekayasa web, pelatihan, dan kolaborasi digital.",

    // Awards
    "awards.tag": "AWARDS & SERTIFIKASI",
    "awards.title": "Bukti Mutu &",
    "awards.titleOutline": "Dokumentasi",
    "awards.desc": "Dokumentasi sertifikasi kompetensi rekayasa perangkat lunak dan apresiasi kontribusi nyata.",
    "awards.zoomHint": "Klik untuk perbesar dokumen",

    // Contact
    "contact.tag": "KONTAK & DISKUSI",
    "contact.title": "Mulai Diskusi",
    "contact.titleOutline": "Proyek Anda",
    "contact.desc": "Punya ide website atau ingin berkonsultasi? Hubungi langsung melalui kanal resmi di bawah.",
    "contact.verifiedChannels": "Kanal Terverifikasi:",
    "contact.sendMessage": "Kirim Pesan Langsung",
    "contact.sendSubtitle": "Isi form berikut untuk membuat pesan terstruktur yang langsung diarahkan ke WhatsApp atau Email saya.",
    "contact.nameLabel": "Nama Anda / Perusahaan",
    "contact.categoryLabel": "Kategori Kebutuhan Proyek",
    "contact.messageLabel": "Ringkasan Ide / Rencana",
    "contact.btnWhatsApp": "Kirim via WhatsApp",
    "contact.btnEmail": "Kirim via Email",
    "contact.fastNote": "Pesan langsung terhubung ke kontak pribadi Taher.",
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

    // Featured Work
    "featured.tag": "SHOWCASE PROYEK UNGGULAN",
    "featured.title": "Showcase of",
    "featured.titleOutline": "Key Projects",
    "featured.desc": "Exploration of works developed originally with modern engineering standards, high performance, and intuitive interface experience.",
    "featured.viewCaseStudy": "View Case Study",
    "featured.liveDemo": "Visit Website",
    "featured.viewAllArchive": "Lihat Seluruh Karya",

    // Services / What I Can Do
    "services.capabilitiesTag": "MY CAPABILITIES",
    "services.title": "What I Can Do",
    "services.desc": "I combine technical, problem-solving, and digital skills to build reliable systems, test systems, manage data, and support efficient digital workflows.",
    "services.service1Title": "IT, Web Development & QA",
    "services.service1Desc": "Building and testing fast, reliable, and responsive web systems. Focusing on clean code architecture, database management, systematic bug identification, and responsive frontend interfaces.",
    "services.service2Title": "VA & Digital Operations",
    "services.service2Desc": "Supporting seamless digital operations through accurate data management, in-depth online research, organized technical documentation, digital administration, and productive digital workflows.",

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

    // Experience / Trainings
    "trainings.tag": "TRAININGS & EXPERIENCE",
    "trainings.title": "Professional",
    "trainings.titleOutline": "Journey",
    "trainings.desc": "Verified track record of web engineering projects, technical trainings, and digital initiatives.",

    // Awards
    "awards.tag": "AWARDS & CERTIFICATES",
    "awards.title": "Verified Quality &",
    "awards.titleOutline": "Documentation",
    "awards.desc": "Official software engineering certifications and recognition for digital contributions.",
    "awards.zoomHint": "Click to enlarge document",

    // Contact
    "contact.tag": "CONTACT & INQUIRIES",
    "contact.title": "Let's Discuss",
    "contact.titleOutline": "Your Project",
    "contact.desc": "Have a website idea or need digital consultation? Reach out directly through the official channels below.",
    "contact.verifiedChannels": "Verified Channels:",
    "contact.sendMessage": "Send Direct Message",
    "contact.sendSubtitle": "Fill in the details below to generate a formatted message directly sent to my WhatsApp or Email.",
    "contact.nameLabel": "Your Name / Organization",
    "contact.categoryLabel": "Project Scope Category",
    "contact.messageLabel": "Brief Idea / Requirements",
    "contact.btnWhatsApp": "Send via WhatsApp",
    "contact.btnEmail": "Send via Email",
    "contact.fastNote": "Messages directly reach Taher's personal device with zero delay.",
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
    return translations[lang][key] || key;
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
