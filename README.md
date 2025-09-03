# Endpoint Test

- React-NextJs-tsx 
- Oauth2 REST API 테스트용.


```bash
npm run dev
```

### Login Page

```
/src
    /login
        /pages.tsx
```

- google login call : `http://localhost:8080/oauth2/code/google`
- kakao login call : `http://localhost:8080/oauth2/code/kakao`
- redirect_uri(auth callback) : `http://localhost:8080/oauth2/code/kakao`


### 구조 / 기술 스택
- Next.js 기반 (app/ 폴더, 'use client' 사용)
- Zustand로 글로벌 유저 상태 관리 (store.ts)
- React Router 미적용 (Next.js 라우팅 사용 중)
- API 통신: axios 인스턴스(axios.ts), util 함수로 분리
- 유저 인증/세션: 쿠키 기반, getUserRequest로 세션 확인
- 컴포넌트 분리: uiComponent 폴더에 버튼, 폼 등 UI 컴포넌트 다수
- OAuth 콜백 처리: page.tsx에서 useAuthCallback 훅으로 세션 복구

### 인증/세션 흐름
- 로그인/회원가입/콜백 등에서 백엔드와 통신 후 쿠키에 토큰 저장
- getUserRequest로 유저 정보 받아와 Zustand 스토어에 저장
- 스토어의 isLoggedIn/user 상태로 라우팅 및 UI 제어

### SSR/CSR

- SSR 함수(getServerSideProps 등)는 없음 → 사실상 CSR 구조
- Next.js의 라우팅만 사용, 페이지 진입 시 useEffect로 데이터 패칭



### 흐름.

axios로  백엔드(스프링)에게 토큰(쿠키),유저정보를 요청해서 받은 데이터를 

zustand를 쓰는 context/store에 저장한 후,

context/hook을 통해 

app/uiComponent/**.tsx 파일들에게 넘겨주고.

uiComponent/**.tsx 들을 app/**/page.tsx 에서 사용함

