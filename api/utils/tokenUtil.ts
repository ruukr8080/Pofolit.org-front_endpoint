import instance from "@/api/axios";


/**
 * refreshToken을 사용하여 accessToken을 재발급합니다.
 * 백엔드에서 HttpOnly 쿠키에 담긴 refreshToken을 자동으로 사용합니다.
 * @returns 새로 발급된 토큰을 포함한 응답
 */
export const reissueToken = async () => {
  try {
    const response = await instance.post("/api/v1/auth/token/reissue");
    return response.data;
  } catch (error) {
    throw new Error("토큰 재발급 실패");
  }
};


/**
 * 로그아웃 합니다. (서버에서 세션/쿠키 삭제 요청)
 */
export const logoutRequest = () => instance.post("/api/v1/auth/logout");


/**
 * 응답 헤더에서 accessToken을 추출합니다.
 * @param response AxiosResponse 객체
 * @returns accessToken 문자열 (없으면 빈 문자열)
 */
export function getSignHeader(response: any): string {
  // Axios에서는 headers 객체로 반환됨
  return response.headers?.["Authorization"] || "";
}

