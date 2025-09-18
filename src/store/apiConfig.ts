import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import type { User } from "@/types/user";

export interface UserProps {
  message: string;
  status: number;
  data: User;
  [key: string]: any;
}
export interface TokenExchangeResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// CSP 호환을 위한 커스텀 Base64 디코딩 함수
const base64Decode = (str: string): string => {
  // Base64 문자 집합
  const base64Chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let output = "";

  // 입력 문자열 정리
  str = str.replace(/[^A-Za-z0-9+/=]/g, "");

  for (let i = 0; i < str.length; i += 4) {
    const enc1 = base64Chars.indexOf(str.charAt(i));
    const enc2 = base64Chars.indexOf(str.charAt(i + 1));
    const enc3 = base64Chars.indexOf(str.charAt(i + 2));
    const enc4 = base64Chars.indexOf(str.charAt(i + 3));

    const chr1 = (enc1 << 2) | (enc2 >> 4);
    const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    const chr3 = ((enc3 & 3) << 6) | enc4;

    output += String.fromCharCode(chr1);
    if (enc3 !== 64) output += String.fromCharCode(chr2);
    if (enc4 !== 64) output += String.fromCharCode(chr3);
  }

  return output;
};

// 토큰 만료 확인 함수
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(base64Decode(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

// 쿠키에서 토큰 가져오기 함수
const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

// 재시도 로직이 포함된 baseQuery
const baseQueryWithRetry = retry(
  fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getCookie("accessToken") || getCookie("pre");
      if (token && !isTokenExpired(token)) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  {
    maxRetries: 3,
  }
);

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["User", "Auth"],
  endpoints: (builder) => ({
    // preToken을 accessToken과 refreshToken으로 교환
    exchangePreToken: builder.mutation<
      TokenExchangeResponse,
      { preToken: string }
    >({
      query: ({ preToken }) => ({
        url: "/auth/token",
        method: "POST",
        body: { preToken },
      }),
    }),
      // 최초 진입 시 pre 상태 확인
      getPreStatus: builder.query<any, void>({
        query: () => "/pre",
      }),
    getUserInfo: builder.query<UserProps, void>({
      query: () => "/users/me",
      providesTags: ["User"],
      keepUnusedDataFor: 300, // 5분 캐시
    }),
    updateUser: builder.mutation<UserProps, Partial<User>>({
      query: (userData) => ({
        url: "/users/me",
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/users/me",
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Auth"],
    }),
  }),
});

export const {
  useExchangePreTokenMutation,
  useGetPreStatusQuery,
  useGetUserInfoQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
