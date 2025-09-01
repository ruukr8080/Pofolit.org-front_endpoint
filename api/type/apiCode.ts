/**
 * custom http type Code.
 * 백엔드와 프론트엔드가 동일한 에러 코드를 사용해야 합니다.
 */
export enum AppErrorCode {
  EXCEPTION_CONSTRUCTOR = "EXCEPTION_CONSTRUCTOR", // 프론트에서 메세지 등 커스터마이징
  ERROR_SERVER ="ERROR_SERVER", //서버에러
  INVALID_TYPE = "INVALID_TYPE", // type
  INVALID_VALUE = "INVALID_VALUE", // value
  INVALID_TOKEN = "INVALID_TOKEN", // 리프레시 토큰이 유효하지 않음
  DUPLICATE_SOCIAL_EMAIL = "DUPLICATE_SOCIAL_EMAIL", // 이미 사용 중인 소셜 이메일
  DUPLICATE_USER = "DUPLICATE_USER", // 이미 사용자가 존재
  DUPLICATE_NICKNAME = "DUPLICATE_NICKNAME", // 이미 존재하는 닉네임
  EXPIRED_TOKEN = "EXPIRED_TOKEN", // 토큰 유효기간 만료
  NOT_FOUND_USER = "NOT_FOUND_USER", // 유저를 찾을 수 없음
  
}


export enum HttpErrorCode {
  _401 = "UNAUTHORIZED",
  _403 = "FORBIDDEN",
  _404 = "NOT_FOUND",
  _500 = "INTERNAL_SERVER_ERROR",
  _502 = "BAD_GATEWAY",
}
