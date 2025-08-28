import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser } from "../api/UserService";

function formatDate(date: string | Date | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  // 날짜가 유효한지 체크
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
} // YYYY-MM-DD

export function useSignup() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    profileImageUrl: "",
    birthDay: "",
    job: "",
    domain: "",
  });

  // DB 유저 정보로 폼 초기값 채우기
  React.useEffect(() => {
    async function fetchUserAndSetForm() {
      try {
        const { getUser } = await import("../api/UserService");
        const res = await getUser();
        const user = res.data;
        setForm((prev) => ({
          ...prev,
          email: user.email ?? "",
          nickname: user.nickname ?? "",
          birthDay: formatDate(user.birthDay),
          job: user.job ?? "",
          domain: user.domain ?? "",
        }));
      } catch {
        // Handle error if needed
      }
    }
    fetchUserAndSetForm();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateUser = {
      email: form.email,
      nickname: form.nickname,
      profileImageUrl: form.profileImageUrl,
      birthDay: form.birthDay, // keep as string to match Partial<User>
      job: form.job,
      domain: form.domain,
    };

    try {
      const response = await signupUser(updateUser);
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
