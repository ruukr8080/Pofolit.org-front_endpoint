import axios from "axios";
import { updateUser  } from "./UserService"; 
import { parseByIdFromToken,saveToken,removeToken } from "./TokenUtil";
import { User } from "./types/UserField";

// 요청 생성
const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
// Token 요청 인터셉터: 헤더에 토큰 자동탑재
instance.interceptors.request.use((meta) => {
  const token = localStorage.getItem("token");
  if (token) {
    meta.headers ??= {};
    meta.headers.Authorization = `Bearer ${token}`;
  }
  return meta;
});
// 404 인터셉터
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response &&
      error.response.status === 404 &&
      error.config &&
      error.config.url?.includes("/signup/auth/callback")) {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      if (token) {
        saveToken(token);
        window.location.href = "/";
        return; // 더 이상 에러를 던지지 않음
      }
    }
    return Promise.reject(error instanceof Error ? error : new Error(error));
  }
);

// 응답 인터셉터: 401 발생 시 로그인 페이지로.
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !request._retry
    ) {
      request._retry = true;
      const token = localStorage.getItem("token");
      if (token) {
        const userId = parseByIdFromToken(token);
        if (userId) {
          const userData = await fetchUserData(userId);
          if (userData) {
            updateUser(userData);
          }
        }
      } else {
        removeToken();
        
        window.location.href = "/login";
      }
    }
    return Promise.reject(error instanceof Error ? error : new Error(error));
  }
);

// 로그인 콜백 헬퍼
export async function handleAuthCallback(token: string | null) {
  if (!token) return;
  saveToken(token);
  const id = parseByIdFromToken(token);
  return id;
}

// 사용자 추가정보 요청 API 
export const fetchUserData = async (id: string): Promise<User | null> => {
  try {
    const response = await instance.get<User>(`/api/v1/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};

export default instance;

