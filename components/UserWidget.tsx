"use client";

import React from "react";
import { useEffect } from "react";
import { Globe, MessageCircle } from "lucide-react";
import PolicySection from "./PolicySection";
import SocialLoginButton from "./SocialLoginButtons";
import { useRouter } from "next/navigation";
import { useUserProfileCardFetch } from "@/hooks/useUserStore";
import { authStore } from "@/context/authStore";
import LogoutButton from "@/components/LogoutButton";
import SignupButton from "@/components/SignupButton";


export default function UserWidget() {
  const [isOpen, setIsOpen] = React.useState(false);

  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const { accessToken, isSigned } = authStore();
  useEffect(() => {
    if (!isSigned) {
      console.log("로그인 상태가 아닙니다. 로그인 ");
    }
  }, [isSigned]);
  useUserProfileCardFetch();

  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        로그인
      </button>
    );
  }

  return (
    // 전체 배경 (모달 뒷배경)
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-1/3">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between pb-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">로그인</h2>
          <button
            onClick={handleClose}
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
            {<PolicySection title="이용약관" text="이용약관 내용" />}
          </div>
        </div>
      </div>
    </div>
  );
}
