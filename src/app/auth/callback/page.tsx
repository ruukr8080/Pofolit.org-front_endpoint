// app/auth/callback/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSignState } from "@/store/authSlice";

export default function AuthCallbackPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  console.log("AuthCallbackPage useEffect 진입");
  // 1. accessToken을 쿠키에서 읽어 로컬스토리지에 저장
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };
  const accessToken = getCookie("pre");
  console.log("pre:", accessToken);
  if (accessToken) {
    localStorage.setItem("pre", accessToken);
    dispatch(setSignState(accessToken));
    // 인증 인스턴스만 store/로컬스토리지에 저장 (유저 정보 fetch는 Header에서 처리)
    router.replace("/");
  }

  // user 정보는 accessToken 준비 이벤트("authed")를 통해 한 번만 가져오도록 변경
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
        <div style={{ marginTop: 20, fontSize: 14, color: "#888" }}>
          <a href="http://localhost:3000/">홈으로 돌아가기</a>
        </div>
      </div>
    </div>
  );
}
