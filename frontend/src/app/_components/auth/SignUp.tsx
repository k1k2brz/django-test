"use client";

import { useEffect, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/_store/useAuthStore";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("회원가입 실패");
      }

      alert("회원가입 성공");
      router.push('/login')
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-8 max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>

      <div className="mb-4">
        <Input
          id="유저이름"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="사용자명"
        />
      </div>

      <div className="mb-6">
        <Input
          id="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
      </div>

      <Button type="submit">
        회원가입
      </Button>
    </form>
  );
}
