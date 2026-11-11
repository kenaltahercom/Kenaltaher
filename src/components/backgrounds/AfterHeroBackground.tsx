"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

// Dynamic import — WebGL canvas, no SSR
const Particles = dynamic(() => import("@/components/ui/Particles"), {
  ssr: false,
});

/**
 * Ambient particle background for all sections below Hero.
 * Uses sticky top-0 h-screen inside an absolute container that spans all after-hero sections.
 * This guarantees:
 * 1. Only visible on slides/sections below Hero (Hero remains dedicated to GlowCursor).
 * 2. Canvas renders at viewport size (h-screen), optimal for WebGL performance.
 * 3. Transparent WebGL blending so it doesn't cause white screen issues.
 */
export default function AfterHeroBackground() {
  const { theme } = useLanguageTheme();
  const isDark = theme === "dark";

  // Dark mode: pure white & subtle violet-tinted stars. Light mode: subtle dark ink stars.
  const darkColors = ["#ffffff", "#f1f5f9", "#e2e8f0", "#c7d2fe", "#a5b4fc"];
  const lightColors = ["#334155", "#475569", "#6366f1", "#4f46e5", "#1e293b"];

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none z-0"
    >
      {/* Sticky viewport-sized particles canvas pinned while scrolling through after-hero sections */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Particles
          key={theme}
          particleColors={isDark ? darkColors : lightColors}
          particleCount={4000}
          particleSpread={30}
          speed={0.14}
          particleBaseSize={100}
          glow={isDark ? 0.3 : 0.15}
          twinkle={0.2}
          moveParticlesOnHover={false}
          hoverEffect="attract"
          sizeRandomness={0.6}
          shape="sparkle"
          depthOfField={1}
          connections={true}
          connectionDistance={130}
          alphaParticles
          cameraDistance={12}
          variation={20}
          opacity={isDark ? 0.8 : 0.55}
          lightMode={!isDark}
          className="w-full h-full"
        />
      </div>

      {/* Subtle ambient gradient depth glows */}
      <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-indigo-600/[0.04] dark:bg-indigo-600/[0.06] rounded-full blur-[140px]" />
      <div className="absolute top-[40%] left-[5%] w-[450px] h-[450px] bg-sky-600/[0.03] dark:bg-sky-600/[0.04] rounded-full blur-[130px]" />
      <div className="absolute top-[75%] right-[10%] w-[550px] h-[550px] bg-purple-600/[0.03] dark:bg-purple-600/[0.04] rounded-full blur-[150px]" />
    </div>
  );
}
