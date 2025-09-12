import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "@/types/user";

export interface UserProps {
  message: string;
  status: number;
  data: User;
  [key: string]: any;
}
export interface UserAvatarProps {
  message: string;
  status: number;
  data: User;
  [key: string]: any;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.query<UserAvatarProps, void>({
      query: () => "/users/me",
    }),
  }),
});

export const { useGetUserInfoQuery } = userApi;
