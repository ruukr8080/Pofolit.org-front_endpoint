import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export interface UserProfileCard {
  email: string | null;
  nickname: string | null;
  profileImageUrl?: string | null;
}

export interface UserState {
  email: string | null;
  nickname: string | null;
  profileImageUrl?: string | null;
  birthDay?: string | null;
  job?: string | null;
  domain?: string | null;
}
type UserProfileCardStore = UserProfileCard & UserProfileCardAction;
type UserStore = UserState & UserStoreAction;

interface UserProfileCardAction {
  setUserProfileCardState: (userProfileCard: UserProfileCard) => void;
}

interface UserStoreAction{
  setUserState: (user: UserState) => void;
  removeUser: () => void;
}


export const userProfileCardStore = create<UserProfileCardStore>()(
  persist(
    devtools(
      (set) => ({
        profile: {
          email: null,
          nickname: null,
          profileImageUrl: null,
        },
        setUserProfileCardState: (profile) => set({ ...profile }),
      }),
      { name: "userProfileCardStorage" }
    ),
    {
      name: "userProfileCardStorage",
      storage: createJSONStorage(() => localStorage),
      partialize: (f) => ({
        email: f.email,
        nickname: f.nickname,
        profileImageUrl: f.profileImageUrl,
      }),
    }
  )
);

export const userStore = create<UserStore>()(
  persist(
    devtools(
      (set) => ({
        email: null,
        nickname: null,
        profileImageUrl: null,
        birthDay: null,
        job: null,
        domain: null,
        setUserState: (profile) => set({ ...profile }),
        removeUserInfo: () =>
          set({
            email: null,
            nickname: null,
            profileImageUrl: null,
            birthDay: null,
            job: null,
            domain: null,
          }),
      }),
      { name: "userProfileStorage" }
    ),
    {
      name: "userProfileStorage",
      storage: createJSONStorage(() => localStorage),
      partialize: (f) => ({
        email: f.email,
        nickname: f.nickname,
        profileImageUrl: f.profileImageUrl,
        birthDay: f.birthDay,
        job: f.job,
        domain: f.domain,
      }),
    }
  )
);
