import { authStore } from "@/context/authStore";
import { userProfileCardStore, userStore } from "@/context/userStore";
import { getUserRequest } from "@/api/utils/userUtil";
import { useEffect } from "react";



export const useUserStore = () => {
  const { accessToken } = authStore();
  const { setUserProfileCardState, email, nickname, profileImageUrl } = userProfileCardStore();

  useEffect(() => {
    if (accessToken) {
      getUserRequest().then((res) => {
        setUserProfileCardState({
          email: res.data.email,
          nickname: res.data.nickname,
          profileImageUrl: res.data.profileImageUrl,
        });
      });
    }
  }, [accessToken, setUserProfileCardState]);

  // user 객체 반환
  const user = {
    email,
    nickname,
    profileImageUrl,
  };
  return { user };
};

export const useUserProfileFetch = () => {
  const { accessToken } = authStore();
  const { setUserState } = userStore();

  useEffect(() => {
    if (accessToken) {
      getUserRequest().then((res) => {
        setUserState({
          email: res.data.email,
          nickname: res.data.nickname,
          profileImageUrl: res.data.profileImageUrl,
          birthDay: res.data.birthDay,
          job: res.data.job,
          domain: res.data.domain,
        });
      });
    }
  }, [accessToken, setUserState]);
};
