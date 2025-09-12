"use client";

import React from "react";

interface LoadingSpinnerProps {
  readonly size?: number;
  readonly color?: string;
}

export default function LoadingSpinner({
  size = 48,
  color = "#2563eb",
}: LoadingSpinnerProps) {
  return (
    <output
      aria-label="로딩 중"
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        style={{ display: "block" }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeDasharray="31.4 31.4"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </output>
  );
}
