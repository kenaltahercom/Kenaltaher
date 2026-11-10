"use client";

import React from "react";

interface ProjectFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function ProjectFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 max-w-fit mx-auto mb-16">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-200 ${
              isSelected
                ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
