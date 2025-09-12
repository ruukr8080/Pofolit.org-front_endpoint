import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeUserInfo } from "@/store/userSlice";

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // 토큰 쿠키 삭제 (accessToken, refreshToken)학고 context 상태도 초기화
    dispatch(removeUserInfo());
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
        marginTop: "16px",
      }}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
