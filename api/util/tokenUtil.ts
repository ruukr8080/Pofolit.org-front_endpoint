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