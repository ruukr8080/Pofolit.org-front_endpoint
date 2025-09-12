import React, { useEffect } from "react";
import UserWidget from "@/components/UserWidget";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { setUserState, removeUserInfo } from "@/store/userSlice";
import { useGetUserInfoQuery } from "@/store/apiConfig";
import { logout } from "@/store/authSlice";
import UserAvatar from "../UserAvartar";
import SignupButton from "../SignupButton";

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
        placeholder="검색..."
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring"
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

  // RTK Query로 유저 정보 fetch (자동 deduplication)
  const { data, error, isSuccess } = useGetUserInfoQuery(undefined, {
    skip: !isSigned || !pre,
  });

  useEffect(() => {
    console.log("[HeaderDesktopUser] user state:", user);
    if (isSuccess && data?.data) {
      dispatch(setUserState(data.data));
    }
    if (error && "status" in error && error.status === 401) {
      dispatch(removeUserInfo());
      dispatch(logout());
      window.dispatchEvent(
        new CustomEvent("globalError", {
          detail: "인증이 만료되었습니다. 다시 로그인 해주세요.",
        })
      );
    } else if (error) {
      window.dispatchEvent(
        new CustomEvent("globalError", { detail: "유저 정보 조회 실패" })
      );
    }
  }, [isSuccess, data, error, dispatch]);

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
          <UserWidget open={showUserWidget} onClose={handleWidgetClose} />
        </>
      ) : (
        <>
          <SignupButton />
          <UserWidget open={showUserWidget} onClose={handleWidgetClose} />
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
