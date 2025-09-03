import React from "react";
import { useRouter } from "next/navigation";
import { userStore } from "@/context/userStore";
import { logoutRequest } from "@/api/utils/tokenUtil";

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const { removeUser } = userStore();

  const handleLogout = () => {
    // 토큰 쿠키 삭제 (accessToken, refreshToken)
    logoutRequest();
    // context 상태도 초기화
    removeUser();
    // 홈페이지로 이동
    router.replace("/");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        background: "#e74c3c",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "16px",
        marginTop: "16px"
      }}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
