"use client";

import { useEffect, useState } from "react";
import PolicyBox from "../../components/PolicyBox";
import ExpandedBox from "../../components/ExpandedBox";
import { PolicyType } from "../../constants/policyConfig";


export default function PolicyPage() {
  const [hovered, setHovered] = useState<PolicyType | null>(null);
  const [expanded, setExpanded] = useState<PolicyType | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // SSR에서는 아무것도 렌더링하지 않음

  return (
    <div className="flex flex-col items-center gap-4 w-full transition-all duration-500 mt-8 px-8 py-4">
      {!expanded && (
        <>
          <PolicyBox
            type="privacy"
            hovered={hovered}
            onHover={setHovered}
            onExpand={setExpanded}
          />
          <PolicyBox
            type="terms"
            hovered={hovered}
            onHover={setHovered}
            onExpand={setExpanded}
          />
        </>
      )}
      {expanded && (
        <ExpandedBox type={expanded} onClose={() => setExpanded(null)} />
      )}
    </div>
  );
}