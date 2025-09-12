import { AxiosError } from "axios";
import { ExCode, ApiResult } from ".././types/http";

/**
 * 타입 가드 ApiResultType 형식인지 확인합니다.
 * @param obj 확인할 객체
 * @returns ApiResultType 타입이면 true, 아니면 false
 */
function isApiResult<T>(obj: any): obj is ApiResult<T> {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "status" in obj &&
    "message" in obj &&
    "path" in obj
  );
}

/**
 * 유효성 검사 오류 메시지를 사용자에게 알립니다.
 * @param details 유효성 검사 오류 세부 정보
 */
const handleValidationErrors = (details: { [key: string]: string }) => {
  const messages = Object.values(details).join("\n");
  // TODO: alert 대신 모달이나 다른 UI컴포넌트로 오류를 표시해야댐
  console.error("유효성 검사 오류:", messages);
  // 커스텀 이벤트로 오류 메시지 전달 (예: 글로벌 에러 모달에서 수신)
  window.dispatchEvent(
    new CustomEvent("validationError", { detail: messages })
  );
};

/**
 * 중앙 집중식 HTTP 및 커스텀 에러 처리 핸들러입니다.
 * 에러 코드에 따라 적절한 동작을 수행합니다.
 * @param error AxiosError 객체
 */
export const ex = (error: AxiosError) => {
  const responseData = error.response?.data;
  console.error("Error occurred:", responseData);

  if (isApiResult(responseData) && responseData.error) {
    switch (responseData.error) {
      case ExCode.DUPLICATE_SOCIAL_EMAIL:
        alert("이미 다른 소셜 계정으로 가입된 이메일입니다.");
        break;
      case ExCode.DUPLICATE_USER:
        alert("이미 존재하는 유저입니다.");
        break;
      case ExCode.DUPLICATE_NICKNAME:
        alert("이미 사용 중인 닉네임입니다.");
        break;
      case ExCode.NOT_FOUND_USER:
        alert("요청한 유저를 찾을 수 없습니다.");
        break;
      case ExCode.INVALID_TOKEN:
        alert("다시 로그인해주세요.");
        // 토큰 관련 에러는 axios에서 처리되므로 여기서는 로그만 남김
        console.error(
          "토큰이 유효하지 않거나 만료되었습니다. 자동 재발급을 시도합니다."
        );
        break;
      case ExCode.EXPIRED_TOKEN:
        alert(
          "로그인 상태 유지시간이 만료되었습니다. 다시 로그인해주세요. 만약 귀찮으시다면, 로그인 상태 유지하기를 체크해주세요."
        );
        // 로컬스토리지에 저장? 토큰 만료시간 늘리기?
        window.location.href = "/login";
        break;
      case ExCode.INVALID_TYPE:
      case ExCode.INVALID_VALUE:
        alert("요청한 파라미터의 타입이나 값이 올바르지 않습니다.");
        break;
      case ExCode.EXCEPTION_CONSTRUCTOR:
        // 백엔드에서 내려주는 세부 에러 메시지를 활용
        handleValidationErrors(responseData.data as { [key: string]: string });
        break;
    }
    return;
  }

  switch (error.response?.status) {
    case 401:
      console.error("인증 정보가 만료되었습니다. 다시 로그인해주세요.");
      break;
    case 404:
      console.error("요청한 리소스를 찾을 수 없습니다.");
      break;
    case 500:
      console.error("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      break;
    default:
      if (error.response) {
        console.error(`오류가 발생했습니다: ${error.response.status}`);
      } else {
        console.error("네트워크 오류가 발생했습니다.");
      }
      break;
  }
};
