// app/page.tsx

"use client";

import { Suspense } from "react";
import { UserProfile } from "@/components/UserProfile";
import { useUserProfile } from "@/hooks/useUserProfile";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useGetPreStatusQuery, useGetUserInfoQuery } from "@/store/apiConfig";

function UserProfileSection() {
  const { user, isLoading, error, handleLogout } = useUserProfile();

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-red-500">사용자 정보를 불러올 수 없습니다.</div>
    );
  if (!user) return <div>로그인이 필요합니다.</div>;

  return (
    <div className="text-center">
      <UserProfile user={user} />
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        로그아웃
      </button>
    </div>
  );
}

export default function HomePage() {
  // 최초 진입 시 refreshToken 확인
  function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }
  const refreshToken = getCookie("refreshToken");

  // refreshToken이 있으면 users/me 요청, 없으면 pre 상태만 확인
  const { isLoading: userLoading, error: userError } = useGetUserInfoQuery(
    undefined,
    {
      skip: !refreshToken,
    }
  );
  const { isLoading: preLoading, error: preError } = useGetPreStatusQuery(
    undefined,
    {
      skip: !!refreshToken,
    }
  );

  if (userLoading || preLoading) return <LoadingSpinner />;
  if (userError) return <div className="text-red-500">유저 정보 확인 실패</div>;
  if (preError) return <div className="text-red-500">pre 상태 확인 실패</div>;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm"
        id="box"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <h1 className="text-2xl font-bold text-center mb-4">메인 페이지</h1>
        <Suspense fallback={<LoadingSpinner />}>
          <UserProfileSection />
        </Suspense>
      </div>
    </main>
  );
}
