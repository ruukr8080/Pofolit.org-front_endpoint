import axios from "./Interceptor";
import { User } from "./types/UserField";

export const getUser = (id: string) => axios.get<User>(`/api/v1/users/${id}`);
export const signupUser = (data: Partial<User>) => axios.patch("/api/v1/users/signup", data);
export const updateUser = (data: Partial<User>) => axios.patch("/api/v1/users/me/update", data);
export const updateToken = (token: string) => axios.post("/api/v1/auth/token/refresh", { token });
