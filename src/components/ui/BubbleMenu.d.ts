import React, { CSSProperties, ReactNode } from 'react';

export interface MenuItemHoverStyles {
  bgColor?: string;
  textColor?: string;
}

export interface MenuItem {
  label: string;
  href: string;
  target?: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: MenuItemHoverStyles;
}

export interface BubbleMenuProps {
  logo?: ReactNode | string;
  onMenuClick?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items?: MenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
  isOpen?: boolean;
  onClose?: () => void;
  showNav?: boolean;
  variant?: 'default' | 'footer';
}

declare const BubbleMenu: React.ComponentType<BubbleMenuProps>;
export default BubbleMenu;

