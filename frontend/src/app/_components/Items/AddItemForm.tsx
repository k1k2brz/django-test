"use client";

import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import Textarea from "../common/Textarea";
import { getCookie } from "@/app/_utils/cookie";

interface AddItemFormProps {
  onItemAdded: (newItem: {
    id: number;
    name: string;
    description: string;
  }) => void;
}

export default function AddItemForm({ onItemAdded }: AddItemFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/items/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "include",
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) {
        throw new Error("아이템 추가 실패");
      }

      const newItem = await res.json();
      setName("");
      setDescription("");
      onItemAdded(newItem); // 새로운 아이템이 추가되면 목록 업데이트
    } catch (error) {
      console.error(error);
      alert("아이템을 추가 할 수 없습니다.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-8 max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-6">아이템 추가</h2>
      <div className="mb-4">
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="아이템 이름을 입력하세요"
        />
      </div>
      <div className="mb-6">
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="아이템 설명을 입력하세요"
        />
      </div>
      <Button type="submit">아이템 추가</Button>
    </form>
  );
}
