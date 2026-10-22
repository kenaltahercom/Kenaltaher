import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedSection from "@/components/sections/FeaturedSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ContactSection from "@/components/sections/ContactSection";
import BackToTop from "@/components/ui/BackToTop";
import AfterHeroBackground from "@/components/backgrounds/AfterHeroBackground";
import { LanguageThemeProvider } from "@/context/LanguageThemeContext";
import { projectsData } from "@/data/projects";

export default function HomePage() {
  return (
    <LanguageThemeProvider>
      <div
        className="min-h-screen flex flex-col transition-colors duration-300 selection:bg-indigo-600 selection:text-white"
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        {/* Translucent Floating Navbar */}
        <Navbar />

        <main className="flex-1 w-full">
          {/* Hero Section dengan Foto Asli Transparan Taher dan Marquee di Belakangnya */}
          <HeroSection />

          {/* After-Hero sections with static ambient depth */}
          <div className="relative">
            {/* Static ambient background layer behind content */}
            <AfterHeroBackground />

            {/* All sections below Hero */}
            <div className="relative" style={{ zIndex: 1 }}>
              {/* Showcase Proyek Unggulan with Autoplay 3D Gallery */}
              <FeaturedSection projects={projectsData} />

              {/* What I Can Do / Services & Skills */}
              <ServicesSection />

              {/* About Taher Daeng Matora with Authentic Portrait */}
              <AboutSection />

              {/* Experience / Trainings */}
              <ExperienceSection />

              {/* Awards & Documentation with Lightbox */}
              <AchievementsSection />

              {/* Contact & Instant Messaging */}
              <ContactSection />
            </div>
          </div>
        </main>

        {/* Back to Top Floating Button */}
        <BackToTop />

        {/* Footer */}
        <Footer />
      </div>
    </LanguageThemeProvider>
  );
}

