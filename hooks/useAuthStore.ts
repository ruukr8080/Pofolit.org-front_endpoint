// context/hook/useAuthStore.ts

import { useEffect } from "react";
import { authStore } from "@/context/authStore";

export const useAuthStore  = () => {
  const { setAuthState } = authStore();

  useEffect(() => {
    // 1. extract accessToken from url_hash or querry accessToken
    const hash = window.location.hash;
    const accessToken = hash ? hash.replace("#accessToken=", "") : "";
    if (accessToken) {
      // 2. accessToken만 zustand에 저장
      setAuthState(accessToken); // 첫 번째 인수는 true (로그인 상태)
    } else {
      console.error("No accessToken found in URL");
    }
  }, [setAuthState]);
};

