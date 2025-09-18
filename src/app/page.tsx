// app/page.tsx

"use client";

import { Suspense } from "react";
import { UserProfile } from "@/components/UserProfile";
import { useUserProfile } from "@/hooks/useUserProfile";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useGetPreStatusQuery } from "@/store/apiConfig";

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
  // 최초 진입 시 pre 상태 확인
  const { data: preData, isLoading: preLoading, error: preError } = useGetPreStatusQuery();

  if (preLoading) return <LoadingSpinner />;
  if (preError) return <div className="text-red-500">pre 상태 확인 실패</div>;
  // preData 활용 가능 (예: pre 토큰, 세션 상태 등)
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
