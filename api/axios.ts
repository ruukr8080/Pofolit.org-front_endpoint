import axios from "axios";
import { ex } from "@/api/handlers/customExceptionHandler";
import type { AxiosError } from "axios";
import { reissueToken } from "@/api/utils/tokenUtil";
import { AppErrorCode } from "@/api/types/apiCode";
import { authStore } from "@/context/authStore";

// 타입스크립트 오류 해결을 위해 AxiosRequestConfig에 _retry 속성을 추가합니다.
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

/**
 * 요청 및 응답 인터셉터입니다.
 * "/api/v1/auth" 로 시작하는 모든 API 요청 인스턴스에 적용합니다.
 */
const instance = axios.create({
  baseURL: "/api/v1/auth",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// 요청 인터셉터: accessToken을 헤더에 자동 포함
instance.interceptors.request.use(
  (config) => {
    const accessToken = authStore.getState().accessToken;
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(new Error(`요청 인터셉터 오류: ${error.message}`))
);

export default instance;
  

instance.interceptors.response.use(

);

/** 모든 에러 응답을 처리하는 인터셉터
 * 응답이 없거나 http 에러가 발생한 경우 실행합니다.
 */
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    const responseData = error.response?.data as { error?: AppErrorCode };

    // Http 401 에러와 백엔드에서 내려준 커스텀 에러 코드를 함께 확인합니다.
    if (error.response?.status === 401 && responseData?.error === AppErrorCode.EXPIRED_TOKEN) {
      
      // 토큰 재발급 로직은 재시도 플래그가 없는 경우에만 실행하여 무한 루프를 방지합니다.
       if (!originalRequest?._retry) {
        originalRequest!._retry = true; // 재시도 플래그 설정 originalRequest는 null 가능성이 없기 떄문에 !타입 단언 사용
        try {
          await reissueToken();
          // 재발급 성공 시 원래 요청 재시도
          // originalRequest가 존재하는지 확인하고 재시도합니다.
          if (originalRequest) {
            return instance(originalRequest);
          }
        } catch (reissueError) {
          // 재발급 실패 시 로그아웃 처리
          console.error("토큰 재발급 실패:", reissueError);
          // 여기에 로그아웃 로직 추가
          // 예: useUserStore.getState().logout();
          return Promise.reject(new Error(`토큰 재발급 실패: ${reissueError}`));
        }
      }
    }
    // 다른 모든 에러는 customExceptionHandler로 넘겨서 처리합니다.
    if (error.response) {
      ex(error);
    } else {
      console.error("네트워크 오류 발생:", error.message);
      return Promise.reject(new Error("네트워크 오류가 발생했습니다."));
    }
    return Promise.reject(error);
  }
);


