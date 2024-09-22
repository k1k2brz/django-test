"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import { getCookie } from "@/app/_utils/cookie";
import { useAuthStore } from "@/app/_store/useAuthStore";

export default function Header() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setLoginStatus = useAuthStore((state) => state.setLoginStatus);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const checkLoginStatus = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/session-status/", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (data.logged_in) {
        setLoginStatus(true);
      } else {
        setLoginStatus(false);
      }
    } catch (error) {
      console.error("세션 확인 실패:", error);
      setLoginStatus(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // 로그아웃
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
      });

      if (res.ok) {
        logout();
        router.push("/login");
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Django Test</h1>
        <nav>
          {isLoggedIn ? (
            <Button onClick={handleLogout} className="w-fit">
              로그아웃
            </Button>
          ) : (
            <div className="flex space-x-4">
              <Button onClick={() => router.push("/login")} className="w-fit">
                로그인
              </Button>
              <Button onClick={() => router.push("/signup")} className="w-fit">
                회원가입
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
