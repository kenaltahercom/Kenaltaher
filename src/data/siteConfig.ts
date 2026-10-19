import { SiteSettings, ContactChannel, Profile } from "@/types";

export const siteConfig: SiteSettings = {
  brandName: "Kenaltaher",
  ownerName: "Taher Daeng Matora",
  tagline: "Building High-Performance Websites & Bespoke Digital Solutions",
  metaDescription: "Portofolio personal Taher Daeng Matora (Kenaltaher) — Web Developer yang berfokus membangun website modern, berperforma tinggi, dan interaktif.",
  mascotAssetPath: "/mascot/kenaltaher-mascot.svg",
  resumePath: "/resume-taher-daeng-matora.pdf",
  resumeAvailable: false, // Flag accurately set to false until final verified resume is provided
};

export const profileData: Profile = {
  name: "Taher Daeng Matora",
  role: "Web Developer & Digital Solutions Specialist",
  tagline: "Mengubah ide dan kebutuhan bisnis menjadi pengalaman web yang cepat, elegan, dan fungsional.",
  bio: [
    "Saya adalah seorang Web Developer dengan fokus pada pengembangan antarmuka modern yang cepat, estetis, dan mudah diakses. Mengembangkan website dari nol dengan arsitektur bersih adalah standar kerja saya.",
    "Bagi saya, website bukan sekadar halaman statis, melainkan representasi identitas digital yang harus memberi dampak nyata—baik dalam hal kecepatan muat, kenyamanan navigasi, maupun kejelasan informasi bagi calon klien.",
  ],
  portrait: "/images/profile-portrait.svg",
  location: "Indonesia",
  availability: "Terbuka untuk proyek freelance, kontrak website, dan kolaborasi profesional.",
  facts: [
    {
      label: "Fokus Utama",
      value: "Modern Web & UI",
      description: "Next.js, React, Tailwind CSS, dan arsitektur frontend berperforma tinggi.",
    },
    {
      label: "Prinsip Kode",
      value: "Clean & Maintainable",
      description: "Struktur data terpusat, modularitas komponen, dan bebas kode berulang.",
    },
    {
      label: "Pengalaman Pengguna",
      value: "Speed & Accessibility",
      description: "Responsif di semua perangkat, ramah reduced motion, dan navigasi intuitif.",
    },
  ],
  workingApproach: [
    {
      number: "01",
      title: "Discovery & Kebutuhan",
      description: "Membedah tujuan bisnis, audiens target, dan struktur konten utama agar solusi tepat sasaran.",
    },
    {
      number: "02",
      title: "Desain Sistem & Prototyping",
      description: "Menyusun hierarki tipografi, palet warna berkarakter, dan komposisi layout interaktif.",
    },
    {
      number: "03",
      title: "Rekayasa & Optimasi Kode",
      description: "Membangun dengan teknologi web modern, arsitektur data terstruktur, dan validasi fungsional.",
    },
    {
      number: "04",
      title: "Pengujian & Delivery",
      description: "Audit responsivitas lintas perangkat, pengujian performa, dan serah terima terdokumentasi.",
    },
  ],
};

export const contactChannels: ContactChannel[] = [
  {
    channel: "WhatsApp",
    label: "WhatsApp",
    value: "+62 822-xxxx-xxxx",
    url: "https://wa.me/6282200000000?text=Halo%20Taher,%20saya%20tertarik%20untuk%20mendiskusikan%20proyek%20website",
    enabled: true,
    isPrimary: true,
  },
  {
    channel: "Email",
    label: "Email",
    value: "taherdaengmatora@gmail.com",
    url: "mailto:taherdaengmatora@gmail.com?subject=Inquiry%20Proyek%20Website%20-%20Kenaltaher",
    enabled: true,
    isPrimary: true,
  },
  {
    channel: "GitHub",
    label: "GitHub",
    value: "github.com/kenaltaher",
    url: "https://github.com/kenaltaher",
    enabled: true,
  },
  {
    channel: "LinkedIn",
    label: "LinkedIn",
    value: "linkedin.com/in/taher-daeng-matora",
    url: "https://linkedin.com/in/taher-daeng-matora",
    enabled: true,
  },
  {
    channel: "Instagram",
    label: "Instagram",
    value: "@kenaltaher",
    url: "https://instagram.com/kenaltaher",
    enabled: true,
  },
];
