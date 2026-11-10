import React from "react";

export interface HugeIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
}

export const VolumeLowIcon: React.FC<HugeIconProps> = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.75,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M11 5L6 9H2V15H6L11 19V5Z" />
    <path d="M15.5 8.5C16.5 9.5 17 10.7 17 12C17 13.3 16.5 14.5 15.5 15.5" />
  </svg>
);

export const VolumeHighIcon: React.FC<HugeIconProps> = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.75,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M11 5L6 9H2V15H6L11 19V5Z" />
    <path d="M15.5 8.5C16.5 9.5 17 10.7 17 12C17 13.3 16.5 14.5 15.5 15.5" />
    <path d="M19 5C20.8 6.9 22 9.3 22 12C22 14.7 20.8 17.1 19 19" />
  </svg>
);

export const ArrowUpRight01Icon: React.FC<HugeIconProps> = ({
  size = 14,
  color = "currentColor",
  strokeWidth = 2,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);



export const Notification03Icon: React.FC<HugeIconProps> = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M6 16.5V10a6 6 0 0 1 12 0v6.5l1.6 2.3H4.4L6 16.5z" />
    <path d="M10 20.5a2 2 0 0 0 4 0" />
    <path d="M12 2.5V4" />
  </svg>
);
