"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Coffee } from "lucide-react";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import "./PulseCoffee.css";

const STORAGE_KEY = "kenaltaher_coffee_count";
const INITIAL_COUNT = 800;

interface PulseCoffeeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function PulseCoffee({ className = "", size = "md" }: PulseCoffeeProps) {
  const { t } = useLanguageTheme();
  // Safe initial state for SSR: 800
  const [count, setCount] = useState<number>(INITIAL_COUNT);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCountBumped, setIsCountBumped] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Safely hydrate from localStorage on client mount, ensuring starting threshold is >= 800
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= INITIAL_COUNT) {
          setCount(parsed);
          return;
        }
      }
      // Initialize or upgrade previous test counters (< 800) to 800
      localStorage.setItem(STORAGE_KEY, INITIAL_COUNT.toString());
      setCount(INITIAL_COUNT);
    } catch {
      // localStorage disabled or private browsing fallback
    }
  }, []);

  const handleClick = useCallback(() => {
    // Strictly increment by 1
    setCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem(STORAGE_KEY, next.toString());
      } catch {
        // Safe fallback
      }
      return next;
    });

    // Trigger pulse and number bump animations
    setIsAnimating(true);
    setIsCountBumped(true);

    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }

    animationTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
      setIsCountBumped(false);
    }, 600);
  }, []);

  useEffect(() => {
    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, []);

  const label = t("coffee.label") || "Beri Aku Kopi";
  const tooltip = t("coffee.tooltip") || "Beri dukungan secangkir kopi untuk Taher";
  const ariaLabel = `${t("coffee.ariaLabel") || "Dukungan kopi: "}${isMounted ? count : INITIAL_COUNT}`;

  const sizeClasses = {
    sm: "pulse-coffee-sm",
    md: "pulse-coffee-md",
    lg: "pulse-coffee-lg",
  }[size];

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-4.5 h-4.5",
  }[size];

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      title={tooltip}
      className={`pulse-coffee-btn group ${sizeClasses} ${className}`}
    >
      {/* Icon with coffee bounce animation */}
      <span className={`pulse-coffee-icon ${isAnimating ? "animating" : ""}`}>
        <Coffee className={iconSizes} strokeWidth={2.25} />
      </span>

      {/* Expandable Multilingual Label on Hover / Focus */}
      <span className="pulse-coffee-label-wrapper">
        <span className="pulse-coffee-label-text">
          {label}
        </span>
      </span>

      {/* Numeric Counter starting at 800 */}
      <span className={`pulse-coffee-count ${isCountBumped ? "bumped" : ""}`}>
        {isMounted ? count : INITIAL_COUNT}
      </span>
    </button>
  );
}
