// // app/auth/callback/page.tsx

// "use client";

// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { setSignState } from "@/store/authSlice";
// import { setUserState } from "@/store/userSlice";
// import type { User } from "@/types/user";
// import { Role } from "@/types/user";

// // 일반 쿠키 설정 함수 (스프링에서 일반 쿠키로 주므로 보안 쿠키 설정 제거)
// const setCookie = (
//   name: string,
//   value: string,
//   maxAge: number = 3600
// ) => {
//   document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
// };

// // 토큰 만료 확인 함수
// const isTokenExpired = (token: string): boolean => {
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload.exp * 1000 < Date.now();
//   } catch {
//     return true;
//   }
// };

// // preToken에서 유저 정보 추출 함수
// const extractUserInfoFromToken = (token: string): User | null => {
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));

//     // preToken에서 필요한 정보 추출
//     const userInfo: User = {
//       email: payload.email || null,
//       nickname: payload.nickname || null,
//       profileImageUrl: payload.picture || null,
//       providerId: payload.sub || null,
//       registrationId: "google", // OAuth 제공자
//       role: Role.USER,
//     };

//     return userInfo;
//   } catch (error) {
//     console.error("토큰 파싱 실패:", error);
//     return null;
//   }
// };

// export default function AuthCallbackPage() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [isProcessing, setIsProcessing] = useState(true);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const tokenFromUrl = urlParams.get("token");

//     const getCookie = (name: string) => {
//       const value = `; ${document.cookie}`;
//       const parts = value.split(`; ${name}=`);
//       if (parts.length === 2) return parts.pop()?.split(";").shift();
//     };
//     const tokenFromCookie = getCookie("pre");

//     const preToken = tokenFromUrl || tokenFromCookie;

//     console.log("URL에서 토큰 추출 :", tokenFromUrl);
//     console.log("쿠키에서 토큰 추출 :", tokenFromCookie);
//     console.log("결과:", preToken);
//     if (preToken && !isTokenExpired(preToken)) {
//       // preToken에서 유저 정보 추출 및 스토어에 저장
//       const userInfo = extractUserInfoFromToken(preToken);
//       if (userInfo) {
//         dispatch(setUserState(userInfo));
//         console.log("preToken에서 추출한 유저 정보:", userInfo);
//       }

//       // preToken을 일반 쿠키로 저장 (5분 유효)
//       setCookie("pre", preToken, 300); // 5분 = 300초
//       dispatch(setSignState(preToken));

//       console.log("preToken 저장 및 인증 상태 설정 완료");

//       // 홈페이지로 리다이렉션 (유저 정보는 이미 스토어에 저장됨)
//       router.replace("/");
//     } else if (preToken && isTokenExpired(preToken)) {
//       console.warn("preToken이 만료되었습니다.");
//       // 만료된 토큰 제거하고 로그인 페이지로 리다이렉션 권유하는 메세지모달 표시
//       document.cookie = "pre=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
//       router.replace("/auth/login?error=token_expired");
//     } else {
//       console.warn(
//         "preToken을 찾을 수 없습니다. URL 파라미터와 쿠키 모두 확인했습니다."
//       );
//       console.log("URL 파라미터:", tokenFromUrl);
//       console.log("쿠키 값:", tokenFromCookie);
//       router.replace("/auth/login?error=no_token");
//     }

//     setIsProcessing(false);
//   }, [router, dispatch]);

//   // 로딩 UI 표시
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "#f5f6fa",
//       }}
//     >
//       <div
//         style={{
//           background: "#fff",
//           borderRadius: "18px",
//           boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
//           padding: "40px 32px",
//           width: "100%",
//           maxWidth: 360,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>
//           {isProcessing ? "로그인 처리 중..." : "리다이렉션 중..."}
//         </h2>
//         <p style={{ color: "#888", fontSize: 15 }}>
//           {isProcessing ? "잠시만 기다려 주세요." : "페이지로 이동합니다."}
//         </p>
//         <div style={{ marginTop: 20, fontSize: 14, color: "#888" }}>
//           <a href="http://localhost:3000/">홈으로 돌아가기</a>
//         </div>
//       </div>
//     </div>
//   );
// }
