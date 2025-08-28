export interface User {
  id: string;
  email: string;
  nickname: string;
  profileImageUrl: string;
  birthDay: Date;
  job: string;
  domain: string;
}
export interface UserState extends User {
  isLoggedIn: boolean;
};
export interface SignupRequest {
  nickname: string;
  profileImageUrl: string;
  birthDay: Date;
  domain: string;
  job: string;
}
export interface TokenRequest {
  id: string; 
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
