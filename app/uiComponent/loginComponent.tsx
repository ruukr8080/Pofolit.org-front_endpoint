// app/loginComponent.tsx
"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/context/store";

//Axios로 로그인 API를 호출하고, 성공적으로 응답을 받으면 유저 정보를 Zustand 스토어에 저장.
const LoginComponent = () => {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();

  const handleGoogleLogin = () => {
    router.push("http://localhost:8080/oauth2/authorization/google");
  };

  const handleKakaoLogin = () => {
    router.push("http://localhost:8080/oauth2/authorization/kakao");
  };

  if (isLoggedIn) {
    return (
      <div>
        <span>로그인 상태입니다. </span>
        <button onClick={() => router.push("/")}>메인 페이지로 이동</button>
      </div>
    );
  }
  else {
    return (
      <div>
        <span>로그인 상태가 아닙니다. </span>
        <button onClick={handleGoogleLogin}>구글 로그인</button>
        <button onClick={handleKakaoLogin}>카카오 로그인</button>
      </div>
    );
  }

  
};

export default LoginComponent;
