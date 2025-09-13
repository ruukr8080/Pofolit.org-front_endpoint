"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Globe, MessageCircle } from "lucide-react";
import SocialLoginButton from "./SocialLoginButtons";

interface UserWidgetProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

// eslint-disable-next-line react/prop-types
export default function UserWidget({
  open,
  onClose,
}: Readonly<UserWidgetProps>) {
  const isSigned = useSelector(
    (state: import("@/store/store").RootState) => !!state.auth.pre
  );

  useEffect(() => {
    // 로그인 상태가 아닐 때 추가 처리 필요 시 여기에 작성
  }, [isSigned]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 animate-fade-in">
      <div className="bg-white max-h-1/2 rounded-lg shadow-xl p-8 w-11/12 md:w-1/3 transition-all duration-300 scale-100">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between pb-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">로그인</h2>
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
        {/* widget */}
        <div className="mt-4 space-y-4">
          <p className="text-gray-600">환영합니다.</p>
          <div className="space-y-4">
            <SocialLoginButton
              provider="google"
              label="Google 계정으로 로그인"
              icon={Globe}
              redirectUrl={"http://localhost:8080/oauth2/authorization/google"}
            />
            <SocialLoginButton
              provider="kakao"
              label="카카오 계정으로 로그인"
              icon={MessageCircle}
              redirectUrl={"http://localhost:8080/oauth2/authorization/kakao"}
            />
          </div>
          <div className="mt-20">
            {/* Policy 컴포넌트가 기본 export가 아니거나, props 타입이 다를 경우 아래 주석 참고 */}
            {/* <Policy sub="이용약관" text="이용약관 내용" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
