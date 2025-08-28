"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserDispatch } from "../../../context/UserContext";
import { fetchUserData } from "../../../api/Interceptor";
import { isValidUUID,parseByIdFromToken, parseByEmailFromToken, parseByNicknameFromToken } from "../../../api/TokenUtil";

export default function AuthCallbackPage() {
  const router = useRouter();
  const dispatch = useUserDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const error = params.get("error");
    const message = params.get("message");

    const run = async () => {
      if (token) {
        const id = parseByIdFromToken(token);
        const email = parseByEmailFromToken(token);
        const nickname = parseByNicknameFromToken(token);
        if (!id || !isValidUUID(id)) {
          alert("잘못된 인증 정보입니다.");
          router.replace("/login");
          return;
        }
        dispatch({ type: "LOGIN", payload: { id, email: email ?? "", nickname: nickname ?? "" } });
        try {
          await fetchUserData(id);
          window.history.replaceState({}, document.title, window.location.pathname);
          router.replace("/");
        } catch {
          alert("인증 처리 중 오류 발생");
          router.replace("/login");
        }
      } else if (error) {
        alert(message || "인증에 실패했습니다.");
        router.replace("/login");
      }
    };
    run();
  }, [router, dispatch]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f6fa" }}>
      <div style={{ background: "#fff", borderRadius: "18px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: "40px 32px", width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>로그인 처리 중...</h2>
        <p style={{ color: "#888", fontSize: 15 }}>잠시만 기다려 주세요.</p>
      </div>
    </div>
  );
}