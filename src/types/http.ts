// @/types/http.ts

// @JsonPropertyOrder({"timestamp", "status", "message", "error", "details", "path", "data"})

/**
 * API 공통 응답 타입입니다.
 * 이 형식을 따라 모든 응답을 처리되게 합니다.
 * @template T 성공 응답 페이로드의 데이터 타입을 나타냅니다.
 */
export interface ApiResult<T> {
  timestamp: string; //응답 생성 시간 (ISO 8601)
  status: number; // HTTP 상태 코드 (예: 200, 201, 404, 500 등)
  message: string; // 클라이언트에게 보여줄 구체적인 응답 메시지.
  data?: T | null; // 성공 응답 페이로드 데이터. 성공 시에만 값이 존재하며, 제네릭 타입 T의 형식을 따릅니다.
  path: string; // 요청이 발생한 엔드포인트 경로
  error?: string | null; // HTTP 상태 메시지 또는 커스텀 에러 코드 (예: "OK", "CREATED") 에러 발생 시에만 값이 존재합니다.
  details?: { [key: string]: string } | null; // 유효성 검사 오류 등 추가적인 세부 정보. 오류 발생 시에만 값이 존재합니다.
}

/**
 *
 * custom http type Code.
 * 백엔드와 프론트엔드가 동일한 에러 코드를 사용해야 합니다.
 */
export enum ExCode {
  EXCEPTION_CONSTRUCTOR = "EXCEPTION_CONSTRUCTOR", // 프론트에서 메세지 등 커스터마이징
  ERROR_SERVER = "ERROR_SERVER", // 백엔드잘못
  INVALID_TYPE = "INVALID_TYPE", // type
  INVALID_VALUE = "INVALID_VALUE", // value
  INVALID_TOKEN = "INVALID_TOKEN", // 리프레시 토큰이 유효하지 않음
  DUPLICATE_SOCIAL_EMAIL = "DUPLICATE_SOCIAL_EMAIL", // 이미 사용 중인 소셜 이메일
  DUPLICATE_USER = "DUPLICATE_USER", // 이미 사용자가 존재
  DUPLICATE_NICKNAME = "DUPLICATE_NICKNAME", // 이미 존재하는 닉네임
  EXPIRED_TOKEN = "EXPIRED_TOKEN", // 토큰 유효기간 만료
  NOT_FOUND_USER = "NOT_FOUND_USER", // 유저를 찾을 수 없음

  _401 = "UNAUTHORIZED",
  _403 = "FORBIDDEN",
  _404 = "NOT_FOUND",
  _500 = "INTERNAL_SERVER_ERROR",
  _502 = "BAD_GATEWAY",
}
