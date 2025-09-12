import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  pre: string | null;
  role: "USER" | "GUEST" | null;
}

const initialState: AuthState = {
  pre: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignState(state, action: PayloadAction<string | null>) {
      state.pre = action.payload;
      state.role = null;
    },
    logout(state) {
      state.pre = null;
    },
    setRole(state, action: PayloadAction<"USER" | "GUEST" | null>) {
      state.pre = action.payload;
    },
  },
});

export const { setSignState, logout, setRole } = authSlice.actions;
export default authSlice.reducer;
