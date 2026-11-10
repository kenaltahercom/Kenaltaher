"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { VolumeHighIcon, VolumeLowIcon } from "@hugeicons/core-free-icons";
import ElasticSlider from "@/components/ui/ElasticSlider";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

const AUDIO_SRC = "/audio/sempurna.mp3";
const SONG_TITLE = "Sempurna";
const SONG_ARTIST = "Andra & The Backbone";

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

let globalAudio: HTMLAudioElement | null = null;
function getGlobalAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!globalAudio) {
    globalAudio = new Audio(AUDIO_SRC);
    globalAudio.preload = "metadata";
  }
  return globalAudio;
}

export default function HeroMusicPlayer() {
  const { theme } = useLanguageTheme();
  const isDark = theme === "dark";

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    const audio = getGlobalAudio();
    if (!audio) return undefined;
    audioRef.current = audio;

    // Read the singleton's initial state after the effect has committed.
    // Subsequent updates are driven by native media events.
    const initialSyncFrame = window.requestAnimationFrame(() => {
      const hasDuration = Number.isFinite(audio.duration) && audio.duration > 0;
      setDuration(hasDuration ? audio.duration : 0);
      setCurrentTime(audio.currentTime);
      setIsPlaying(!audio.paused);
      setVolume(audio.volume > 0 ? Math.round(audio.volume * 100) : 50);
    });

    const handleLoaded = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      window.cancelAnimationFrame(initialSyncFrame);
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
    } catch {
      /* ignore */
    }
  };

  const handleVolumeChange = (val: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    setVolume(val);
    audio.volume = Math.max(0, Math.min(1, val / 100));
    if (val > 0 && audio.muted) {
      audio.muted = false;
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    setCurrentTime(audio.currentTime);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="glass-panel px-4 py-3 rounded-2xl border border-slate-300/80 dark:border-white/10 shadow-2xl backdrop-blur-md flex flex-col gap-2.5 w-[250px] sm:w-[280px] pointer-events-auto transition-all duration-300 hover:border-slate-400 dark:hover:border-white/20">
      {/* Top Row: Equalizer + Song title + Play/Pause Button */}
      <div className="flex items-center gap-2.5">
        {/* Equalizer animation */}
        <div className="flex items-end gap-[2px] h-3.5 shrink-0" aria-hidden="true">
          {[1, 2, 3].map((bar) => (
            <div
              key={bar}
              className="w-[3px] rounded-full transition-colors"
              style={{
                background: isPlaying
                  ? isDark
                    ? "#ffffff"
                    : "#18181b"
                  : isDark
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(0,0,0,0.2)",
                height: isPlaying ? undefined : "3px",
                animation: isPlaying
                  ? `eqBounce${bar} ${0.3 + bar * 0.15}s ease-in-out infinite alternate`
                  : "none",
              }}
            />
          ))}
        </div>

        {/* Title & Artist */}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[11px] font-bold text-slate-900 dark:text-white truncate leading-tight tracking-tight">
            {SONG_TITLE}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate leading-tight">
            {SONG_ARTIST}
          </span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 transition-all duration-200 shrink-0 shadow-sm cursor-pointer"
          aria-label={isPlaying ? "Pause lagu Sempurna" : "Putar lagu Sempurna"}
        >
          {isPlaying ? (
            <Pause className="w-3 h-3" fill="currentColor" />
          ) : (
            <Play className="w-3 h-3 ml-0.5" fill="currentColor" />
          )}
        </button>
      </div>

      {/* Middle Row: Progress bar + time */}
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 tabular-nums w-6 text-right shrink-0">
          {formatTime(currentTime)}
        </span>
        <div
          ref={progressRef}
          className="relative flex-1 h-[4px] rounded-full bg-slate-200 dark:bg-white/10 cursor-pointer overflow-hidden group/bar"
          onClick={handleProgressClick}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-slate-900 dark:bg-white/90 transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 tabular-nums w-6 shrink-0">
          {formatTime(duration)}
        </span>
      </div>

      {/* Bottom Row: Exact ElasticSlider with HugeiconsIcon */}
      <div className="w-full flex justify-center pt-1">
        <ElasticSlider
          value={volume}
          defaultValue={50}
          leftIcon={<HugeiconsIcon icon={VolumeLowIcon} size={20} />}
          rightIcon={<HugeiconsIcon icon={VolumeHighIcon} size={20} />}
          onChange={handleVolumeChange}
          maxStretch={50}
          bounce={0.5}
          growOnHover
          wheel={false}
          orientation="horizontal"
          iconPlacement="outside"
          valuePosition="none"
          thickness={6}
          activeThickness={12}
          radius={40}
          restOpacity={0.7}
          fillFrom={0}
          isStepped={false}
          stepSize={10}
          ticks={false}
          thumb={false}
          jumpToClick
          trackColor={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}
          rangeColor={isDark ? "rgba(255,255,255,0.9)" : "#18181b"}
          className="w-full"
        />
      </div>

      {/* Equalizer Keyframes */}
      <style jsx>{`
        @keyframes eqBounce1 { 0% { height: 3px; } 100% { height: 12px; } }
        @keyframes eqBounce2 { 0% { height: 6px; } 100% { height: 10px; } }
        @keyframes eqBounce3 { 0% { height: 2px; } 100% { height: 14px; } }
      `}</style>
    </div>
  );
}
