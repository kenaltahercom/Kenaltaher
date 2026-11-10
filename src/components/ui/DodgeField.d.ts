import React, { CSSProperties, ReactNode } from "react";

export interface DodgeFieldState {
  dodges: number;
  gave: boolean;
  caught: boolean;
  fleeing: boolean;
}

export interface DodgeFieldProps {
  children?: ReactNode | ((state: DodgeFieldState) => ReactNode);
  taunts?: string[];
  notice?: string;
  inkColor?: string;
  contrastColor?: string;
  fieldHeight?: number;
  reach?: number;
  radius?: number;
  falloff?: number;
  fleeDuration?: number;
  returnDuration?: number;
  returnBounce?: number;
  axis?: "both" | "x" | "y";
  wall?: "clamp" | "bounce";
  patience?: number;
  disabled?: boolean;
  onDodge?: (count: number) => void;
  onRelent?: () => void;
  onCatch?: () => void;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

declare const DodgeField: React.ComponentType<DodgeFieldProps>;
export default DodgeField;

