# Kenaltaher — Personal Portfolio Website

Website portofolio personal milik **Taher Daeng Matora** untuk menampilkan kapabilitas rekayasa web, showcase proyek interaktif, penawaran layanan, pengalaman profesional, pencapaian, dan jalur kontak langsung.

> **Status:** Selesai (Fase 1 s.d. Fase 4 sesuai spesifikasi [Kenaltaher_PRD.md](../Kenaltaher_PRD.md))  
> **Pemilik:** Taher Daeng Matora  
> **Brand:** Kenaltaher  
> **Referensi Desain:** Richard Miculob Portfolio  
> **Elemen Khas:** Maskot Kenaltaher (K-Bot) terinspirasi huruf K

---

## 🚀 Fitur Utama Berdasarkan Fase

### Fase 1 — Beranda & Karya Pilihan
- **Hero Editorial:** Headline berbobot dengan tipografi modern, badge status ketersediaan kerja, dan introduksi Taher Daeng Matora.
- **Continuous Marquee:** Animasi teks berjalan kontinu ("TAHER DAENG MATORA • KENALTAHER • WEB DEVELOPER") dengan outline typography dan loop mulus tanpa horizontal overflow.
- **Maskot Kenaltaher:** Komponen vektor SVG interaktif berbentuk huruf 'K' dengan bubble sapaan ramah dan efek hover responsif.
- **3D Coverflow Carousel:** Showcase karya pilihan interaktif dengan rotasi perspektif 3D, kontrol prev/next, navigasi keyboard (panah kiri/kanan), dukungan gesture swipe sentuhan, serta sinkronisasi otomatis informasi proyek aktif.
- **Tautan Cepat:** Menuju studi kasus detail maupun arsip seluruh karya.

### Fase 2 — Arsip, Tentang Saya, Layanan & Kemampuan
- **Halaman Arsip (`/work`):** Menampilkan seluruh katalog proyek berbasis data terstruktur dengan sistem filter kategori (*Web Development, Landing Page, Web Application, UI/UX & Frontend*).
- **Empty State yang Terkelola:** Pesan informatif dan tombol reset apabila kategori filter tidak menghasilkan data.
- **Studi Kasus Detail (`/work/[slug]`):** Halaman dinamis dengan ringkasan (*overview*), tantangan teknis (*challenges*), solusi (*solutions*), fitur kunci (*key features*), dan *deliverables*.
- **Tentang Saya:** Bio profesional, potret ilustratif, fakta kunci (*Key Facts*), dan 4 tahapan metodologi kerja (*Working Approach*).
- **Layanan & Kemampuan:** Kartu layanan spesifik dengan deliverables jelas dan CTA WhatsApp terkontekstualisasi, serta direktori keahlian/teknologi yang terverifikasi.

### Fase 3 — Pengalaman, Pencapaian, Kontak & Sosial
- **Riwayat Pengalaman:** Timeline rekam jejak profesional yang terverifikasi.
- **Galeri Pencapaian & Sertifikasi:** Kartu dokumentasi dengan modal Lightbox interaktif untuk perbesaran visual dokumen.
- **Kanal Kontak Langsung:** Tautan langsung WhatsApp, Email, GitHub, LinkedIn, dan Instagram tanpa perantara form dummy/fiktif.
- **Generator Pesan Instan:** Pembuat template pesan WhatsApp & Email otomatis untuk mempermudah calon klien memulai diskusi.
- **Dokumen Resume:** Status ketersediaan resume yang transparan dan dapat diminta langsung.

### Fase 4 — Aksesibilitas, SEO, dan Kenyamanan
- **Navigasi Floating Translucent:** Navbar modern dengan glassmorphism, indikator scroll, dan mobile drawer menu.
- **Tombol Back-to-Top:** Floating button yang muncul saat halaman digulir dan memberikan smooth scroll ke atas.
- **Dukungan Reduced Motion:** Animasi dan marquee menghormati preferensi `@media (prefers-reduced-motion)`.
- **SEO & Metadata:** Title tag terstruktur, meta description, OpenGraph tags, semantic HTML (`h1` hierarkis), dan viewport tags.

---

## 🛠️ Stack Teknologi

- **Framework:** Next.js (App Router, Turbopack)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS & Vanilla CSS Design Tokens
- **Ikon:** Lucide Icons & Custom SVG Brand Icons
- **Data Source:** File data modular terstruktur di `src/data/` (tanpa dependensi database/CMS untuk MVP)

---

## 📁 Struktur Proyek

```text
kenaltaher-portfolio/
├── public/
│   ├── images/              # Aset visual mockup proyek, sertifikat, & potret
│   └── mascot/              # Maskot SVG Kenaltaher
├── src/
│   ├── app/
│   │   ├── globals.css      # Design tokens, keyframe marquee, reduced motion
│   │   ├── layout.tsx       # Root layout & SEO Metadata
│   │   ├── page.tsx         # Halaman utama (Fase 1 - 4)
│   │   └── work/
│   │       ├── page.tsx     # Arsip proyek & filter kategori
│   │       └── [slug]/
│   │           └── page.tsx # Detail studi kasus proyek
│   ├── components/
│   │   ├── mascot/          # Komponen interaktif maskot
│   │   ├── navigation/      # Floating Navbar & Footer
│   │   ├── projects/        # 3D Coverflow Carousel, ProjectCard, Filter
│   │   ├── sections/        # Hero, About, Services, Experience, Achievements, Contact
│   │   └── ui/              # LightboxModal, BackToTop, Icons
│   ├── data/                # Data proyek, layanan, skills, pengalaman, profil
│   └── types/               # TypeScript interfaces
```

---

## 💻 Menjalankan Proyek

1. **Instalasi Dependensi:**
   ```bash
   npm install
   ```

2. **Menjalankan Dev Server:**
   ```bash
   npm run dev
   ```
   Akses di `http://localhost:3000`.

3. **Production Build:**
   ```bash
   npm run build
   ```

4. **Menjalankan Production Server:**
   ```bash
   npm run start
   ```

---

## 📝 Menambahkan Proyek Baru

Untuk menambahkan proyek baru tanpa membongkar susunan halaman, cukup tambahkan objek proyek pada array `projectsData` di file [`src/data/projects.ts`](src/data/projects.ts) sesuai antarmuka `Project` di [`src/types/index.ts`](src/types/index.ts). Proyek baru akan secara otomatis muncul di beranda dan arsip `/work`.
