import React from "react";
import { useRouter } from "next/navigation";

export default function AdditionalInfoButton() {
  const router = useRouter();

  const handleClick = () => {
    router.replace("/signup");
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded bg-orange-500 text-white font-bold shadow hover:bg-orange-600 transition"
    >
      추가정보 입력하러 가기
    </button>
  );
}
