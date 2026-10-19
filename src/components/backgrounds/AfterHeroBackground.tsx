"use client";

import dynamic from "next/dynamic";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

/* Galaxy is heavy (WebGL) – load only on client, no SSR */
const Galaxy = dynamic(() => import("./Galaxy"), { ssr: false });

/**
 * AfterHeroBackground
 *
 * Renders a full-height positional container that sits behind all
 * section content (z-index: 0 / -1). Inside it, Galaxy is rendered
 * only when Dark Mode is active. In Light Mode the container is
 * completely empty – no canvas, no RAF, no GPU work.
 *
 * Usage in page.tsx:
 *   Wrap the after-hero section group with a relative container
 *   and place <AfterHeroBackground /> as the first child.
 */
export default function AfterHeroBackground() {
  const { theme } = useLanguageTheme();
  const isDark = theme === "dark";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {isDark && (
        <Galaxy
          density={1}
          glowIntensity={0.3}
          flareIntensity={1}
          starSpeed={0.5}
          mouseRepulsion
          clickWarp
          starColors={[]}
          hueShift={140}
          saturation={0}
          starSize={1}
          twinkleIntensity={0.3}
          speed={1}
          rotationSpeed={0.1}
          layers={4}
          direction="forward"
          repulsionStrength={2}
          mouseInteraction
          intro
          lightMode={false}
        />
      )}
    </div>
  );
}

