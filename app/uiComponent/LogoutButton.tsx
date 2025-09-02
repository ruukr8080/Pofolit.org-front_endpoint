import React from "react";
import { useRouter } from "next/navigation";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    // 토큰 쿠키 삭제.
    // 추가적으로 context 상태도 초기화
    // 예: dispatch({ type: "LOGOUT" });
    // 로그인 페이지로 이동
    router.replace("/login");
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
