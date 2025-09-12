
export interface Auth {
  accessToken: string | null;
  role: "USER" | "GUEST" | null;
  isSigned: boolean;
}