"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, ListMusic, ChevronDown, Sparkles } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { VolumeHighIcon, VolumeLowIcon } from "@hugeicons/core-free-icons";
import ElasticSlider from "@/components/ui/ElasticSlider";
import Shredder from "@/components/ui/Shredder";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

export interface Track {
  id: string;
  title: string;
  artist: string;
  audioSrc: string;
  coverSrc: string;
}

export const INITIAL_PLAYLIST: Track[] = [
  {
    id: "sempurna",
    title: "Sempurna",
    artist: "Andra & The Backbone",
    audioSrc: "/audio/sempurna.mp3",
    coverSrc: "/images/music/sempurna-cover.jpg",
  },
  {
    id: "menari-nari",
    title: "Menari Nari",
    artist: "Maliq & D'Essentials",
    audioSrc: "/audio/menari-nari.mp3",
    coverSrc: "/images/music/menari-nari-cover.jpg",
  },
  {
    id: "teh-hijau",
    title: "Teh Hijau",
    artist: "Tulus",
    audioSrc: "/audio/teh-hijau.mp3",
    coverSrc: "/images/music/teh-hijau-cover.jpg",
  },
  {
    id: "1000x",
    title: "1000x",
    artist: "Jarryd James ft. Broods",
    audioSrc: "/audio/1000x.mp3",
    coverSrc: "/images/music/1000x-cover.jpg",
  },
];

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

let globalAudio: HTMLAudioElement | null = null;
function getGlobalAudio(initialSrc: string): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!globalAudio) {
    globalAudio = new Audio(initialSrc);
    globalAudio.preload = "metadata";
  }
  return globalAudio;
}

export default function HeroMusicPlayer() {
  const { theme, lang } = useLanguageTheme();
  const isDark = theme === "dark";

  const [playlist, setPlaylist] = useState<Track[]>(INITIAL_PLAYLIST);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [showQueue, setShowQueue] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const currentTrack = playlist[currentTrackIndex] || INITIAL_PLAYLIST[0];

  const playTrackAtIndex = useCallback(
    async (index: number, shouldPlay = true) => {
      const targetTrack = playlist[index];
      if (!targetTrack) return;
      setCurrentTrackIndex(index);

      const audio = audioRef.current;
      if (!audio) return;

      const fullSrc = targetTrack.audioSrc;
      if (!audio.src.endsWith(fullSrc)) {
        audio.src = fullSrc;
        audio.currentTime = 0;
      }

      if (shouldPlay) {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }
    },
    [playlist]
  );

  const playNextTrack = useCallback(() => {
    const nextIdx = (currentTrackIndex + 1) % playlist.length;
    playTrackAtIndex(nextIdx, isPlaying);
  }, [currentTrackIndex, playlist.length, isPlaying, playTrackAtIndex]);

  const playPrevTrack = useCallback(() => {
    const prevIdx = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    playTrackAtIndex(prevIdx, isPlaying);
  }, [currentTrackIndex, playlist.length, isPlaying, playTrackAtIndex]);

  useEffect(() => {
    const audio = getGlobalAudio(currentTrack.audioSrc);
    if (!audio) return undefined;
    audioRef.current = audio;

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
      playNextTrack();
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
  }, [currentTrack.audioSrc, playNextTrack]);

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

  // Shredder callback when a row is shredded
  const handleShred = (shreddedTrack: Track) => {
    // If shredded track is current track, advance to next
    if (shreddedTrack.id === currentTrack.id) {
      playNextTrack();
    }
    // Recycle item to back of queue so playlist never empties
    setPlaylist((prev) => {
      const filtered = prev.filter((t) => t.id !== shreddedTrack.id);
      return [...filtered, shreddedTrack];
    });
  };

  const handleReorder = (newOrder: Track[]) => {
    setPlaylist(newOrder);
    const activeIdx = newOrder.findIndex((t) => t.id === currentTrack.id);
    if (activeIdx !== -1) {
      setCurrentTrackIndex(activeIdx);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative flex flex-col items-end">
      {/* Expandable Shredder Queue Panel */}
      {showQueue && (
        <div className="mb-3 w-[280px] sm:w-[310px] glass-panel p-3.5 rounded-2xl border border-slate-300/80 dark:border-white/10 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60 dark:border-white/10">
            <div className="flex items-center gap-1.5">
              <ListMusic className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-[11px] font-semibold tracking-wide text-slate-900 dark:text-white uppercase">
                Playlist
              </span>
            </div>
            <button
              onClick={() => setShowQueue(false)}
              className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Tutup playlist"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
            {lang === "id"
              ? "Tarik lagu ke bawah ke celah untuk menghancurkan (shred) & skip lagu:"
              : "Drag track down into the slit to shred & skip:"}
          </p>

          <div className="w-full flex justify-center overflow-hidden rounded-xl bg-slate-50/50 dark:bg-black/20 p-1 border border-slate-200/50 dark:border-white/[0.06]">
            <Shredder<Track>
              items={playlist}
              renderItem={(track, idx) => {
                const isCurrent = track.id === currentTrack.id;
                return (
                  <div
                    className={`flex items-center gap-2.5 p-2 rounded-xl transition-all select-none ${
                      isCurrent
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md ring-1 ring-slate-900/10 dark:ring-white/20"
                        : "bg-white/90 text-slate-800 dark:bg-white/[0.08] dark:text-slate-200 hover:bg-white dark:hover:bg-white/[0.14] border border-slate-200/70 dark:border-white/10"
                    }`}
                  >
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 shadow-sm border border-black/10 dark:border-white/10">
                      {/* Standard img tag for snapshot compatibility in Shredder */}
                      <img
                        src={track.coverSrc}
                        alt={track.title}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-[11px] font-bold truncate leading-tight flex items-center gap-1.5">
                        <span className="truncate">{track.title}</span>
                        {isCurrent && isPlaying && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        )}
                      </div>
                      <div className="text-[9px] opacity-70 truncate leading-tight">
                        {track.artist}
                      </div>
                    </div>
                    <button
                      type="button"
                      onPointerDown={(e) => {
                        e.stopPropagation();
                        const targetIdx = playlist.findIndex((t) => t.id === track.id);
                        if (targetIdx !== -1) {
                          playTrackAtIndex(targetIdx, true);
                        }
                      }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer ${
                        isCurrent
                          ? "bg-white text-slate-900 dark:bg-slate-900 dark:text-white"
                          : "bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20"
                      }`}
                      aria-label={`Putar ${track.title}`}
                    >
                      {isCurrent && isPlaying ? (
                        <Pause className="w-2.5 h-2.5" fill="currentColor" />
                      ) : (
                        <Play className="w-2.5 h-2.5 ml-0.5" fill="currentColor" />
                      )}
                    </button>
                  </div>
                );
              }}
              onShred={handleShred}
              onReorder={handleReorder}
              width={270}
              height={260}
              inset={8}
              gap={8}
              fallHeight={80}
              feedSpeed={200}
              bite={16}
              stripWidth={8}
              curl={1.1}
              loopAfterDelete={true}
              slitColor={isDark ? "#52525b" : "#94a3b8"}
              color={isDark ? "#f8fafc" : "#0f172a"}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Main Glass Panel Mini Player */}
      <div className="glass-panel px-3.5 py-3 rounded-2xl border border-slate-300/80 dark:border-white/10 shadow-2xl backdrop-blur-md flex flex-col gap-2.5 w-[280px] sm:w-[310px] pointer-events-auto transition-all duration-300 hover:border-slate-400 dark:hover:border-white/20">
        {/* Top Row: Cover Art + Title + Controls */}
        <div className="flex items-center gap-2.5">
          {/* Paired Album Cover with Playing Pulse */}
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-md border border-slate-200/80 dark:border-white/15 group">
            <Image
              src={currentTrack.coverSrc}
              alt={currentTrack.title}
              width={40}
              height={40}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isPlaying ? "scale-105" : "scale-100"
              }`}
              priority
              unoptimized
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white animate-ping" />
              </div>
            )}
          </div>

          {/* Title & Artist & Equalizer */}
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[11.5px] font-bold text-slate-900 dark:text-white truncate leading-tight tracking-tight">
                {currentTrack.title}
              </span>
              {/* Equalizer animation */}
              <div className="flex items-end gap-[2px] h-3 shrink-0" aria-hidden="true">
                {[1, 2, 3].map((bar) => (
                  <div
                    key={bar}
                    className="w-[2.5px] rounded-full transition-colors"
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
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate leading-tight">
              {currentTrack.artist}
            </span>
          </div>

          {/* Controls: Prev, Play/Pause, Next, Queue Toggle */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={playPrevTrack}
              className="w-6 h-6 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Lagu sebelumnya"
            >
              <SkipBack className="w-3 h-3" />
            </button>

            <button
              onClick={togglePlay}
              className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 transition-all duration-200 shrink-0 shadow-sm cursor-pointer"
              aria-label={isPlaying ? `Pause lagu ${currentTrack.title}` : `Putar lagu ${currentTrack.title}`}
            >
              {isPlaying ? (
                <Pause className="w-3 h-3" fill="currentColor" />
              ) : (
                <Play className="w-3 h-3 ml-0.5" fill="currentColor" />
              )}
            </button>

            <button
              onClick={playNextTrack}
              className="w-6 h-6 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Lagu berikutnya"
            >
              <SkipForward className="w-3 h-3" />
            </button>

            <button
              onClick={() => setShowQueue(!showQueue)}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                showQueue
                  ? "bg-slate-900 text-white dark:bg-white dark:text-black"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
              }`}
              aria-label="Buka antrean playlist"
              title="Playlist"
            >
              <ListMusic className="w-3 h-3" />
            </button>
          </div>
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
        <div className="w-full flex justify-center pt-0.5">
          <ElasticSlider
            value={volume}
            defaultValue={50}
            leftIcon={<HugeiconsIcon icon={VolumeLowIcon} size={18} />}
            rightIcon={<HugeiconsIcon icon={VolumeHighIcon} size={18} />}
            onChange={handleVolumeChange}
            maxStretch={40}
            bounce={0.5}
            growOnHover
            wheel={false}
            orientation="horizontal"
            iconPlacement="outside"
            valuePosition="none"
            thickness={5}
            activeThickness={10}
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
