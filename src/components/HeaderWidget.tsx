"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Globe, MessageCircle, LogOut, User } from "lucide-react";
import SocialLoginButton from "./SocialLoginButtons";
import type { RootState } from "@/store/store";
import { logout } from "@/store/authSlice";
import { removeUserInfo } from "@/store/userSlice";
import { useRouter } from "next/navigation";

interface HeaderWidgetProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

// eslint-disable-next-line react/prop-types
export default function HeaderWidget({
  open,
  onClose,
}: Readonly<HeaderWidgetProps>) {
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux에서 상태 가져오기
  const isSigned = useSelector((state: RootState) => !!state.auth.pre);
  const user = useSelector((state: RootState) => state.user);

  // 로그아웃 핸들러
  const handleLogout = () => {
    // 쿠키 제거
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "pre=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Redux 상태 초기화
    dispatch(logout());
    dispatch(removeUserInfo());

    // 모달 닫기 및 홈으로 이동
    onClose();
    router.replace("/");
  };

  useEffect(() => {
    // 로그인 상태가 아닐 때 추가 처리 필요 시 여기에 작성
  }, [isSigned]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 animate-fade-in">
      <div className="bg-white max-h-1/2 rounded-lg shadow-xl p-8 w-11/12 md:w-1/3 transition-all duration-300 scale-100">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between pb-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {isSigned ? "프로필" : "로그인"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {/* 닫기(X) 아이콘 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 위젯 내용 */}
        <div className="mt-4 space-y-4">
          {isSigned ? (
            // 로그인된 상태: 유저 정보 표시
            <>
              <div className="text-center">
                {user?.profileImageUrl && (
                  <img
                    src={user.profileImageUrl}
                    alt="프로필 이미지"
                    className="w-16 h-16 rounded-full mx-auto mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-800">
                  {user?.nickname || "사용자"}
                </h3>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    // 프로필 페이지로 이동 (추후 구현)
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5 text-gray-600" />
                  <span>프로필 설정</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span>로그아웃</span>
                </button>
              </div>
            </>
          ) : (
            // 로그인되지 않은 상태: 로그인 옵션 표시
            <>
              <p className="text-gray-600">환영합니다.</p>
              <div className="space-y-4">
                <SocialLoginButton
                  provider="google"
                  label="Google 계정으로 로그인"
                  icon={Globe}
                  redirectUrl={
                    "http://localhost:8080/oauth2/authorization/google"
                  }
                />
                <SocialLoginButton
                  provider="kakao"
                  label="카카오 계정으로 로그인"
                  icon={MessageCircle}
                  redirectUrl={
                    "http://localhost:8080/oauth2/authorization/kakao"
                  }
                />
              </div>
              <div className="mt-20">
                {/* Policy 컴포넌트가 기본 export가 아니거나, props 타입이 다를 경우 아래 주석 참고 */}
                {/* <Policy sub="이용약관" text="이용약관 내용" /> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
