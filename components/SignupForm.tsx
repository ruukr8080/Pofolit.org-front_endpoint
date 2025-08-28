"use client";
import React from "react";
import { FIELDS, JOBS, DOMAINS } from "../api/types/UserField";

interface SignupFormProps {
  readonly form: { readonly [key: string]: string };
  readonly handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  readonly handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  readonly router: { readonly replace: (path: string) => void };
}

export default function SignupForm({ form, handleChange, handleSubmit, router }: SignupFormProps) {
  return (
    <form
      className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center mb-2">추가 정보 입력</h2>
      {FIELDS.map((field) => (
        <div key={field.name}>
          <label className="block font-semibold mb-1">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={form[field.name]}
            required={field.required}
            readOnly={field.readOnly}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              field.readOnly ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            placeholder={field.label}
          />
        </div>
      ))}
      {/* 업무분야 선택 */}
      <div>
        <label className="block font-semibold mb-1">업무분야</label>
        <select
          name="domain"
          value={form.domain}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">선택</option>
          {DOMAINS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
      {/* 직업 선택 */}
      <div>
        <label className="block font-semibold mb-1">직업</label>
        <select
          name="job"
          value={form.job}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">선택</option>
          {JOBS.map((j) => (
            <option key={j.value} value={j.value}>
              {j.label}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => router.replace("/")}
        className="w-1/2 mx-auto bg-orange-500 text-white py-2 rounded font-bold mt-4"
      >
        메인 화면으로 돌아가기
      </button>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded font-bold mt-4"
      >
        저장하고 시작하기
      </button>
    </form>
  );
}
