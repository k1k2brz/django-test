"use client";

import { useState } from "react";
import Label from "../common/Label";
import Input from "../common/Input";
import Button from "../common/Button";
import Textarea from "../common/Textarea";

export default function AddItemForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/items/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      const data = await res.json();

      setName("");
      setDescription("");
      console.log("아이템 추가됨:", data);
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
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="작성할 이름을 입력하세요"
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="description">설명</Label>
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
