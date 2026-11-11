"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

interface InteractiveWordmarkProps {
  text?: string;
  theme?: "dark" | "light";
  className?: string;
  onKClick?: () => void;
  isKActive?: boolean;
}

export default function InteractiveWordmark({
  text = "Kenaltaher",
  theme = "dark",
  className = "",
  onKClick,
  isKActive = false,
}: InteractiveWordmarkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 700, y: 120 });

  // Physics-based lerp tracking for liquid-smooth glint glide
  const mouseTarget = useRef<{ x: number; y: number }>({ x: 700, y: 120 });
  const currentPos = useRef<{ x: number; y: number }>({ x: 700, y: 120 });
  const animFrameId = useRef<number | null>(null);

  const isLight = theme === "light";

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Normalize coordinates into the SVG viewBox (1400 x 240)
    const normX = ((e.clientX - rect.left) / rect.width) * 1400;
    const normY = ((e.clientY - rect.top) / rect.height) * 240;
    mouseTarget.current = { x: normX, y: normY };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el || !e.touches[0]) return;
    const rect = el.getBoundingClientRect();
    const touch = e.touches[0];
    const normX = ((touch.clientX - rect.left) / rect.width) * 1400;
    const normY = ((touch.clientY - rect.top) / rect.height) * 240;
    mouseTarget.current = { x: normX, y: normY };
    setIsHovered(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsHovered(false);
    mouseTarget.current = { x: 700, y: 120 };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly return toward center when mouse leaves
    mouseTarget.current = { x: 700, y: 120 };
  };

  // Smooth lerp loop with requestAnimationFrame
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;
      const target = mouseTarget.current;
      const current = currentPos.current;

      const factor = 0.14; // smooth ease factor
      current.x += (target.x - current.x) * factor;
      current.y += (target.y - current.y) * factor;

      setCoords({ x: current.x, y: current.y });
      animFrameId.current = requestAnimationFrame(tick);
    };

    animFrameId.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full overflow-hidden select-none cursor-pointer flex items-center justify-center ${className}`}
      aria-label={text}
    >
      <svg
        viewBox="0 0 1400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[280px] pointer-events-none transition-all duration-300"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Spotlight Stroke Radial Gradient tracking cursor */}
          <radialGradient
            id="spotlight-stroke"
            cx={coords.x}
            cy={coords.y}
            r="320"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0%"
              stopColor={isLight ? "#09090b" : "#ffffff"}
              stopOpacity={isHovered ? 1 : 0.45}
            />
            <stop
              offset="25%"
              stopColor={isLight ? "#18181b" : "#f4f4f5"}
              stopOpacity={isHovered ? 0.9 : 0.3}
            />
            <stop
              offset="50%"
              stopColor={isLight ? "#52525b" : "#a1a1aa"}
              stopOpacity={isHovered ? 0.45 : 0.15}
            />
            <stop
              offset="80%"
              stopColor={isLight ? "#71717a" : "#3f3f46"}
              stopOpacity={isHovered ? 0.15 : 0.05}
            />
            <stop
              offset="100%"
              stopColor={isLight ? "#a1a1aa" : "#18181b"}
              stopOpacity="0"
            />
          </radialGradient>

          {/* Spotlight Subtle Inner Fill Gradient */}
          <radialGradient
            id="spotlight-fill"
            cx={coords.x}
            cy={coords.y}
            r="360"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0%"
              stopColor={isLight ? "#18181b" : "#ffffff"}
              stopOpacity={isHovered ? (isLight ? 0.09 : 0.16) : 0.03}
            />
            <stop
              offset="45%"
              stopColor={isLight ? "#27272a" : "#ffffff"}
              stopOpacity={isHovered ? (isLight ? 0.04 : 0.06) : 0.01}
            />
            <stop
              offset="100%"
              stopColor={isLight ? "#3f3f46" : "#ffffff"}
              stopOpacity="0"
            />
          </radialGradient>

          {/* Base Metallic Gradient for ambient letters */}
          <linearGradient id="base-bevel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              stopColor={isLight ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.22)"}
            />
            <stop
              offset="40%"
              stopColor={isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.07)"}
            />
            <stop
              offset="100%"
              stopColor={isLight ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)"}
            />
          </linearGradient>

          {/* Bloom Filter for high-intensity glint */}
          <filter id="bloom-glint" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Layer 1: Ambient Base Outline (always visible, subtle metallic) */}
        <text
          x="50%"
          y="76%"
          textAnchor="middle"
          className="font-black select-none tracking-tight"
          style={{
            fontSize: "185px",
            fontFamily: "'Varien', sans-serif",
            fill: "url(#base-bevel)",
            stroke: isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)",
            strokeWidth: 2,
            letterSpacing: "0.01em",
          }}
        >
          {text}
        </text>

        {/* Layer 2: Interactive Subtle Spotlight Fill */}
        <text
          x="50%"
          y="76%"
          textAnchor="middle"
          className="font-black select-none tracking-tight transition-opacity duration-300"
          style={{
            fontSize: "185px",
            fontFamily: "'Varien', sans-serif",
            fill: "url(#spotlight-fill)",
            letterSpacing: "0.01em",
          }}
        >
          {text}
        </text>

        {/* Layer 3: Interactive Spotlight Stroke Glint (following cursor) */}
        <text
          x="50%"
          y="76%"
          textAnchor="middle"
          className="font-black select-none tracking-tight transition-all duration-150"
          style={{
            fontSize: "185px",
            fontFamily: "'Varien', sans-serif",
            fill: "none",
            stroke: "url(#spotlight-stroke)",
            strokeWidth: isHovered ? 4.2 : 2.6,
            letterSpacing: "0.01em",
            filter: isHovered ? "url(#bloom-glint)" : "none",
          }}
        >
          {text}
        </text>

        {/* Layer 4: Sharp Crisp Inner Highlight */}
        <text
          x="50%"
          y="76%"
          textAnchor="middle"
          className="font-black select-none tracking-tight transition-opacity duration-200"
          style={{
            fontSize: "185px",
            fontFamily: "'Varien', sans-serif",
            fill: "none",
            stroke: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)",
            strokeWidth: 1,
            letterSpacing: "0.01em",
          }}
        >
          {text}
        </text>

        {/* Clickable Hitbox specifically for the letter 'K' (completely invisible, no borders) */}
        {onKClick && (
          <rect
            x="130"
            y="25"
            width="160"
            height="190"
            rx="12"
            fill="transparent"
            stroke="none"
            className="cursor-pointer outline-none focus:outline-none"
            style={{ pointerEvents: "auto", outline: "none" }}
            onClick={(e) => {
              e.stopPropagation();
              onKClick();
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              onKClick();
            }}
            aria-label="Klik huruf K untuk membuka menu bubble"
            role="button"
            tabIndex={0}
          />
        )}
      </svg>
    </div>
  );
}

