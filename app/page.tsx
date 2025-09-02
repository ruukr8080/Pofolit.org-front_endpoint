"use client";
import { useUserStore } from "@/context/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/app/uiComponent/LogoutButton";
import SignupButton from "@/app/uiComponent/SignupButton";

export default function HomePage() {
  // Zustand 스토어에서 유저 상태와 로그인 여부를 바로 가져옵니다.
  const { user, isLoggedIn } = useUserStore();
  const router = useRouter();

  // 로그인 상태가 아니면 로그인 페이지로.
  // AuthCallbackPage에서 이미 유저 정보를 스토어에 저장했으므로,
  // 이 페이지는 단순히 스토어에서 데이터를 읽기만 하면 됩니다.
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm"
          id="box"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <p className="text-center text-gray-500">리디렉션 중...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm"
        id="box"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <h1 className="text-2xl font-bold text-center mb-4">메인 페이지</h1>
        <div className="text-center">
          {user.profileImageUrl && (
            <img
              src={user.profileImageUrl}
              alt="프로필 이미지"
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                margin: "0 auto 12px auto",
              }}
            />
          )}
          <div style={{ fontWeight: 700, fontSize: 18 }}>{user.nickname}</div>
          <div style={{ color: "#888", fontSize: 15, marginBottom: 12 }}>
            {user.email}
          </div>
          <SignupButton />
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}