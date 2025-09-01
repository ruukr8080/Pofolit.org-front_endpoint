import { JsonInclude } from "jackson-js";
import { Map } from "immutable";
/**
 * API 공통 응답 타입입니다.
 * 이 형식을 따라 모든 응답을 처리되게 합니다.
 * @template T 성공 응답 페이로드의 데이터 타입을 나타냅니다.
 */
@JsonInclude()
export class ApiResult<T> {
  constructor(
    public timestamp: string, //응답 생성 시간 (ISO 8601 형식의 문자열)
    public status: number, // HTTP 상태 코드 (예: 200, 201, 404, 500 등)
    public message: string, // 클라이언트에게 보여줄 구체적인 응답 메시지.
    public path: string, // 요청이 발생한 API 경로 (예: "/api/v1/posts")
    public error?: string, // HTTP 상태 메시지 또는 커스텀 에러 코드 (예: "OK", "CREATED") 에러 발생 시에만 값이 존재합니다.
    public data?: T, // 성공 응답 페이로드 데이터. 성공 시에만 값이 존재하며, 제네릭 타입 T의 형식을 따릅니다.
    public details: Map<string, string> | null = null // 유효성 검사 오류 등 추가적인 세부 정보. 오류 발생 시에만 값이 존재합니다.
  ) { }
}