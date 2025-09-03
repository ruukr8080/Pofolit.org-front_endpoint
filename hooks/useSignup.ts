// context/hooks/useSignup.ts
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signupRequest } from "@/api/utils/userUtil";
import { userStore } from "@/context/userStore";
import { UserRequest } from "@/api/types/apiUser";

function formatDate(date: string | Date | undefined | null): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export function useSignup() {
  const router = useRouter();
  const { user, updateNickname } = userStore();

  const [form, setUserState] = useState({
    email: user?.email ?? "",
    nickname: user?.nickname ?? "",
    profileImageUrl: user?.profileImageUrl ?? "",
    birthDay: formatDate(user?.birthDay),
    job: user?.job ?? "",
    domain: user?.domain ?? "",
  });

  useEffect(() => {
    // 스토어에서 사용자 객체가 변경될 때마다 폼 상태 업데이트
    if (user) {
      setForm({
        email: user.email ?? "",
        nickname: user.nickname ?? "",
        profileImageUrl: user.profileImageUrl ?? "",
        birthDay: formatDate(user.birthDay),
        job: user.job ?? "",
        domain: user.domain ?? "",
      });
    }
  }, [user]);

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

    // 백엔드 SignupRequest 필드 중 수정 가능한 필드만 보내기
    const updatePayload: Partial<User> = {
      nickname: form.nickname,
      birthDay: form.birthDay,
      domain: form.domain,
      job: form.job,
    };

    try {
      const response = await signupRequest(updatePayload);
      if (response.status === 200) {
        // 성공 응답 시, 유저 정보가 업데이트된 것으로 가정하고 스토어 업데이트
        // response.data에 최신 유저 정보가 있다면 그걸로 업데이트하는게 더 정확함
        updateNickname(form.nickname);
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