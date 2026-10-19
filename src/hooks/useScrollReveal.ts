"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollRevealOptions {
  /** Threshold to trigger (0-1). Default 0.12 */
  threshold?: number;
  /** Root margin. Default "-40px 0px" */
  rootMargin?: string;
  /** Only trigger once? Default true */
  once?: boolean;
}

/**
 * Hook that tracks whether an element has entered the viewport.
 * Returns a ref to attach and a boolean `isVisible`.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.12, rootMargin = "-40px 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: always show immediately
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

/**
 * Generates a stagger delay style for items in a grid/list.
 * @param index - The item index
 * @param baseDelayMs - Base delay between items (default 70ms)
 * @param maxDelayMs - Cap the delay so later items don't wait too long (default 600ms)
 */
export function staggerDelay(
  index: number,
  baseDelayMs: number = 70,
  maxDelayMs: number = 600
): React.CSSProperties {
  const delay = Math.min(index * baseDelayMs, maxDelayMs);
  return { transitionDelay: `${delay}ms` };
}

/**
 * CSS class helpers for scroll-reveal animations.
 * Use these with the `isVisible` boolean from useScrollReveal.
 */
export const revealClasses = {
  /** Fade up from below */
  fadeUp: (visible: boolean) =>
    `transition-all duration-[550ms] ease-out ${
      visible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-6"
    }`,

  /** Fade in from left */
  fadeLeft: (visible: boolean) =>
    `transition-all duration-[550ms] ease-out ${
      visible
        ? "opacity-100 translate-x-0"
        : "opacity-0 -translate-x-6"
    }`,

  /** Fade in from right */
  fadeRight: (visible: boolean) =>
    `transition-all duration-[550ms] ease-out ${
      visible
        ? "opacity-100 translate-x-0"
        : "opacity-0 translate-x-6"
    }`,

  /** Simple fade */
  fade: (visible: boolean) =>
    `transition-opacity duration-[550ms] ease-out ${
      visible ? "opacity-100" : "opacity-0"
    }`,

  /** Scale up */
  scaleUp: (visible: boolean) =>
    `transition-all duration-[500ms] ease-out ${
      visible
        ? "opacity-100 scale-100"
        : "opacity-0 scale-95"
    }`,
};
