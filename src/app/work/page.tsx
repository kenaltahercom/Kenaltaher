"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilter from "@/components/projects/ProjectFilter";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { LanguageThemeProvider } from "@/context/LanguageThemeContext";
import { ArrowLeft, Layers, FolderX } from "lucide-react";

export default function WorkArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = useMemo(() => {
    const rawCategories = Array.from(new Set(projectsData.map((p) => p.category)));
    return ["Semua", ...rawCategories];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "Semua") {
      return projectsData;
    }
    return projectsData.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <LanguageThemeProvider>
      <div
        className="min-h-screen flex flex-col transition-colors duration-300"
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        <Navbar />

        <main className="flex-1 pt-32 sm:pt-40 pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Breadcrumb / Back Navigation */}
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Beranda</span>
              </Link>
            </div>

            {/* Archive Header */}
            <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-500 dark:text-indigo-400 mb-4">
                <Layers className="w-3.5 h-3.5" />
                <span>ARSIP PROYEK LENGKAP</span>
              </div>

              <h1 className="section-headline-gallery mb-4">
                Semua Karya &amp; Eksplorasi
              </h1>

              <p className="max-w-xl section-desc-gallery">
                Daftar komprehensif karya rekayasa web, implementasi antarmuka, dan solusi digital yang dikembangkan oleh Taher Daeng Matora.
              </p>
            </div>

            {/* Category Filter */}
            <ProjectFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Project Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            ) : (
              /* Well-Designed Empty State */
              <div className="glass-panel rounded-2xl p-12 text-center max-w-md mx-auto border border-slate-200 dark:border-white/10 my-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mx-auto mb-4 text-slate-500">
                  <FolderX className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Tidak Ada Proyek Ditemukan
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
                  Belum ada item dalam kategori &ldquo;{selectedCategory}&rdquo;. Anda dapat memilih kategori lain atau kembali menampilkan semua karya.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("Semua")}
                  className="px-5 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-xs transition-colors hover:opacity-90"
                >
                  Tampilkan Semua Karya
                </button>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </LanguageThemeProvider>
  );
}
