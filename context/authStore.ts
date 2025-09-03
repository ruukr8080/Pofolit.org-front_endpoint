import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export enum Role {
  USER = "USER",
  GUEST = "GUEST",
}

interface AuthState {
  accessToken: string | null;
  role: Role;
  isSigned: boolean;
}

interface AuthAction {
  setAuthState: (accessToken: string) => void; // principal 장착
  setSignState: (isSigned: boolean) => void; // 인증 여부
  logout: () => void;
}

export type AuthStore = AuthState & AuthAction;

export const authStore = create<AuthStore>()(
  persist(
    devtools(
      (set) => ({
        accessToken: null,
        isSigned: false,
        setAuthState: (accessToken) => set({ isSigned: true, accessToken }),
        // setSignState: (isSigned) => set({ isSigned: isSigned }),
        logout: () => set({ isSigned: false, accessToken: null }),
      }),
      { name: "authStorage" }
    ),
    {
      name: "authStorage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isSigned: state.isSigned,
        accessToken: state.accessToken,
      }),
    }
  )
);
