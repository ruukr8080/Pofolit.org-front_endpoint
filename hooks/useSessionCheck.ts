import { useEffect } from "react";
import { getUserRequest } from "@/api/utils/userUtil";
import { authStore } from "@/context/authStore";

/**
 * 애플리케이션이 로드될 때마다 유저 세션을 확인하는 훅
 *
 * @description
 * 1. 컴포넌트 마운트 시점에 `getUserRequest`를 호출하여 서버에 유저 정보 요청
 * 2. 요청 성공 시: 유저 정보를 Zustand 스토어에 저장 (로그인 상태 유지)
 * 3. 요청 실패 시:
 * - 토큰이 만료되었거나 유효하지 않은 경우, `axios` 인터셉터가 자동 재발급을 시도
 * - 재발급 실패 시, `useUserStore().logout()` 호출하여 강제 로그아웃 처리
 */
export const useSessionCheck = () => {
  const { setAuthState, logout } = authStore();


  useEffect(() => {
    // 세션 체크 로직
    setAuthState("");
    const checkSession = async () => {
      try {
        const res = await getUserRequest();
        // 응답 데이터가 null이 아니면 로그인 상태 유지
        if (res.data) {
          console.log("세션 복구 성공:", res.data);
          // login(true, ""); // accessToken은 빈 문자열로 전달
        } else {
          // 서버에서 유저 정보가 null로 응답되면 로그아웃 처리
          console.log("유효한 세션이 없습니다.");
          logout();
        }
      } catch (error) {
        // API 요청 실패 시 로그아웃
        // console.error("세션 확인 중 오류 발생:", error);
        // logout();
      }
    };

    checkSession();
  }, [setAuthState, logout]);
};
