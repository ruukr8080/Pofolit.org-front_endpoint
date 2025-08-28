// Token parse
export function isValidEmail(email: string): boolean {
  return /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
}
export function isValidNickname(nickname: string): boolean {
  return nickname.length >= 2 && nickname.length <= 20;
}
export function isValidUUID(id: string): boolean {
  return /^[0-9a-fA-F-]{36}$/.test(id);
}
