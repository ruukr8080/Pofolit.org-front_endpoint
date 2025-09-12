import { ExCode, ApiResult } from ".././types/http";
// window.addEventListener("globalError", ...)로 아무데서나 쓰면댐

// ApiResult 타입 가드 (fetch/RTK Query 범용)
function isApiResult<T>(obj: unknown): obj is ApiResult<T> {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "status" in obj &&
    "message" in obj &&
    ("path" in obj || "error" in obj)
  );
}

// 유효성 검사 오류 메시지 핸들러 (fetch/RTK Query 범용)
const handleValidationErrors = (details: { [key: string]: string }) => {
  const messages = Object.values(details).join("\n");
  window.dispatchEvent(new CustomEvent("globalError", { detail: messages }));
};

/**
 * fetch/RTK Query 범용 에러 핸들러
 * @param error fetch/RTK Query 등에서 온 에러 객체
 * @param dispatch (선택) 인증 만료 등에서 리덕스 액션 처리용
 */

export function handleApiError(
  error: unknown,
  dispatch?: (...args: unknown[]) => void
) {
  const errObj = error as Record<string, any>;
  const status = errObj.status;
  const data = errObj.data || errObj;
  const message = data?.message || errObj.message;

  // 에러 메시지 매핑
  let errorMsg = "알 수 없는 오류가 발생했습니다.";
  let shouldLogout = false;
  let shouldRedirectLogin = false;

  if (isApiResult(data) && data.error) {
    switch (data.error) {
      case ExCode.DUPLICATE_SOCIAL_EMAIL:
        errorMsg = "이미 다른 소셜 계정으로 가입된 이메일입니다.";
        break;
      case ExCode.DUPLICATE_USER:
        errorMsg = "이미 존재하는 유저입니다.";
        break;
      case ExCode.DUPLICATE_NICKNAME:
        errorMsg = "이미 사용 중인 닉네임입니다.";
        break;
      case ExCode.NOT_FOUND_USER:
        errorMsg = "요청한 유저를 찾을 수 없습니다.";
        break;
      case ExCode.INVALID_TOKEN:
        errorMsg = "다시 로그인해주세요.";
        shouldLogout = true;
        break;
      case ExCode.EXPIRED_TOKEN:
        errorMsg =
          "로그인 상태 유지시간이 만료되었습니다. 다시 로그인해주세요. 만약 귀찮으시다면, 로그인 상태 유지하기를 체크해주세요.";
        shouldLogout = true;
        shouldRedirectLogin = true;
        break;
      case ExCode.INVALID_TYPE:
      case ExCode.INVALID_VALUE:
        errorMsg = "요청한 파라미터의 타입이나 값이 올바르지 않습니다.";
        break;
      case ExCode.EXCEPTION_CONSTRUCTOR:
        handleValidationErrors(data.data as { [key: string]: string });
        return;
    }
  } else {
    switch (status) {
      case 401:
        errorMsg = "인증 정보가 만료되었습니다. 다시 로그인해주세요.";
        shouldLogout = true;
        break;
      case 404:
        errorMsg = "요청한 리소스를 찾을 수 없습니다.";
        break;
      case 500:
        errorMsg = "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
        break;
      default:
        errorMsg = status
          ? `오류가 발생했습니다: ${status}`
          : message || "네트워크 오류가 발생했습니다.";
        break;
    }
  }

  // 글로벌 에러 모달로 메시지 전파
  window.dispatchEvent(new CustomEvent("globalError", { detail: errorMsg }));
  if (shouldLogout && dispatch) dispatch({ type: "auth/logout" });
  if (shouldRedirectLogin) window.location.href = "/login";
}
