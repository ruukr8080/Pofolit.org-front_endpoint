export interface PreTicket {
  token: string | null;
}
export interface Ticket {
  token: string | null;
  role: "USER" | "GUEST" | null;
}
