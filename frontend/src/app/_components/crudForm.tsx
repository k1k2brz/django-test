"use client";

import { useState, useEffect } from "react";
import AddItemForm from "./Items/AddItemForm";
import ItemList from "./Items/ItemList";


interface Item {
  id: number;
  name: string;
  description: string;
}

export default function CrudForm() {
  const [items, setItems] = useState<Item[]>([]); // 아이템 목록 관리
  const [loading, setLoading] = useState(true);

  // 서버에서 데이터를 가져오는 함수
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/items/");
      const data = await res.json();
      setItems(data); // 아이템 목록 업데이트
    } catch (error) {
      console.error("아이템을 불러오는 데 실패했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  // 아이템 추가 후 목록을 업데이트하는 함수
  const handleItemAdded = (newItem: Item) => {
    setItems((prevItems) => [...prevItems, newItem]); // 새 아이템 추가
  };

  // 아이템 삭제 후 목록 업데이트 함수
  const handleItemDeleted = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 아이템 업데이트 후 목록 업데이트 함수
  const handleItemUpdated = (updatedItem: Item) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return <div>로딩...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">CRUD 목록</h1>
        <AddItemForm onItemAdded={handleItemAdded} />
        
        <ItemList
          items={items}
          onItemDeleted={handleItemDeleted}
          onItemUpdated={handleItemUpdated}
        />
      </div>
    </div>
  );
}