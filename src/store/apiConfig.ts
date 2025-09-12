import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "@/types/user"; // 정의한 타입 불러오기

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      // <응답 데이터 타입, 인자 타입>
      query: () => "users",
    }),
  }),
});
