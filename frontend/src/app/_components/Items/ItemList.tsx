"use client";

import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Textarea from "../common/Textarea";

interface Item {
  id: number;
  name: string;
  description: string;
}

export default function ItemList({ items }: { items: Item[] }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleEdit = (item: Item) => {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
  };

  const handleUpdate = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/api/items/update/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (res.ok) {
        alert("아이템이 업데이트되었습니다.");
        setEditingId(null);
      }
    } catch (error) {
      console.error(error);
      alert("아이템을 업데이트할 수 없습니다.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/api/items/delete/${id}/`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("아이템이 삭제되었습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("아이템을 삭제할 수 없습니다.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
          {editingId === item.id ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">수정 중</h2>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="아이템 이름"
                id={`edit-name-${item.id}`}
              />
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="아이템 설명"
                id={`edit-description-${item.id}`}
              />
              <div className="mt-4 flex justify-between">
                <Button onClick={() => handleUpdate(item.id)}>저장</Button>
                <Button onClick={() => setEditingId(null)}>취소</Button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="text-gray-600 mt-2">{item.description}</p>
              <div className="mt-4 flex justify-between">
                <Button onClick={() => handleEdit(item)}>수정</Button>
                <Button onClick={() => handleDelete(item.id)}>삭제</Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
