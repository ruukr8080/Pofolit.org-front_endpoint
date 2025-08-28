import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../api/Interceptor";
import { useUserDispatch } from "../context/UserContext";
import { isValidUUID,parseByIdFromToken,parseByEmailFromToken, parseByNicknameFromToken } from "../api/TokenUtil";


export function useSignup() {
  const router = useRouter();
  const dispatch = useUserDispatch();
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    profileImageUrl: "",
    birthDay: "",
    job: "",
    domain: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      const id = parseByIdFromToken(token);
      const email = parseByEmailFromToken(token);
      const nickname = parseByNicknameFromToken(token);
      if (!id || !isValidUUID(id)) {
        alert("잘못된 인증 정보입니다.");
        router.replace("/login");
        return;
      }
      dispatch({ type: "LOGIN", payload: { id, email: email ?? "", nickname: nickname ?? "" } });
      setForm((prev) => ({
        ...prev,
        email: email ?? "",
        nickname: nickname ?? "",
      }));
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      alert("Access or refresh token is missing from the URL.");
      router.replace("/login");
    }
  }, [router, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateUser = {
      nickname: form.nickname,
      birthDay: form.birthDay,
      job: form.job,
      domain: form.domain,
    };

    try {
      const response = await axios.patch("/api/v1/users/signup", updateUser);
      if (response.status === 200) {
        router.replace("/");
        alert("정보가 성공적으로 저장됐습니다.");
      } else {
        alert("정보 저장에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("네트워크 오류가 발생했습니다:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  return { form, handleChange, handleSubmit, router };
}
