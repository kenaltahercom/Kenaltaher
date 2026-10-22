"use client";

import React from "react";

/**
 * Static ambient background lighting layer for sections below Hero.
 * Completely static (no WebGL, no Canvas, no animations, zero CPU/GPU overhead)
 * Provides subtle ambient color depth for Dark & Light modes without movement.
 */
export default function AfterHeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* Static subtle ambient gradient glows */}
      <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-indigo-600/[0.03] dark:bg-indigo-600/[0.04] rounded-full blur-[140px]" />
      <div className="absolute top-[40%] left-[5%] w-[450px] h-[450px] bg-sky-600/[0.02] dark:bg-sky-600/[0.03] rounded-full blur-[130px]" />
      <div className="absolute top-[75%] right-[10%] w-[550px] h-[550px] bg-purple-600/[0.02] dark:bg-purple-600/[0.03] rounded-full blur-[150px]" />
    </div>
  );
}
