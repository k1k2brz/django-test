"use client";

import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import { getCookie } from "@/app/_utils/cookie";

interface Item {
  id: number;
  name: string;
  description: string;
}

interface ItemListProps {
  items: Item[];
  onItemDeleted: (id: number) => void;
  onItemUpdated: (updatedItem: Item) => void;
}

export default function ItemList({
  items,
  onItemDeleted,
  onItemUpdated,
}: ItemListProps) {
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
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({ name, description }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("아이템 업데이트 실패");
      }

      const updatedItem = await res.json();
      onItemUpdated(updatedItem); // 업데이트된 아이템 전달
      setEditingId(null);
    } catch (error) {
      console.error(error);
      alert("아이템을 업데이트 할 수 없습니다.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/api/items/delete/${id}/`, {
        method: "DELETE",
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "include",
      });

      if (res.ok) {
        onItemDeleted(id); // 삭제된 아이템 ID 전달
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
