// context/hooks/useAuthCallback.ts

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserRequest } from "@/api/util/userUtil";
import { useUserStore } from "@/context/store";
import { User } from "@/api/type/userType";

export const useAuthCallback = () => {
  const router = useRouter();
  const { login } = useUserStore();

  useEffect(() => {
    // 세션 체크 로직
    getUserRequest()
      .then((res) => {
        // 백엔드 응답이 순수 `User` 객체를 반환하므로, `res.data`를 사용합니다.
        const user: User = res.data;
        if (user != null) {
          console.log("세션 복구 성공:", user);
          login(user);
          // 로그인 상태가 유효하면 라우팅하지 않고 현재 페이지에 머무릅니다.
          // router.replace("/"); // 콜백 페이지에서만 사용
        } else {
          console.log("유저 정보 null:", user);
          // 유저 정보가 없으면 로그인 페이지로 이동시킵니다.
          router.replace("/login");
        }
      })
      .catch((error) => {
        console.error("세션 체크 실패:", error);
        // 요청 실패 시 로그인 페이지로 이동합니다.
        router.replace("/login");
      });
  }, [router, login]);
};
