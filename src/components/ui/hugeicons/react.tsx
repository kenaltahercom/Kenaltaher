import React from "react";

type HugeIconComponent = React.ComponentType<
  React.SVGProps<SVGSVGElement> & {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }
>;

export interface HugeiconsIconProps extends React.SVGProps<SVGSVGElement> {
  icon: HugeIconComponent | React.ReactNode;
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  className?: string;
}

export const HugeiconsIcon: React.FC<HugeiconsIconProps> = ({
  icon: Icon,
  size = 20,
  color = "currentColor",
  strokeWidth = 1.75,
  className = "",
  ...props
}) => {
  if (!Icon) return null;
  if (typeof Icon === "function") {
    const IconComponent = Icon as HugeIconComponent;
    return (
      <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...props}
      />
    );
  }
  return <span className={className}>{Icon}</span>;
};

