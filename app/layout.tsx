"use client";

import { useSessionCheck } from "@/context/hook/useSessionCheck"; 
import ".././styles/globals.css";


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useSessionCheck();
  return (
    <html
      lang="en"
      data-darkreader-mode="dynamic"
      data-darkreader-scheme="dark"
      data-darkreader-proxy-injected="true"
      data-darkreader-inline-stroke="ok"
      style={
        {
          ["--darkreader-inline-stroke"]: "currentColor",
        } as React.CSSProperties
      }
    >
      <body>{children}</body>
    </html>
  );
}
