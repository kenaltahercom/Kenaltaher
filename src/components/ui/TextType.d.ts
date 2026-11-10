import React from "react";

export interface TextTypeProps {
  text?: string | string[];
  as?: keyof React.JSX.IntrinsicElements;
  prefix?: string;
  prefixColor?: string;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  deleteMode?: "backspace" | "select";
  typeEffect?: "none" | "fade" | "blur" | "rise";
  mistakes?: number;
  variableSpeed?: { min: number; max: number };
  loop?: boolean;
  showCursor?: boolean;
  cursorStyle?: "character" | "bar" | "block" | "underscore";
  cursorCharacter?: React.ReactNode;
  cursorColor?: string;
  cursorBlinkDuration?: number;
  cursorGlide?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorClassName?: string;
  className?: string;
  textColors?: string[];
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
  [key: string]: unknown;
}

declare const TextType: React.ComponentType<TextTypeProps>;
export default TextType;

