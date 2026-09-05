import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

export function createIcon(path: string | React.ReactNode, viewBox = "0 0 24 24") {
  const IconComponent = ({ className = "w-5 h-5", size }: IconProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        width={size}
        height={size}
      >
        {typeof path === "string" ? <path d={path} /> : path}
      </svg>
    );
  };
  return IconComponent;
}