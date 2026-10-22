"use client";

import { useEffect } from "react";

interface IntroMascotProps {
  onComplete?: () => void;
}

/**
 * Opening mascot sequence removed per revision requirement (Tahap 2.2).
 * Visitors immediately access Hero Section with zero delay or blank screen.
 */
export default function IntroMascot({ onComplete }: IntroMascotProps) {
  useEffect(() => {
    if (onComplete) onComplete();
  }, [onComplete]);

  return null;
}
