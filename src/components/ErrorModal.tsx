"use client";

import { useEffect, useState } from "react";

interface ErrorModalProps {
  readonly message: string;
  readonly onClose: () => void;
}

function ErrorModal({ message, onClose }: ErrorModalProps) {
  useEffect(() => {
    // 키보드 이벤트 리스너를 추가하여 Escape 키를 감지합니다.
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    // 컴포넌트 언마운트 시 이벤트 리스너를 제거합니다.
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
      aria-modal="true"
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()} // 이벤트 버블링을 막아 모달 배경 클릭 시에만 닫히도록 합니다.
        tabIndex={0}
        aria-label="오류 모달"
      >
        <h2 className="text-lg font-bold mb-4 text-red-600">오류 발생</h2>
        <pre className="text-sm text-gray-700 whitespace-pre-line mb-6">
          {message}
        </pre>
        <button
          className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          onClick={onClose}
          autoFocus
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default function GlobalErrorModal() {
  const [message, setMessage] = useState<string | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 전역 CustomEvent(globalError)를 리스너로 추가
    const handler = (e: Event) => {
      if (e instanceof CustomEvent && typeof e.detail === "string") {
        setMessage(e.detail);
        // 에러가 들어올 때마다 기존 타이머 클리어 후 새 타이머 시작
        if (timer) clearTimeout(timer);
        const newTimer = setTimeout(() => setMessage(null), 3000);
        setTimer(newTimer);
      }
    };
    window.addEventListener("globalError", handler);
    return () => {
      window.removeEventListener("globalError", handler);
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  if (!message) return null;
  return <ErrorModal message={message} onClose={() => setMessage(null)} />;
}
