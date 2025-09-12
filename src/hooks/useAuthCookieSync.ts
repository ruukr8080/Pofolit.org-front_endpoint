// src/hooks/useAuthCookieSync.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSignState } from "@/store/authSlice";

function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export function useAccessTokenSync() {
  const dispatch = useDispatch();
  useEffect(() => {
    const pre = getCookie("pre");
    if (pre) {
      dispatch(setSignState(pre));
      // 유저정보 요청: accessToken을 Authorization 헤더에 넣어서 fetch
      fetch("/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${pre}`,
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          // 유저정보를 store에 저장하려면 dispatch(setUserState(data)) 등 추가
          // 예: dispatch(setUserState(data));
        });
    }
  }, [dispatch]);
}
