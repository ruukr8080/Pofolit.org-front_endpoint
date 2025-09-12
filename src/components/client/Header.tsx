import React from "react";
import UserWidget from "@/components/UserWidget";
import { useSelector } from "react-redux";
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
  const isSigned = useSelector((state: any) => state.auth.isSigned);
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
          <UserAvatar
            imageUrl="https://via.placeholder.com/80"
            altText="User Avatar"
          />
          <UserWidget />
        </>
      ) : (
        <>
          <SignupButton />
          <UserWidget />
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
