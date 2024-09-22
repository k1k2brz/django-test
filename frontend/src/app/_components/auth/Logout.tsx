import { getCookie } from "@/app/_utils/cookie";

export default function Logout({ onLogout }: { onLogout: () => void }) {
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
      });

      if (!res.ok) {
        throw new Error("로그아웃 실패");
      }

      onLogout();
    } catch (error) {
      alert(error);
    }
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}
