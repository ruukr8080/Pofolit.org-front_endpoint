"use client";

import { useSignup } from "@/hooks/useSignup";
import SignupForm from "../../components/SignupForm";

export default function SignupDetailsPage() {
  
  const { form, handleChange, handleSubmit, router } = useSignup();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <SignupForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        router={router}
      />
    </div>
  );
}

