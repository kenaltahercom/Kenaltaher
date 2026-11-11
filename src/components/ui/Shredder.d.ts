import React from 'react';

export interface ShredderProps<T = any> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onShred?: (item: T) => void;
  onReorder?: (items: T[]) => void;
  width?: number;
  height?: number;
  inset?: number;
  gap?: number;
  slitHeight?: number;
  fallHeight?: number;
  feedSpeed?: number;
  bite?: number;
  autoFeed?: boolean;
  stripWidth?: number;
  curl?: number;
  autoAnimate?: boolean;
  loop?: boolean;
  loopAfterDelete?: boolean;
  dragTilt?: number;
  lift?: number;
  slitColor?: string;
  color?: string;
  disabled?: boolean;
  className?: string;
}

declare function Shredder<T = any>(props: ShredderProps<T>): React.ReactElement;
export default Shredder;

