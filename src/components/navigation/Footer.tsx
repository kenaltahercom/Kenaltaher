"use client";

import React, { useState } from "react";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import InteractiveWordmark from "@/components/ui/InteractiveWordmark";
import BubbleMenu, { MenuItem } from "@/components/ui/BubbleMenu";
import { contactConfig } from "@/config/contact";

export default function Footer() {
  const { theme, lang } = useLanguageTheme();
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);

  // Menu items specified by user: Home, Wa, Ig, Project, dan gmail
  const bubbleMenuItems: MenuItem[] = [
    {
      label: "Home",
      href: "/",
      ariaLabel: "Home",
      rotation: -6,
      hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" },
    },
    {
      label: "Wa",
      href: contactConfig.whatsappUrl,
      target: "_blank",
      ariaLabel: "WhatsApp",
      rotation: 6,
      hoverStyles: { bgColor: "#22c55e", textColor: "#ffffff" },
    },
    {
      label: "Ig",
      href: contactConfig.instagramUrl,
      target: "_blank",
      ariaLabel: "Instagram",
      rotation: -5,
      hoverStyles: { bgColor: "#ec4899", textColor: "#ffffff" },
    },
    {
      label: "Project",
      href: "/#work",
      ariaLabel: "Project",
      rotation: 6,
      hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" },
    },
    {
      label: "Gmail",
      href: `mailto:${contactConfig.email}`,
      ariaLabel: "Gmail",
      rotation: -6,
      hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" },
    },
  ];

  return (
    <footer className="relative bg-transparent pt-6 sm:pt-10 pb-8 sm:pb-14 transition-colors duration-300 overflow-hidden">
      {/* Centered Bubble Menu container located directly in the space above wordmark */}
      <div className="relative w-full max-w-4xl mx-auto h-[100px] sm:h-[120px] flex items-center justify-center mb-2">
        <BubbleMenu
          items={bubbleMenuItems}
          isOpen={isBubbleMenuOpen}
          onClose={() => setIsBubbleMenuOpen(false)}
          showNav={false}
          variant="footer"
          menuBg={theme === "light" ? "#ffffff" : "#18181b"}
          menuContentColor={theme === "light" ? "#09090b" : "#ffffff"}
          animationEase="back.out(1.5)"
          animationDuration={0.45}
          staggerDelay={0.08}
        />

        {/* Subtle Hint above wordmark when menu is closed */}
        {!isBubbleMenuOpen && (
          <div className="text-center opacity-40 hover:opacity-80 transition-opacity duration-300">
            <button
              type="button"
              onClick={() => setIsBubbleMenuOpen(true)}
              className="text-[11px] sm:text-xs font-mono tracking-wider text-slate-500 dark:text-slate-400 hover:text-indigo-400 flex items-center gap-1.5 mx-auto"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>
                {lang === "en"
                  ? "Click 'K' below for quick menu"
                  : "Klik huruf 'K' di bawah untuk menu"}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Full-Bleed Interactive Metallic Spotlight Wordmark */}
      <div className="w-full">
        <InteractiveWordmark
          text="Kenaltaher"
          theme={theme === "light" ? "light" : "dark"}
          onKClick={() => setIsBubbleMenuOpen((prev) => !prev)}
          isKActive={isBubbleMenuOpen}
        />
      </div>
    </footer>
  );
}
