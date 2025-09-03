import instance from "@/api/axios";
import { ApiResult } from "@/api/types/apiResult";
import { UserRequest } from "@/api/types/apiUser";

// 유저 관련 API 요청 함수들을 정의합니다.
// 모든 요청은 HttpOnly 쿠키와 함께 자동으로 처리됩니다.

/**
 * oauth2 로그인 이후 로그인된 유저의 정보를 가져옵니다.
 */
export const getUserRequest = () => instance.get<UserRequest>(`/users/me`);

/**
 * 회원가입을 처리합니다.
 * @param data 회원가입에 필요한 유저 정보
 */
export const signupRequest = (data: Partial<UserRequest>) =>
  instance.patch<ApiResult<UserRequest>>("/api/v1/auth/users/signup", data);

/**
 * 유저 정보를 업데이트합니다.
 * @param data 업데이트할 유저 정보
 */
export const updateUserRequest = (data: Partial<UserRequest>) =>
  instance.patch<ApiResult<UserRequest>>("/api/v1/auth/users/me/update", data);
