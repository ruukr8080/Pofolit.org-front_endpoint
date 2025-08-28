'use client'
import React, { createContext, useReducer, useContext, Dispatch, ReactNode } from "react";

// 상태 타입
type UserState = {
  id: string | null;
  email: string;
  nickname: string;
  isLoggedIn: boolean;
};

// 액션 타입
type UserAction =
  | { type: "LOGIN"; payload: { id: string; email: string; nickname: string } }
  | { type: "LOGOUT" }
  | { type: "UPDATE_NICKNAME"; payload: string };

// reducer
function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload, isLoggedIn: true };
    case "LOGOUT":
      return { id: null, email: "", nickname: "", isLoggedIn: false };
    case "UPDATE_NICKNAME":
      return { ...state, nickname: action.payload };
    default:
      return state;
  }
}

// Context 생성
const UserStateContext = createContext<UserState | undefined>(undefined);
const UserDispatchContext = createContext<Dispatch<UserAction> | undefined>(undefined);

// Provider
export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, {
    id: null,
    email: "",
    nickname: "",
    isLoggedIn: false,
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

// 커스텀 훅
export function useUserState() {
  const context = useContext(UserStateContext);
  if (!context) throw new Error("useUserState must be used within UserProvider");
  return context;
}
export function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  if (!context) throw new Error("useUserDispatch must be used within UserProvider");
  return context;
}