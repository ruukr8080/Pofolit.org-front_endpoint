import React from "react";
// import PolicyType from ".././constants/policyConfig";
interface PolicySectionProps {
  title: string;
  text: string;
}

export default function PolicySection({ title, text }: PolicySectionProps) {
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
