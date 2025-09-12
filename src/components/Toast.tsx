"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  readonly message: string;
  readonly duration?: number;
  readonly onClose?: () => void;
}

export default function Toast({
  message,
  duration = 2500,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold text-center animate-fade-in"
      style={{ minWidth: 200, maxWidth: 320 }}
    >
      {message}
    </div>
  );
}
