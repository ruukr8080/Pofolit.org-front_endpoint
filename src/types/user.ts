/**
 * 백엔드 User 엔티티에 대응하는 유저 정보 타입입니다.
 */

export interface User {
  id: string | null;
  email: string | null;
  nickname: string | null;
  profileImageUrl?: string | null;
  providerId: string | null;
  registrationId: string | null;
  birthDay?: string | null;  // ISO 8601 형식의 날짜 문자열 (YYYY-MM-DD)
  job?: string | null;
  domain?: string | null;
  role: Role;
  refreshToken?: string | null;
}

/**
 * 유저 권한에 대한 기준입니다.
 * GUEST("ROLE_GUEST", "미가입자"),
 * USER("ROLE_USER", "유저");
 */
export enum Role {
  USER = 'USER',
  GUEST = 'GUEST',
}








export const FIELDS = [
  { label: "이메일", name: "email", type: "email", readOnly: true },
  { label: "닉네임", name: "nickname", type: "text", required: true },
  { label: "생일", name: "birthDay", type: "date" },
];

export const JOBS = [
  { label: "프리랜서", value: "freelancer" },
  { label: "직장인", value: "employee" },
];

export const DOMAINS = [
  { label: "글", value: "writing" },
  { label: "그림", value: "art" },
  { label: "음악", value: "music" },
  { label: "개발", value: "dev" },
];
