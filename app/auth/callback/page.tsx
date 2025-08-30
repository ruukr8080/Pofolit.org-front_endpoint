"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/api/UserService";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    getUser()
      .then((res) => {
        const user = res.data;
        router.replace(`/?nickname=${encodeURIComponent(user.nickname)}&email=${encodeURIComponent(user.email)}`);
      })
      .catch(() => {
        // router.replace("/login");
      });
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f6fa",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: "40px 32px",
          width: "100%",
          maxWidth: 360,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>
          로그인 처리 중...
        </h2>
        <p style={{ color: "#888", fontSize: 15 }}>잠시만 기다려 주세요.</p>
      </div>
    </div>
  );
}
