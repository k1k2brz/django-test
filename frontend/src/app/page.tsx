import { use } from "react";
import AddItemForm from "./_components/Items/AddItemForm";
import ItemList from "./_components/Items/ItemList";

export default function Home() {
  async function getData() {
    const res = await fetch("http://localhost:8000/api/items/");
    return res.json();
  }

  const items = use(getData());

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">DB 목록</h1>
        <AddItemForm />

        <ItemList items={items} />
      </div>
    </div>
  );
}
