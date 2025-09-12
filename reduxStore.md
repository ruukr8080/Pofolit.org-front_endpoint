// uthApi라는 이름으로 API 슬라이스를 만들고,
// 그걸 Redux 스토어에 연결하는 코드를 짜줄게.
// 이렇게 하면 로그인 상태 관리랑 사용자 정보 가져오는
// API 호출을 한 곳에서 다 처리

// API 요청: axios를 써서 직접 요청 보냄 (api 폴더) -> apiSlicer

// 상태 저장: zustand로 스토어 만듦 (store 폴더) ->

// 상태 접근: useUserStore 같은 커스텀 훅을 만들어 상태를 가져옴 (hooks 폴더) ->

// 근데 RTK 쿼리는 이 모든 역할을 하나의 API 슬라이스(src/services/authApi.ts)에서 다 처리해버려.

fetchBaseQuery: axios의 역할을 대신해서 API 요청을 보내.

createApi: API 요청의 로딩, 에러, 데이터를 Redux 스토어에 자동으로 저장해. (zustand의 store 역할)

자동 생성 훅: createApi가 useLoginMutation, useGetMeQuery 같은 훅을 자동으로 만들어줘. (hooks 역할)
// 초기 상태 리듀서 정의
// 객체와 배열을 쉽고 안전하게 업데이트하기
// 가변적인 함수와 명령 피하기

// 리듀서 조합

// "Redux 기초" Part 3: State, Actions, and Reducers
// 스택 오버플로우: 초기 상태 저장과 combineReducers

// 스택 오버플로우: 상태 키 이름과 combineReducers
// \*/

package com.app.pofolit_be.security;

import com.app.pofolit_be.security.auth.CookieOAuth2AuthorizationRequestRepository;
import com.app.pofolit_be.security.auth.CookieUtil;
import com.app.pofolit_be.security.token.JwtUtil;
import com.app.pofolit_be.user.entity.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/\*\*

- 인증 성공 후처리 핸들러입니다.
- <p>
- - refreshToken : Http-only 쿠키로 넣습니다.
- - accessToken: 프론트에서 사용하기 위해 일반 쿠키로 전달합니다.
- 추후 RememberMeAuthenticationFilter를 구현하기 위해
- </p>
   */
  @Slf4j
  @Component
  @RequiredArgsConstructor
  public class AuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

      private final JwtUtil jwtUtil;
      private final CookieUtil cookieUtil;
      private final CookieOAuth2AuthorizationRequestRepository authorizationRequestRepository;
      @Value("${uri.auth.base}")
      private String targetUrl;

      @Override
      public void onAuthenticationSuccess(HttpServletRequest request,
                                          HttpServletResponse response,
                                          Authentication authentication) throws IOException, ServletException {

          OIDCUser principal = (OIDCUser) authentication.getPrincipal();
          User user = principal.getUser();
          String userEmail = user.getEmail();

          // 2. JWT 토큰 생성 (JwtUtil이 Redis 저장까지 처리)
          String accessToken = jwtUtil.generateAccessToken(userEmail);
          String refreshToken = jwtUtil.generateRefreshToken(userEmail);

          // 3. 리프레시 토큰은 HttpOnly 쿠키.
          // accesss 토큰은 일반 쿠키.
          cookieUtil.addRefreshTokenCookie(response, refreshToken);

          int accessTokenMaxAge = 10 * 60; // 10분
          cookieUtil.addCookie(response, "accessToken", accessToken, accessTokenMaxAge);

          // 5. 기존 인증 관련 임시 쿠키를 삭제합니다.
          clearAuthenticationAttributes(request, response);

          // 생성된 URL로 리다이렉트 시킵니다.
          getRedirectStrategy().sendRedirect(request, response, targetUrl);
          // 4. 방법1: 액세스 토큰을 JSON 응답 본문에 담아 보낸다.
          //        response.setStatus(HttpStatus.OK.value());
          //        response.setContentType("application/json;charset=UTF-8");
          //        PrintWriter writer = response.getWriter();
          //        String jsonResponse = String.format("{\"accessToken\": \"%s\"}", accessToken);
          //        writer.write(jsonResponse);
          //        writer.flush();
          //4. 방법2: 프론트엔드로 리다이렉트할 URL을 생성합니다.
          //        String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/oauth-redirect")
          //                .queryParam("token", accessToken)
          //                .build().toUriString();
      }
      /**
       * OAuth2 인증 과정에서 사용한 임시 쿠키를 삭제합니다.
       */
      protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
          super.clearAuthenticationAttributes(request);
          authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
      }

  }
