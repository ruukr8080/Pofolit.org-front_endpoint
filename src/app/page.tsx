// app/page.tsx

"use client";

import { useSelector } from "react-redux";
import LogoutButton from "@/components/LogoutButton";

export default function HomePage() {
  const user = useSelector(
    (state: import("@/store/store").RootState) => state.user
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm"
        id="box"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <h1 className="text-2xl font-bold text-center mb-4">메인 페이지</h1>
        <div className="text-center">
          {user?.profileImageUrl && (
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
          <div style={{ fontWeight: 700, fontSize: 18 }}>
            {user?.nickname ?? ""}
          </div>
          <div style={{ color: "#888", fontSize: 15, marginBottom: 12 }}>
            {user?.email ?? ""}
          </div>
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
