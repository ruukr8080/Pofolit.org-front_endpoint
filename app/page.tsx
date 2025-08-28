"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PolicySection from ".././components/PolicySection";
import { getUser } from ".././api/UserService";
import {
  isValidUUID,
  isValidEmail,
  isValidNickname,
  parseByIdFromToken,
  parseByEmailFromToken,
  parseByNicknameFromToken,
} from "../api/TokenUtil";
import { useUserState, useUserDispatch } from "../context/UserContext";
import { UserProfile } from ".././components/UserProfile";
import { User } from ".././api/types/UserField";

export default function HomePage() {
  const router = useRouter();
  const dispatch = useUserDispatch();
  const user = useUserState();
  const [isMounted, setIsMounted] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [showSignupButton, setShowSignupButton] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const showLoginButtonWithDelay = (delay: number) => {
      setTimeout(() => setShowLoginButton(true), delay);
    };
    const hideLoadingAndShowLoginButton = (
      loadingDelay: number,
      buttonDelay: number
    ) => {
      setTimeout(() => {
        setShowLoading(false);
        showLoginButtonWithDelay(buttonDelay);
      }, loadingDelay);
    };
    const fetchAndSetUser = async () => {
      if (!accessToken) {
        hideLoadingAndShowLoginButton(2700, 2000);
        setIsMounted(true);
        router.replace("/login");
        return;
      }
      const id = parseByIdFromToken(accessToken);
      const email = parseByEmailFromToken(accessToken);
      const nickname = parseByNicknameFromToken(accessToken);
      if (
        !id ||
        !isValidUUID(id) ||
        !isValidEmail(email ?? "") ||
        !isValidNickname(nickname ?? "")
      ) {
        hideLoadingAndShowLoginButton(2700, 2000);
        setIsMounted(true);
        router.replace("/login");
        return;
      }
      dispatch({
        type: "LOGIN",
        payload: { id, email: email ?? "", nickname: nickname ?? "" },
      });
      try {
        const response = await getUser(id);
        setIsMounted(true);
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
        if ((response.data as any).role === "ROLE_GUEST") {
          setTimeout(() => setShowSignupButton(true), 800);
        }
      } catch {
        hideLoadingAndShowLoginButton(2700, 2000);
        setIsMounted(true);
        router.replace("/login");
      }
    };
    fetchAndSetUser();
  }, [router, dispatch]);

  let userInfoContent;
  if (!isMounted || !user) {
    userInfoContent = (
      <div style={{ height: 32, position: "relative" }}>
        <h1 className="text-2xl font-bold text-center mb-4">메인 페이지</h1>
        <div
          className={`absolute left-1/2 -translate-x-1/2 mt-4 transition-opacity duration-700 ${
            showLoading ? "opacity-100" : "opacity-0"
          }`}
          style={{
            pointerEvents: "none",
          }}
        >
          Loading...
        </div>
        <button
          onClick={() => router.replace("/login")}
          className={`absolute left-1/2 -translate-x-1/2 mt-4 px-4 py-2 rounded bg-blue-500 text-white font-bold shadow transition-opacity duration-700 ${
            showLoginButton ? "opacity-100" : "opacity-0"
          }`}
          style={{
            pointerEvents: showLoginButton ? "auto" : "none",
          }}
        >
          Sign In
        </button>
      </div>
    );
  } else {
    userInfoContent = (
      <div className="text-center text-lg font-semibold ">
        {showSignupButton && (
          <button
            onClick={() => router.replace("/signup")}
            className="mt-6 px-4 py-2 rounded bg-green-500 text-white font-bold shadow hover:bg-green-600 transition"
          >
            추가 정보 입력
          </button>
        )}
        <button
          onClick={() => router.replace("/signup")}
          className={`mt-6 px-4 py-2 rounded bg-orange-500 text-white font-bold shadow transition-opacity duration-700 ${
            showSignupButton ? "opacity-100" : "opacity-0"
          }`}
          style={{
            pointerEvents: showSignupButton ? "auto" : "none",
          }}
        >
          프로필을 완성하러 가기
        </button>
      </div>
    );
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm"
        id="box"
        style={{ position: "relative", overflow: "hidden" }}
      >
        {userInfoContent}
        <div className="mt-20">
          {!user ? (
            <PolicySection title="이용약관" text="이용약관 내용" />
          ) : null}{" "}
        </div>
      </div>
    </main>
  );
}
