"use client";

import React from "react";
import { Globe, MessageCircle } from 'lucide-react';
import PolicySection from "../uiComponent/PolicySection";
import SocialLoginButton from "../uiComponent/SocialLoginButtons";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          로그인
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          환영합니다
        </p>
        <div className="space-y-4">
          <SocialLoginButton
            provider="google"
            label="Google 계정으로 로그인"
            icon={Globe}
            redirectUrl={'http://localhost:8080/oauth2/authorization/google'}
          />
          <SocialLoginButton
            provider="kakao"
            label="카카오 계정으로 로그인"
            icon={MessageCircle}
            redirectUrl={'http://localhost:8080/oauth2/authorization/kakao'}
          />
        </div>
          <div className="mt-20">{<PolicySection title="이용약관" text="이용약관 내용" />}</div>
      </div>
    </div>
  );
}

