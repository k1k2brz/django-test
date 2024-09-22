"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../common/Input";
import { getCookie } from "@/app/_utils/cookie";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("로그인 실패");
      }

      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form className="w-auto" onSubmit={handleSubmit}>
      <Input
        id="로그인"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="사용자명"
      />
      <Input
        id="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button type="submit">로그인</button>
    </form>
  );
}