"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  description?: string;
}

export default function LightboxModal({
  isOpen,
  onClose,
  imageSrc,
  title,
  description,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Pratinjau visual ${title}`}
    >
      <div
        className="relative max-w-4xl w-full bg-white dark:bg-[#111116] rounded-2xl overflow-hidden border border-slate-300 dark:border-white/15 p-4 sm:p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate pr-4">
            {title}
          </h4>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
            aria-label="Tutup jendela pratinjau"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Image Display */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/5">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
        </div>

        {/* Description caption */}
        {description && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
