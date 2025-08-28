// Token parse
export function parseToken(token: string): string | null {
  const decodedToken =  JSON.parse(atob(token));
  return decodedToken || null;
}
export function parseByIdFromToken(token: string): string | null {
  const id = JSON.parse(atob(token.split(".")[1]));
  return id.sub || id.id || null;
}
export function parseByEmailFromToken(token: string): string | null {
  const email = JSON.parse(atob(token.split(".")[1]));
  return email.email || null;
}
export function parseByNicknameFromToken(token: string): string | null {
  const nickname = JSON.parse(atob(token.split(".")[1]));
  return nickname.nickname || null;
}
// Token fetch
export function saveToken(token: string) {
  localStorage.setItem("token", token);
}
export function removeToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
}
// token duplication check
export function isValidEmail(email: string): boolean {
  return /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
}
export function isValidNickname(nickname: string): boolean {
  return nickname.length >= 2 && nickname.length <= 20;
}
export function isValidUUID(id: string): boolean {
  return /^[0-9a-fA-F-]{36}$/.test(id);
}
