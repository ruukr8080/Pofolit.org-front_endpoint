import { useUserState, useUserDispatch } from "../context/UserContext";
export function useUser() {
  const user = useUserState();
  const dispatch = useUserDispatch();
  return { user, dispatch };
}
