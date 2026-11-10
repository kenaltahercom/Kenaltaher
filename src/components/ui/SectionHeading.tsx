"use client";

import React from "react";
import TrueFocus from "./TrueFocus";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

interface SectionHeadingProps {
  sentence: string;
  className?: string;
  blurAmount?: number;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  focusStyle?: "brackets" | "box" | "underline" | "highlight";
}

export default function SectionHeading({
  sentence,
  className = "",
  blurAmount = 4,
  animationDuration = 0.5,
  pauseBetweenAnimations = 1.5,
  focusStyle = "brackets",
}: SectionHeadingProps) {
  const { theme } = useLanguageTheme();
  const isDark = theme === "dark";

  return (
    <h2
      className={`section-headline-gallery ${className}`}
      style={{ display: "block" }}
    >
      <TrueFocus
        sentence={sentence}
        manualMode={false}
        focusStyle={focusStyle}
        easing="smooth"
        order="sequential"
        blurAmount={blurAmount}
        focusScale={1}
        unfocusedOpacity={0.75}
        borderColor={isDark ? "#ffffff" : "#0f172a"}
        highlightColor={isDark ? "#ffffff" : "#0f172a"}
        cornerSize={14}
        borderWidth={2}
        animationDuration={animationDuration}
        pauseBetweenAnimations={pauseBetweenAnimations}
      />
    </h2>
  );
}
