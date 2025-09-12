import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Role } from "@/types/user";

export interface UserState extends User {}

const initialState: UserState = {
  email: null,
  nickname: null,
  profileImageUrl: null,
  providerId: null,
  registrationId: null,
  birthDay: null,
  job: null,
  domain: null,
  role: Role.GUEST,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAvatar(state, action: PayloadAction<string | null>) {
      return { ...state, profileImageUrl: action.payload };
    },
    setUserState(state, action: PayloadAction<User>) {
      return { ...state, ...action.payload };
    },
    removeUserInfo(state) {
      return { ...initialState };
    },
  },
});

export const { setUserAvatar, setUserState, removeUserInfo } =
  userSlice.actions;
export default userSlice.reducer;
