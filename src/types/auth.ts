import { User } from "./user";

export interface PreTicket {
  token: string | null;
}
export interface Ticket {
  token: string | null;
  role: "USER" | "GUEST" | null;
}

interface AuthState {
  isSignedIn: boolean;
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}
