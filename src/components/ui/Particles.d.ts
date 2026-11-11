import React from 'react';

export interface ParticlesProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  particleBaseSize?: number;
  sizeRandomness?: number;
  shape?: 'circle' | 'square' | 'ring' | 'sparkle';
  glow?: number;
  twinkle?: number;
  depthOfField?: number;
  connections?: boolean;
  connectionDistance?: number;
  drift?: 'none' | 'up' | 'down' | 'forward';
  driftSpeed?: number;
  moveParticlesOnHover?: boolean;
  hoverEffect?: 'parallax' | 'repel' | 'attract';
  particleHoverFactor?: number;
  hoverRadius?: number;
  clickBurst?: boolean;
  alphaParticles?: boolean;
  cameraDistance?: number;
  disableRotation?: boolean;
  variation?: number;
  intro?: boolean;
  opacity?: number;
  lightMode?: boolean;
  paused?: boolean;
  pixelRatio?: number;
  className?: string;
  style?: React.CSSProperties;
}

declare const Particles: React.FC<ParticlesProps>;
export default Particles;

