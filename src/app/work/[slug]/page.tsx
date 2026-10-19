import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { LanguageThemeProvider } from "@/context/LanguageThemeContext";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const caseStudy = project.caseStudy;

  return (
    <LanguageThemeProvider>
      <div
        className="min-h-screen flex flex-col transition-colors duration-300"
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        <Navbar />

        <main className="flex-1 pt-32 sm:pt-40 pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Back Navigation */}
            <div className="mb-8 flex items-center justify-between">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Arsip Karya</span>
              </Link>

              <span className="text-xs font-mono text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                {project.category}
              </span>
            </div>

            {/* Project Title Header */}
            <div className="mb-10">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
                {project.title}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                {project.summary}
              </p>

              {/* Metadata Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-white/5">
                <div>
                  <span className="text-xs font-mono text-slate-500 block mb-1">Peran</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{project.role}</span>
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 block mb-1">Tahun</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{project.year}</span>
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 block mb-1">Kategori</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{project.category}</span>
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 block mb-1">Status</span>
                  <span className="text-sm font-semibold text-emerald-500 dark:text-emerald-400">Rilis Publik</span>
                </div>
              </div>
            </div>

            {/* Project Featured Image */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden glass-panel border border-slate-200 dark:border-white/10 shadow-2xl mb-12 bg-slate-900">
              <Image
                src={project.image}
                alt={`Studi kasus ${project.title}`}
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 850px"
                className="object-cover"
              />
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4 mb-16 pb-8 border-b border-slate-200 dark:border-white/5">
              {project.projectUrl && project.projectUrl !== "#" && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-colors shadow-lg"
                >
                  <span>Kunjungi Website Live</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl glass-panel hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white font-medium text-sm flex items-center gap-2 border border-slate-300 dark:border-white/10 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Lihat Repository</span>
                </a>
              )}

              <Link
                href="/#contact"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-2 transition-colors ml-auto shadow-md shadow-indigo-600/20"
              >
                <span>Diskusikan Proyek Serupa</span>
              </Link>
            </div>

            {/* Detailed Case Study Content */}
            {caseStudy ? (
              <div className="space-y-12">
                {/* Overview */}
                <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Gambaran Umum &amp; Konteks Proyek
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {caseStudy.overview}
                  </p>
                </div>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-panel p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 dark:bg-rose-950/10">
                    <h3 className="text-lg font-bold text-rose-600 dark:text-rose-300 mb-3">
                      Tantangan Teknis
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {caseStudy.challenge}
                    </p>
                  </div>

                  <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/10">
                    <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-300 mb-3">
                      Solusi Rekayasa
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {caseStudy.solution}
                    </p>
                  </div>
                </div>

                {/* Key Features */}
                {caseStudy.keyFeatures && (
                  <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
                      Fitur Kunci &amp; Kapabilitas
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {caseStudy.keyFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deliverables */}
                {caseStudy.deliverables && (
                  <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      Deliverables &amp; Hasil Akhir
                    </h2>
                    <ul className="space-y-2.5">
                      {caseStudy.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="glass-panel p-8 rounded-2xl text-center text-slate-500 text-sm">
                Studi kasus detail sedang dalam penyusunan dokumentasi lanjutan.
              </div>
            )}

            {/* Technology Badges Full */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/5">
              <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4">
                Teknologi &amp; Alat yang Digunakan:
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </LanguageThemeProvider>
  );
}
