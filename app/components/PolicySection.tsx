import React from "react";
interface PolicySectionProps {
  readonly title: string;
  readonly text: string;
}

export default function PolicySection({ title, text }: PolicySectionProps) {
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
