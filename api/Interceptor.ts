import axios from "axios";


// 요청 생성
const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

// 404 인터셉터 : /auth/callback 경로에서 404 에러 발생 시 처리
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 404 &&
      error.config?.url?.includes("/auth/callback")
    ) {
      alert("인증 처리 중 오류 발생");
      window.location.href = "/login";
      return Promise.reject(new Error("Redirecting to login due to 404 on /auth/callback"));
    }
    return Promise.reject(error instanceof Error ? error : new Error(error));
  }
);

// 401 인터셉터: 로그인 페이지로.
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401
    ) {
      // 인증 실패 시 로그인 페이지로 이동
      window.location.href = "/login";
    }
    return Promise.reject(error instanceof Error ? error : new Error(error));
  }
);

export default instance;