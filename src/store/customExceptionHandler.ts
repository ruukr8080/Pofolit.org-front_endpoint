import { ExCode, ApiResult } from ".././types/http";
// window.addEventListener("globalError", ...)로 아무데서나 쓰면댐

// 에러 로깅 함수
const logError = (error: unknown, context?: Record<string, any>) => {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    error:
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : error,
    context,
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  // 개발 환경에서는 콘솔에 출력
  if (process.env.NODE_ENV === "development") {
    console.error("🚨 Error logged:", errorInfo);
  }

  // 프로덕션 환경에서는 외부 로깅 서비스로 전송 (예: Sentry, LogRocket 등)
  if (process.env.NODE_ENV === "production") {
    // TODO: 외부 로깅 서비스 연동
    // 예: Sentry.captureException(error, { extra: context });
    console.error("🚨 Production error:", errorInfo);
  }

  // 로컬 스토리지에 최근 에러 저장 (디버깅용)
  try {
    const recentErrors = JSON.parse(
      localStorage.getItem("recentErrors") || "[]"
    );
    recentErrors.unshift(errorInfo);
    // 최근 10개 에러만 유지
    if (recentErrors.length > 10) recentErrors.pop();
    localStorage.setItem("recentErrors", JSON.stringify(recentErrors));
  } catch (e) {
    console.warn("Failed to save error to localStorage:", e);
  }
};

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
  logError(new Error("Validation Error"), { details, messages });
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
  // 에러 로깅
  logError(error, { dispatch: !!dispatch });

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
