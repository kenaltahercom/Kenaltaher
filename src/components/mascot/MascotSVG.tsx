/**
 * MascotSVG.tsx
 * Inline SVG components for the new Keno mascot:
 * Blue fluffy catosaurus (cat in blue monster dinosaur costume).
 *
 * Color Palette:
 *  - Body fur:        #60A5FA (blue-400) / #93C5FD (blue-300)
 *  - White belly/face: #F0F4FF / #FFFFFF
 *  - Accent indigo:   #6366F1
 *  - Pink pads/nose:  #F9A8D4 (pink-300)
 *  - Eyes:            #0EA5E9 (sky-500), pupil #1E293B
 *  - Hood goggle eyes:#1E293B + white highlight
 *  - Teeth:           #FFFFFF
 */

import React from "react";

interface SVGProps {
  size?: number;
  className?: string;
}

/* ─────────────────────────── SHARED PARTS ─────────────────────────── */

/** Reusable base body shape — round blue fluffy catosaurus body */
function KenoBody({ cx = 100, cy = 115 }: { cx?: number; cy?: number }) {
  return (
    <g>
      {/* Main body */}
      <ellipse cx={cx} cy={cy} rx={68} ry={62} fill="#60A5FA" />
      {/* White fluffy belly */}
      <ellipse cx={cx} cy={cy + 10} rx={42} ry={40} fill="#EFF6FF" />
      {/* Body texture highlights */}
      <ellipse cx={cx - 30} cy={cy - 20} rx={12} ry={8} fill="#93C5FD" opacity={0.5} />
      <ellipse cx={cx + 32} cy={cy - 15} rx={9} ry={6} fill="#93C5FD" opacity={0.4} />
    </g>
  );
}

/** Monster hood — blue fuzzy hood with goggle eyes on top + teeth */
function KenoHood({ cx = 100 }: { cx?: number }) {
  return (
    <g>
      {/* Hood dome */}
      <ellipse cx={cx} cy={58} rx={58} ry={52} fill="#3B82F6" />
      {/* Hood fluffy fringe */}
      <ellipse cx={cx - 42} cy={68} rx={14} ry={10} fill="#60A5FA" />
      <ellipse cx={cx - 30} cy={76} rx={12} ry={8} fill="#60A5FA" />
      <ellipse cx={cx + 30} cy={76} rx={12} ry={8} fill="#60A5FA" />
      <ellipse cx={cx + 42} cy={68} rx={14} ry={10} fill="#60A5FA" />

      {/* Cat ears on hood */}
      <polygon points={`${cx - 46},44 ${cx - 38},18 ${cx - 24},40`} fill="#3B82F6" />
      <polygon points={`${cx - 42},40 ${cx - 37},24 ${cx - 26},38`} fill="#F9A8D4" />
      <polygon points={`${cx + 46},44 ${cx + 38},18 ${cx + 24},40`} fill="#3B82F6" />
      <polygon points={`${cx + 42},40 ${cx + 37},24 ${cx + 26},38`} fill="#F9A8D4" />

      {/* Hood goggle eyes */}
      <circle cx={cx - 20} cy={36} r={16} fill="white" stroke="#93C5FD" strokeWidth={2} />
      <circle cx={cx + 20} cy={36} r={16} fill="white" stroke="#93C5FD" strokeWidth={2} />
      <circle cx={cx - 20} cy={38} r={9} fill="#1E293B" />
      <circle cx={cx + 20} cy={38} r={9} fill="#1E293B" />
      <circle cx={cx - 16} cy={33} r={3} fill="white" />
      <circle cx={cx + 24} cy={33} r={3} fill="white" />

      {/* Hood teeth fringe */}
      {[-38, -22, -6, 10, 26].map((offset, i) => (
        <polygon
          key={i}
          points={`${cx + offset},78 ${cx + offset + 7},94 ${cx + offset + 14},78`}
          fill="white"
        />
      ))}
    </g>
  );
}

/** Cat face — teal eyes, pink nose, chubby cheeks */
function KenoFace({
  cx = 100,
  cy = 72,
  expression = "default",
}: {
  cx?: number;
  cy?: number;
  expression?: string;
}) {
  return (
    <g>
      {/* Face base */}
      <ellipse cx={cx} cy={cy} rx={36} ry={32} fill="#EFF6FF" />

      {/* Cheeks */}
      <ellipse cx={cx - 22} cy={cy + 10} rx={9} ry={6} fill="#FBCFE8" opacity={0.6} />
      <ellipse cx={cx + 22} cy={cy + 10} rx={9} ry={6} fill="#FBCFE8" opacity={0.6} />

      {/* Eyes */}
      {expression === "sleepy" ? (
        <>
          <path d={`M${cx - 16},${cy - 2} Q${cx - 10},${cy - 10} ${cx - 4},${cy - 2}`} stroke="#0EA5E9" strokeWidth={2.5} fill="none" strokeLinecap="round" />
          <path d={`M${cx + 4},${cy - 2} Q${cx + 10},${cy - 10} ${cx + 16},${cy - 2}`} stroke="#0EA5E9" strokeWidth={2.5} fill="none" strokeLinecap="round" />
        </>
      ) : expression === "happy" ? (
        <>
          <path d={`M${cx - 16},${cy - 4} Q${cx - 10},${cy - 12} ${cx - 4},${cy - 4}`} stroke="#0EA5E9" strokeWidth={2.5} fill="none" strokeLinecap="round" />
          <path d={`M${cx + 4},${cy - 4} Q${cx + 10},${cy - 12} ${cx + 16},${cy - 4}`} stroke="#0EA5E9" strokeWidth={2.5} fill="none" strokeLinecap="round" />
        </>
      ) : expression === "love" ? (
        <>
          <path d={`M${cx - 16},${cy - 4} Q${cx - 10},${cy - 12} ${cx - 4},${cy - 4}`} stroke="#EC4899" strokeWidth={2.5} fill="none" strokeLinecap="round" />
          <path d={`M${cx + 4},${cy - 4} Q${cx + 10},${cy - 12} ${cx + 16},${cy - 4}`} stroke="#EC4899" strokeWidth={2.5} fill="none" strokeLinecap="round" />
        </>
      ) : expression === "angry" ? (
        <>
          <circle cx={cx - 10} cy={cy - 4} r={7} fill="#0EA5E9" />
          <circle cx={cx + 10} cy={cy - 4} r={7} fill="#0EA5E9" />
          <circle cx={cx - 10} cy={cy - 3} r={4} fill="#1E293B" />
          <circle cx={cx + 10} cy={cy - 3} r={4} fill="#1E293B" />
          {/* Angry brows */}
          <line x1={cx - 16} y1={cy - 14} x2={cx - 4} y2={cy - 10} stroke="#1E293B" strokeWidth={2.5} strokeLinecap="round" />
          <line x1={cx + 4} y1={cy - 10} x2={cx + 16} y2={cy - 14} stroke="#1E293B" strokeWidth={2.5} strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx={cx - 10} cy={cy - 4} r={8} fill="#0EA5E9" />
          <circle cx={cx + 10} cy={cy - 4} r={8} fill="#0EA5E9" />
          <circle cx={cx - 10} cy={cy - 3} r={4.5} fill="#1E293B" />
          <circle cx={cx + 10} cy={cy - 3} r={4.5} fill="#1E293B" />
          <circle cx={cx - 7} cy={cy - 6} r={1.8} fill="white" />
          <circle cx={cx + 13} cy={cy - 6} r={1.8} fill="white" />
        </>
      )}

      {/* Nose */}
      <ellipse cx={cx} cy={cy + 8} rx={4} ry={3} fill="#F9A8D4" />

      {/* Mouth */}
      {expression === "angry" ? (
        <path d={`M${cx - 10},${cy + 16} Q${cx},${cy + 12} ${cx + 10},${cy + 16}`} stroke="#1E293B" strokeWidth={2} fill="none" strokeLinecap="round" />
      ) : expression === "happy" || expression === "excited" ? (
        <path d={`M${cx - 12},${cy + 14} Q${cx},${cy + 22} ${cx + 12},${cy + 14}`} stroke="#1E293B" strokeWidth={2} fill="none" strokeLinecap="round" />
      ) : (
        <path d={`M${cx - 8},${cy + 15} Q${cx},${cy + 20} ${cx + 8},${cy + 15}`} stroke="#1E293B" strokeWidth={2} fill="none" strokeLinecap="round" />
      )}
    </g>
  );
}

/** Keno's stubby blue arms */
function KenoArms({
  cx = 100,
  cy = 110,
  pose = "default",
}: {
  cx?: number;
  cy?: number;
  pose?: string;
}) {
  if (pose === "happy") {
    // Arms raised up in celebration
    return (
      <g>
        <ellipse cx={cx - 72} cy={cy - 28} rx={18} ry={12} fill="#60A5FA" transform={`rotate(-45,${cx - 72},${cy - 28})`} />
        <ellipse cx={cx - 70} cy={cy - 44} rx={12} ry={9} fill="#60A5FA" />
        <circle cx={cx - 70} cy={cy - 54} r={10} fill="#60A5FA" />
        <ellipse cx={cx - 67} cy={cy - 60} rx={5} ry={4} fill="#FBCFE8" />

        <ellipse cx={cx + 72} cy={cy - 28} rx={18} ry={12} fill="#60A5FA" transform={`rotate(45,${cx + 72},${cy - 28})`} />
        <ellipse cx={cx + 70} cy={cy - 44} rx={12} ry={9} fill="#60A5FA" />
        <circle cx={cx + 70} cy={cy - 54} r={10} fill="#60A5FA" />
        <ellipse cx={cx + 67} cy={cy - 60} rx={5} ry={4} fill="#FBCFE8" />
      </g>
    );
  }
  if (pose === "excited") {
    // Arms spread wide outward
    return (
      <g>
        <ellipse cx={cx - 80} cy={cy + 2} rx={20} ry={11} fill="#60A5FA" />
        <circle cx={cx - 92} cy={cy} r={10} fill="#60A5FA" />
        <ellipse cx={cx - 90} cy={cy - 2} rx={5} ry={4} fill="#FBCFE8" />

        <ellipse cx={cx + 80} cy={cy + 2} rx={20} ry={11} fill="#60A5FA" />
        <circle cx={cx + 92} cy={cy} r={10} fill="#60A5FA" />
        <ellipse cx={cx + 90} cy={cy - 2} rx={5} ry={4} fill="#FBCFE8" />
      </g>
    );
  }
  if (pose === "thinking") {
    // Right arm raised to chin
    return (
      <g>
        {/* Left arm down */}
        <ellipse cx={cx - 72} cy={cy + 10} rx={16} ry={11} fill="#60A5FA" />
        <circle cx={cx - 76} cy={cy + 18} r={10} fill="#60A5FA" />
        <ellipse cx={cx - 76} cy={cy + 24} rx={5} ry={4} fill="#FBCFE8" />

        {/* Right arm up to chin */}
        <ellipse cx={cx + 68} cy={cy - 5} rx={16} ry={11} fill="#60A5FA" transform={`rotate(-30,${cx + 68},${cy - 5})`} />
        <ellipse cx={cx + 60} cy={cy - 22} rx={12} ry={9} fill="#60A5FA" transform={`rotate(-15,${cx + 60},${cy - 22})`} />
        <circle cx={cx + 50} cy={cy - 36} r={10} fill="#60A5FA" />
        <ellipse cx={cx + 50} cy={cy - 42} rx={5} ry={4} fill="#FBCFE8" />
      </g>
    );
  }
  if (pose === "love") {
    // Arms front holding heart
    return (
      <g>
        <ellipse cx={cx - 62} cy={cy + 12} rx={16} ry={11} fill="#60A5FA" transform={`rotate(30,${cx - 62},${cy + 12})`} />
        <ellipse cx={cx + 62} cy={cy + 12} rx={16} ry={11} fill="#60A5FA" transform={`rotate(-30,${cx + 62},${cy + 12})`} />
      </g>
    );
  }
  if (pose === "angry") {
    // Arms slightly out, tense
    return (
      <g>
        <ellipse cx={cx - 74} cy={cy + 6} rx={16} ry={11} fill="#60A5FA" transform={`rotate(15,${cx - 74},${cy + 6})`} />
        <circle cx={cx - 80} cy={cy + 14} r={10} fill="#60A5FA" />
        <ellipse cx={cx - 80} cy={cy + 20} rx={5} ry={4} fill="#FBCFE8" />

        <ellipse cx={cx + 74} cy={cy + 6} rx={16} ry={11} fill="#60A5FA" transform={`rotate(-15,${cx + 74},${cy + 6})`} />
        <circle cx={cx + 80} cy={cy + 14} r={10} fill="#60A5FA" />
        <ellipse cx={cx + 80} cy={cy + 20} rx={5} ry={4} fill="#FBCFE8" />
      </g>
    );
  }
  // Default / navbar / sleepy — arms at sides
  return (
    <g>
      <ellipse cx={cx - 72} cy={cy + 10} rx={16} ry={11} fill="#60A5FA" />
      <circle cx={cx - 76} cy={cy + 20} r={10} fill="#60A5FA" />
      <ellipse cx={cx - 76} cy={cy + 26} rx={5} ry={4} fill="#FBCFE8" />

      <ellipse cx={cx + 72} cy={cy + 10} rx={16} ry={11} fill="#60A5FA" />
      <circle cx={cx + 76} cy={cy + 20} r={10} fill="#60A5FA" />
      <ellipse cx={cx + 76} cy={cy + 26} rx={5} ry={4} fill="#FBCFE8" />
    </g>
  );
}

/** Keno's feet */
function KenoFeet({ cx = 100, cy = 168 }: { cx?: number; cy?: number }) {
  return (
    <g>
      <ellipse cx={cx - 36} cy={cy} rx={22} ry={12} fill="#3B82F6" />
      <ellipse cx={cx - 36} cy={cy + 2} rx={16} ry={8} fill="#FBCFE8" opacity={0.5} />
      <ellipse cx={cx + 36} cy={cy} rx={22} ry={12} fill="#3B82F6" />
      <ellipse cx={cx + 36} cy={cy + 2} rx={16} ry={8} fill="#FBCFE8" opacity={0.5} />
    </g>
  );
}

/** Tail — small blue tail on back/right */
function KenoTail({ cx = 100, cy = 130 }: { cx?: number; cy?: number }) {
  return (
    <path
      d={`M${cx + 60},${cy} Q${cx + 86},${cy - 20} ${cx + 72},${cy - 44}`}
      stroke="#3B82F6"
      strokeWidth={12}
      fill="none"
      strokeLinecap="round"
    />
  );
}

/* ─────────────────────── EXPRESSION COMPONENTS ─────────────────────── */

/** Default / Navbar pose — alert, sitting straight */
export function MascotDefault({ size = 180, className = "" }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <KenoTail cx={100} cy={130} />
      <KenoBody cx={100} cy={118} />
      <KenoFeet cx={100} cy={170} />
      <KenoArms cx={100} cy={114} pose="default" />
      <KenoHood cx={100} />
      <KenoFace cx={100} cy={70} expression="default" />
    </svg>
  );
}

/** Happy — arms raised, squint-happy eyes, big smile */
export function MascotHappy({ size = 180, className = "" }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <KenoTail cx={100} cy={130} />
      <KenoBody cx={100} cy={118} />
      <KenoFeet cx={100} cy={170} />
      <KenoArms cx={100} cy={114} pose="happy" />
      <KenoHood cx={100} />
      <KenoFace cx={100} cy={70} expression="happy" />
      {/* Star sparkles */}
      <text x={18} y={30} fontSize={16} fill="#FCD34D">✦</text>
      <text x={158} y={28} fontSize={12} fill="#FCD34D">✦</text>
      <text x={170} y={60} fontSize={9} fill="#FCD34D">✦</text>
    </svg>
  );
}

/** Thinking — hand on chin, ? bubble */
export function MascotThinking({ size = 180, className = "" }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <KenoTail cx={100} cy={130} />
      <KenoBody cx={100} cy={118} />
      <KenoFeet cx={100} cy={170} />
      <KenoArms cx={100} cy={114} pose="thinking" />
      <KenoHood cx={100} />
      <KenoFace cx={100} cy={70} expression="default" />
      {/* ? bubble */}
      <circle cx={158} cy={22} r={18} fill="#6366F1" opacity={0.9} />
      <text x={151} y={29} fontSize={18} fill="white" fontWeight="bold">?</text>
    </svg>
  );
}

/** Excited — arms spread, excited face, ! marks */
export function MascotExcited({ size = 180, className = "" }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <KenoTail cx={100} cy={130} />
      <KenoBody cx={100} cy={118} />
      <KenoFeet cx={100} cy={170} />
      <KenoArms cx={100} cy={114} pose="excited" />
      <KenoHood cx={100} />
      <KenoFace cx={100} cy={70} expression="excited" />
      {/* !! marks */}
      <text x={22} y={36} fontSize={22} fill="#FCD34D" fontWeight="bold">!</text>
      <text x={36} y={24} fontSize={15} fill="#FCD34D" fontWeight="bold">!</text>
      <text x={158} y={30} fontSize={22} fill="#FCD34D" fontWeight="bold">!</text>
    </svg>
  );
}

/** Angry — frowning, flower mark on cheek */
export function MascotAngry({ size = 180, className = "" }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <KenoTail cx={100} cy={130} />
      <KenoBody cx={100} cy={118} />
      <KenoFeet cx={100} cy={170} />
      <KenoArms cx={100} cy={114} pose="angry" />
      <KenoHood cx={100} />
      <KenoFace cx={100} cy={70} expression="angry" />
      {/* Flower/star mark on cheek — anger symbol */}
      <text x={68} y={90} fontSize={12} fill="#EC4899">✿</text>
      {/* Anger lines */}
      <line x1={30} y1={28} x2={42} y2={22} stroke="#EF4444" strokeWidth={2.5} strokeLinecap="round" />
      <line x1={34} y1={36} x2={46} y2={34} stroke="#EF4444" strokeWidth={2} strokeLinecap="round" />
      <line x1={170} y1={28} x2={158} y2={22} stroke="#EF4444" strokeWidth={2.5} strokeLinecap="round" />
      <line x1={166} y1={36} x2={154} y2={34} stroke="#EF4444" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

/** Sleepy — ZZz marks, droopy eyes */
export function MascotSleepy({ size = 180, className = "" }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <KenoTail cx={100} cy={130} />
      <KenoBody cx={100} cy={118} />
      <KenoFeet cx={100} cy={170} />
      <KenoArms cx={100} cy={114} pose="default" />
      <KenoHood cx={100} />
      <KenoFace cx={100} cy={70} expression="sleepy" />
      {/* ZZz marks */}
      <text x={138} y={16} fontSize={12} fill="#93C5FD" fontWeight="bold">z</text>
      <text x={150} y={26} fontSize={16} fill="#93C5FD" fontWeight="bold">Z</text>
      <text x={162} y={14} fontSize={20} fill="#93C5FD" fontWeight="bold">Z</text>
    </svg>
  );
}

/** Love — holding purple heart, soft smile */
export function MascotLove({ size = 180, className = "" }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <KenoTail cx={100} cy={130} />
      <KenoBody cx={100} cy={118} />
      <KenoFeet cx={100} cy={170} />
      <KenoArms cx={100} cy={114} pose="love" />
      <KenoHood cx={100} />
      <KenoFace cx={100} cy={70} expression="love" />
      {/* Heart held in front */}
      <text x={82} y={158} fontSize={30} fill="#A855F7">♥</text>
      {/* Small hearts */}
      <text x={22} y={30} fontSize={12} fill="#EC4899">♥</text>
      <text x={162} y={22} fontSize={9} fill="#EC4899">♥</text>
      <text x={170} y={40} fontSize={14} fill="#A855F7">♥</text>
    </svg>
  );
}

/** Playful — winking, tongue out or playful pointer */
export function MascotPlayful({ size = 180, className = "" }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <KenoTail cx={100} cy={130} />
      <KenoBody cx={100} cy={118} />
      <KenoFeet cx={100} cy={170} />
      <KenoArms cx={100} cy={114} pose="excited" />
      <KenoHood cx={100} />
      {/* Playful face — wink one eye */}
      <ellipse cx={100} cy={72} rx={36} ry={32} fill="#EFF6FF" />
      <ellipse cx={78} cy={78} rx={9} ry={6} fill="#FBCFE8" opacity={0.6} />
      <ellipse cx={122} cy={78} rx={9} ry={6} fill="#FBCFE8" opacity={0.6} />
      {/* One eye open */}
      <circle cx={90} cy={66} r={8} fill="#0EA5E9" />
      <circle cx={90} cy={67} r={4.5} fill="#1E293B" />
      <circle cx={93} cy={64} r={1.8} fill="white" />
      {/* Wink */}
      <path d="M104,66 Q110,60 116,66" stroke="#0EA5E9" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <ellipse cx={100} cy={76} rx={4} ry={3} fill="#F9A8D4" />
      <path d="M88,83 Q100,92 112,83" stroke="#1E293B" strokeWidth={2} fill="none" strokeLinecap="round" />
      {/* Star */}
      <text x={148} y={22} fontSize={18} fill="#FCD34D">★</text>
    </svg>
  );
}

/** Curious — tilted head, wide eyes */
export function MascotCurious({ size = 180, className = "" }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g transform="rotate(-8, 100, 100)">
        <KenoTail cx={100} cy={130} />
        <KenoBody cx={100} cy={118} />
        <KenoFeet cx={100} cy={170} />
        <KenoArms cx={100} cy={114} pose="thinking" />
        <KenoHood cx={100} />
        <KenoFace cx={100} cy={70} expression="default" />
      </g>
      {/* ? bubble */}
      <circle cx={158} cy={20} r={16} fill="#6366F1" opacity={0.9} />
      <text x={151} y={27} fontSize={16} fill="white" fontWeight="bold">?</text>
    </svg>
  );
}

/** Coding / Hero pose — sitting at laptop with K logo */
export function MascotCoding({ size = 200, className = "" }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Platform glow */}
      <ellipse cx={110} cy={204} rx={80} ry={10} fill="#6366F1" opacity={0.25} />

      {/* Laptop base */}
      <rect x={42} y={154} width={136} height={8} rx={4} fill="#1E293B" />
      {/* Laptop screen */}
      <rect x={52} y={106} width={116} height={56} rx={6} fill="#0F172A" />
      {/* Screen glow */}
      <rect x={56} y={110} width={108} height={48} rx={4} fill="#1E3A5F" />
      {/* K logo on screen */}
      <text x={94} y={144} fontSize={32} fill="#6366F1" fontWeight="bold" fontFamily="monospace">K</text>
      {/* Screen edge highlight */}
      <rect x={52} y={106} width={116} height={4} rx={2} fill="#334155" />

      <KenoTail cx={110} cy={138} />
      <KenoBody cx={110} cy={128} />
      <KenoFeet cx={110} cy={160} />

      {/* Typing arms — slightly forward on keyboard */}
      <ellipse cx={68} cy={148} rx={18} ry={10} fill="#60A5FA" transform="rotate(10,68,148)" />
      <circle cx={62} cy={156} r={10} fill="#60A5FA" />
      <ellipse cx={60} cy={162} rx={5} ry={4} fill="#FBCFE8" />

      <ellipse cx={152} cy={148} rx={18} ry={10} fill="#60A5FA" transform="rotate(-10,152,148)" />
      <circle cx={158} cy={156} r={10} fill="#60A5FA" />
      <ellipse cx={160} cy={162} rx={5} ry={4} fill="#FBCFE8" />

      <KenoHood cx={110} />
      <KenoFace cx={110} cy={72} expression="default" />

      {/* Floating icons */}
      {/* </> icon */}
      <rect x={16} y={72} width={40} height={26} rx={6} fill="#6366F1" opacity={0.85} />
      <text x={19} y={91} fontSize={13} fill="white" fontFamily="monospace">&lt;/&gt;</text>

      {/* cursor icon */}
      <rect x={164} y={80} width={36} height={26} rx={6} fill="#0EA5E9" opacity={0.85} />
      <text x={170} y={98} fontSize={16} fill="white">▶</text>
    </svg>
  );
}

/** Intro / Loading — floating with holographic ring */
export function MascotIntro({ size = 180, className = "" }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Holographic ring */}
      <ellipse cx={100} cy={175} rx={70} ry={14} stroke="#6366F1" strokeWidth={3} fill="none" opacity={0.6} strokeDasharray="8 4" />
      <ellipse cx={100} cy={175} rx={55} ry={10} stroke="#93C5FD" strokeWidth={2} fill="none" opacity={0.4} />

      <KenoTail cx={100} cy={118} />
      <KenoBody cx={100} cy={106} />
      <KenoFeet cx={100} cy={150} />
      <KenoArms cx={100} cy={102} pose="happy" />
      <KenoHood cx={100} />
      <KenoFace cx={100} cy={58} expression="happy" />

      {/* Sparkles */}
      <text x={18} y={28} fontSize={16} fill="#FCD34D">✦</text>
      <text x={158} y={30} fontSize={12} fill="#FCD34D">✦</text>
      <text x={170} y={62} fontSize={9} fill="#93C5FD">✦</text>
    </svg>
  );
}

/** Shoulder pose — small and compact, sitting sideways */
export function MascotShoulder({ size = 120, className = "" }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Miniature laptop */}
      <rect x={58} y={130} width={84} height={6} rx={3} fill="#1E293B" />
      <rect x={64} y={96} width={72} height={40} rx={5} fill="#0F172A" />
      <rect x={68} y={100} width={64} height={32} rx={3} fill="#1E3A5F" />
      <text x={86} y={124} fontSize={18} fill="#6366F1" fontWeight="bold" fontFamily="monospace">K</text>

      <KenoTail cx={100} cy={118} />
      <KenoBody cx={100} cy={105} />

      {/* Arms over keyboard */}
      <ellipse cx={72} cy={128} rx={14} ry={8} fill="#60A5FA" />
      <ellipse cx={128} cy={128} rx={14} ry={8} fill="#60A5FA" />

      <KenoHood cx={100} />
      <KenoFace cx={100} cy={56} expression="default" />
    </svg>
  );
}

/**
 * Map from MascotPose key → SVG component
 */
export const MASCOT_SVG_MAP: Record<string, React.FC<SVGProps>> = {
  intro: MascotIntro,
  happy: MascotHappy,
  excited: MascotExcited,
  curious: MascotCurious,
  playful: MascotPlayful,
  thinking: MascotThinking,
  loading: MascotIntro,
  shoulder: MascotShoulder,
  navbar: MascotDefault,
  angry: MascotAngry,
  sleepy: MascotSleepy,
  love: MascotLove,
  coding: MascotCoding,
  default: MascotDefault,
};

