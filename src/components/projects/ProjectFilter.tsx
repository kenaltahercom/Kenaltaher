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
    <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              isSelected
                ? "bg-slate-900 text-white dark:bg-white dark:text-black font-semibold shadow-md shadow-black/10 dark:shadow-white/10"
                : "glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
