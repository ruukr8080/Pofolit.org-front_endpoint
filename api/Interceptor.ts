import axios from "axios";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    if (part) {
      return part.split(';').shift();
    }
  }
  return null;
}

// 기본 요청 생성
const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

// instance에 요청 인터셉터를 추가하여 쿠키에서 토큰을 꺼내와 요청 헤더에 자동으로 담도록 설정합니다.
instance.interceptors.request.use(
  (config) => {
    // "token"이라는 이름의 쿠키에서 토큰 값을 가져옵니다.
    const token = getCookie("token");

    // 토큰이 존재하면 요청 헤더의 'token'에 담습니다.
    // 일반적으로 'Bearer ' 접두사를 붙이는 것이 표준입니다.
   if (token) {
      config.headers ??= {};
      config.headers.token = `Bearer ${token}`;
    }


    // 수정된 config를 반환하여 요청을 계속 진행합니다.
    return config;
  },
  (error) => {
    // 요청 에러 발생 시 처리 (예: 네트워크 에러 등)
    return Promise.resolve(new Error('Something went wrong: ' + error.message));
  }
);

  
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

// 다른 파일에서 import 해서 사용할 수 있도록 내보냅니다.
export default instance;