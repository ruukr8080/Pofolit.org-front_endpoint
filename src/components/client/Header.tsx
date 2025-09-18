import React, { useEffect } from "react";
import HeaderWidget from "@/components/HeaderWidget";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { setUserState, removeUserInfo } from "@/store/userSlice";
import {
  useGetUserInfoQuery,
  useExchangePreTokenMutation,
} from "@/store/apiConfig";
import { logout, setSignState } from "@/store/authSlice";
import UserAvatar from "../UserAvartar";
import SignupButton from "../SignupButton";

// 쿠키 관련 유틸리티 함수들
const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

const setCookie = (name: string, value: string, maxAge: number = 3600) => {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
};

// 데스크탑 메인 로고/타이틀 영역
function HeaderDesktopMain() {
  return (
    <div className="flex items-center gap-4">
      <span className="text-2xl font-bold text-blue-600">Pofolit</span>
    </div>
  );
}

// 검색 폼 영역
function HeaderFormSearch() {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        id="search-input"
        name="search"
        placeholder="검색..."
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring"
        autoComplete="search"
      />
      <button
        type="submit"
        className="px-3 py-2 bg-blue-500 text-white rounded-lg"
      >
        검색
      </button>
    </form>
  );
}

// 데스크탑 액션 영역 (스페이서, 햄버거, 아바타/로그인)
function HeaderDesktopAction() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1" /> {/* y-Spacer */}
    </div>
  );
}

// 데스크탑 액션 영역 (아바타/로그인버튼)
function HeaderDesktopUser() {
  const dispatch = useDispatch();
  const isSigned = useSelector((state: RootState) => !!state.auth.pre);
  const user = useSelector((state: RootState) => state.user);
  const profileImageUrl = user.profileImageUrl;
  const pre = useSelector((state: RootState) => state.auth.pre);
  const [showUserWidget, setShowUserWidget] = React.useState(false);

  // accessToken이 있는지 확인
  const hasAccessToken = !!getCookie("accessToken");

  // 토큰 교환 및 유저 정보 조회
  const [exchangePreToken] = useExchangePreTokenMutation();
  const { data, error, isSuccess } = useGetUserInfoQuery(undefined, {
    skip: !isSigned || !pre || hasAccessToken, // accessToken이 있으면 skip
  });

  // preToken이 있고 accessToken이 없으면 토큰 교환 실행
  useEffect(() => {
    if (isSigned && pre && !hasAccessToken) {
      console.log("[Header] preToken으로 토큰 교환 시작:", pre);
      exchangePreToken({ preToken: pre })
        .unwrap()
        .then((response) => {
          console.log("[Header] 토큰 교환 성공:", response);
          // accessToken과 refreshToken을 쿠키에 저장
          setCookie(
            "accessToken",
            response.accessToken,
            response.expiresIn || 3600
          );
          setCookie("refreshToken", response.refreshToken, 86400 * 7); // 7일

          // preToken 쿠키 제거 (더 이상 필요 없음)
          document.cookie =
            "pre=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

          // Redux 상태 업데이트
          dispatch(setSignState(response.accessToken));
        })
        .catch((error) => {
          console.error("[Header] 토큰 교환 실패:", error);
          window.dispatchEvent(
            new CustomEvent("globalError", {
              detail: "토큰 교환에 실패했습니다. 다시 로그인 해주세요.",
            })
          );
        });
    }
  }, [isSigned, pre, hasAccessToken, exchangePreToken, dispatch]);

  // UserAvatar 클릭 시 UserWidget 모달 오픈
  const handleAvatarClick = () => setShowUserWidget(true);
  const handleWidgetClose = () => setShowUserWidget(false);

  return (
    <div className="flex items-center gap-2">
      <button className="p-2 rounded-lg hover:bg-gray-100">
        {/* 햄버거 아이콘 */}
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      {isSigned ? (
        <>
          <button
            type="button"
            className="cursor-pointer bg-transparent border-none p-0"
            onClick={handleAvatarClick}
            aria-label="프로필 열기"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleAvatarClick();
            }}
          >
            <UserAvatar
              imageUrl={profileImageUrl || "https://via.placeholder.com/80"}
              altText="avatar"
            />
          </button>
          <HeaderWidget open={showUserWidget} onClose={handleWidgetClose} />
        </>
      ) : (
        <>
          <button
            onClick={handleAvatarClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            aria-label="로그인"
          >
            로그인
          </button>
          <SignupButton />
          <HeaderWidget open={showUserWidget} onClose={handleWidgetClose} />
        </>
      )}
    </div>
  );
}

export default function Header() {
  return (
    <header className="w-full bg-white shadow flex items-center px-6 py-3 justify-between">
      <HeaderDesktopMain />
      <HeaderFormSearch />
      <HeaderDesktopAction />
      <HeaderDesktopUser />
    </header>
  );
}
