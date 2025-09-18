import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useGetUserInfoQuery } from "@/store/apiConfig";
import { removeUserInfo } from "@/store/userSlice";

export const useUserProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: user, isLoading, error, refetch } = useGetUserInfoQuery();

  const handleLogout = useCallback(() => {
    // 쿠키 제거
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "pre=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Redux 상태 초기화
    dispatch(removeUserInfo());

    // 페이지 이동
    router.replace("/");
  }, [dispatch, router]);

  const refreshUserData = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    user: user?.data,
    isLoading,
    error,
    handleLogout,
    refreshUserData,
  };
};
