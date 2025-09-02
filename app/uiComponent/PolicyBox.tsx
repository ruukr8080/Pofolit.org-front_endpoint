import React from "react";
import { POLICY_CONFIG, PolicyType } from "../../constants/policyConfig";
import  PolicySection  from "./PolicySection";

interface PolicyBoxProps {
  readonly type: PolicyType;
  readonly hovered: PolicyType | null;
  readonly onHover: (type: PolicyType | null) => void;
  readonly onExpand: (type: PolicyType) => void;
}

export default function PolicyBox({ type, hovered, onHover, onExpand }: PolicyBoxProps) {
  const { src, title } = POLICY_CONFIG[type];
  const isHovered = hovered === type;
  const isOtherHovered = hovered && hovered !== type;

  const boxClass =
    isHovered
      ? "scale-105 z-10"
      : isOtherHovered
      ? "scale-90 opacity-60"
      : "";

  return (
    <button
      type="button"
      className={`relative w-full transition-all duration-300 ${boxClass}`}
      onMouseEnter={() => onHover(type)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(type)}
      onBlur={() => onHover(null)}
      onClick={() => onExpand(type)}
      style={{ transition: "all 0.3s", outline: "none" }}
      aria-label={title + " 더 크게 보기"}
    >
      <iframe
        src={src}
        title={title}
        width="100%"
        height="60"
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          transition: "all 0.3s",
          background: "#fff",
        }}
      />
      <PolicySection title={title} text={src} />
      <span
        className={`absolute right-4 top-4 px-3 py-1 rounded bg-blue-300 text-white text-xs font-semibold shadow transition-all duration-300 ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 pointer-events-none -translate-x-8"
        }`}
        style={{
          cursor: "default",
          transition: "all 0.3s",
        }}
      >
        더 크게 보기
      </span>
    </button>
  );
}
