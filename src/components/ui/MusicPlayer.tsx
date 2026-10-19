"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, AlertCircle } from "lucide-react";

const AUDIO_SRC = "/audio/sempurna.mp3";
const SONG_TITLE = "Sempurna";
const SONG_ARTIST = "Andra & The Backbone";

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Global audio singleton to guarantee only one audio instance and no resets across theme/scroll
let globalAudio: HTMLAudioElement | null = null;

function getGlobalAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!globalAudio) {
    globalAudio = new Audio(AUDIO_SRC);
    globalAudio.preload = "metadata";
  }
  return globalAudio;
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const animFrameRef = useRef<number>(0);

  // Connect to singleton audio instance
  useEffect(() => {
    const audio = getGlobalAudio();
    if (!audio) return;
    audioRef.current = audio;

    // Sync initial state if audio is already active
    if (!isNaN(audio.duration) && audio.duration > 0) {
      setDuration(audio.duration);
      setIsLoaded(true);
    }
    setCurrentTime(audio.currentTime);
    setIsPlaying(!audio.paused);
    setIsMuted(audio.muted);

    const handleLoaded = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
      setError(null);
    };

    const handleError = () => {
      setError("Audio gagal dimuat");
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Sync time via rAF for smooth progress
  const updateProgress = useCallback(() => {
    if (audioRef.current && isPlaying) {
      setCurrentTime(audioRef.current.currentTime);
      animFrameRef.current = requestAnimationFrame(updateProgress);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(updateProgress);
    } else {
      cancelAnimationFrame(animFrameRef.current);
    }
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, updateProgress]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        setError(null);
        await audio.play();
        setIsPlaying(true);
      }
    } catch {
      setError("Playback gagal");
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
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

  // Equalizer bars animation (3 bars)
  const eqBars = [1, 2, 3];

  return (
    <div className="flex items-center gap-2.5 group">
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        disabled={!!error && !isLoaded}
        className="relative w-9 h-9 rounded-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white transition-all duration-200 shadow-md shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        aria-label={isPlaying ? "Pause lagu Sempurna" : "Putar lagu Sempurna"}
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5" fill="currentColor" />
        ) : (
          <Play className="w-3.5 h-3.5 ml-0.5" fill="currentColor" />
        )}
      </button>

      {/* Track Info + Progress */}
      <div className="flex flex-col min-w-0 flex-1">
        {/* Top row: Song info + Equalizer + Mute */}
        <div className="flex items-center gap-2 mb-1">
          {/* Equalizer Waveform Animation */}
          <div
            className="flex items-end gap-[2px] h-3.5 shrink-0"
            aria-hidden="true"
          >
            {eqBars.map((bar) => (
              <div
                key={bar}
                className={`w-[3px] rounded-full transition-colors duration-200 ${
                  isPlaying
                    ? "bg-indigo-500 dark:bg-indigo-400"
                    : "bg-slate-400 dark:bg-slate-600"
                }`}
                style={{
                  height: isPlaying ? undefined : "4px",
                  animation: isPlaying
                    ? `eqBounce${bar} ${0.3 + bar * 0.15}s ease-in-out infinite alternate`
                    : "none",
                }}
              />
            ))}
          </div>

          {/* Song title + artist */}
          <div className="flex items-baseline gap-1.5 min-w-0 overflow-hidden">
            <span className="text-[11px] font-bold text-slate-900 dark:text-white truncate leading-tight">
              {SONG_TITLE}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate leading-tight hidden sm:inline">
              {SONG_ARTIST}
            </span>
          </div>

          {/* Volume toggle */}
          <button
            onClick={toggleMute}
            className="ml-auto text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
            aria-label={isMuted ? "Bunyikan audio" : "Bisukan audio"}
          >
            {isMuted ? (
              <VolumeX className="w-3 h-3" />
            ) : (
              <Volume2 className="w-3 h-3" />
            )}
          </button>
        </div>

        {/* Progress bar + time */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-slate-500 dark:text-slate-500 tabular-nums w-7 text-right shrink-0">
            {formatTime(currentTime)}
          </span>

          <div
            ref={progressRef}
            className="relative flex-1 h-[5px] rounded-full bg-slate-200 dark:bg-white/10 cursor-pointer group/bar overflow-hidden"
            onClick={handleProgressClick}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progres lagu"
          >
            {/* Filled portion */}
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-none"
              style={{ width: `${progress}%` }}
            />
            {/* Thumb dot */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border-2 border-indigo-500 shadow-sm opacity-0 group-hover/bar:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 5px)` }}
            />
          </div>

          <span className="text-[9px] font-mono text-slate-500 dark:text-slate-500 tabular-nums w-7 shrink-0">
            {formatTime(duration)}
          </span>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
            <span className="text-[10px] text-red-500 font-medium">{error}</span>
          </div>
        )}
      </div>

      {/* Equalizer keyframes */}
      <style jsx>{`
        @keyframes eqBounce1 {
          0% { height: 3px; }
          100% { height: 12px; }
        }
        @keyframes eqBounce2 {
          0% { height: 6px; }
          100% { height: 10px; }
        }
        @keyframes eqBounce3 {
          0% { height: 2px; }
          100% { height: 14px; }
        }
      `}</style>
    </div>
  );
}
