import React from "react";

export interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  focusStyle?: "brackets" | "box" | "underline" | "highlight";
  order?: "sequential" | "random";
  easing?: "smooth" | "spring";
  blurAmount?: number;
  focusScale?: number;
  borderColor?: string;
  highlightColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  cornerSize?: number;
  borderWidth?: number;
  unfocusedOpacity?: number;
  [key: string]: unknown;
}

declare const TrueFocus: React.ComponentType<TrueFocusProps>;
export default TrueFocus;

