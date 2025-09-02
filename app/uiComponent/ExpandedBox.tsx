import React from "react";
import { POLICY_CONFIG, PolicyType } from "../../constants/policyConfig";

interface ExpandedBoxProps {
  readonly type: PolicyType;
  readonly onClose: () => void;
}

export default function ExpandedBox({ type, onClose }: ExpandedBoxProps) {
  const { src, title } = POLICY_CONFIG[type];
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 transition-all duration-500"
      style={{ animation: "fadeInBox 0.5s" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[70vh] flex flex-col relative transition-all duration-500"
        style={{ animation: "expandBox 0.5s" }}
      >
        <iframe
          src={src}
          title={title}
          width="100%"
          height="100%"
          style={{
            border: "none",
            borderRadius: "16px",
            flex: 1,
            background: "#fff",
          }}
        />
        <button
          className="absolute top-4 right-4 px-2 py-1 rounded bg-blue-300 text-white text-sm font-semibold shadow"
          onClick={onClose}
          style={{ cursor: "pointer" }}
        >
          닫기
        </button>
      </div>
      <style>{`
        @keyframes fadeInBox {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes expandBox {
          from { transform: scale(0.7); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
