import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  accessToken: string | null;
  role: 'USER' | 'GUEST' | null;
  isSigned: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  role: null,
  isSigned: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      state.isSigned = true;
    },
    setSignState(state, action: PayloadAction<boolean>) {
      state.isSigned = action.payload;
    },
    logout(state) {
      state.accessToken = null;
      state.isSigned = false;
      state.role = null;
    },
    setRole(state, action: PayloadAction<'USER' | 'GUEST' | null>) {
      state.role = action.payload;
    },
  },
});

export const { setAuthState, setSignState, logout, setRole } = authSlice.actions;
export default authSlice.reducer;
