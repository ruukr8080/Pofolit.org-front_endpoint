// src/hooks/useAuthCookieSync.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSignState } from "@/store/authSlice";
import { setUserState, removeUserInfo } from "@/store/userSlice";

function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

// 토큰 만료 확인 함수
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

// 보안 쿠키 설정 함수
const setSecureCookie = (
  name: string,
  value: string,
  maxAge: number = 3600
) => {
  const secure = process.env.NODE_ENV === "production" ? "; secure" : "";
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; samesite=strict${secure}`;
};

export function useAccessTokenSync() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie("accessToken") || getCookie("pre");

    if (token && !isTokenExpired(token)) {
      dispatch(setSignState(token));

      // 유저 정보 요청 및 저장
      fetch("/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data && !data.error) {
            dispatch(setUserState(data));
          } else {
            console.warn("유저 정보 조회 실패:", data);
            dispatch(removeUserInfo());
          }
        })
        .catch((error) => {
          console.error("유저 정보 조회 중 오류:", error);
          dispatch(removeUserInfo());
        });
    } else if (token && isTokenExpired(token)) {
      console.warn("토큰이 만료되었습니다. 로그아웃 처리합니다.");
      // 만료된 토큰 제거
      document.cookie =
        "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "pre=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      dispatch(setSignState(null));
      dispatch(removeUserInfo());
    } else {
      // 토큰이 없는 경우
      dispatch(setSignState(null));
      dispatch(removeUserInfo());
    }
  }, [dispatch]);
}
