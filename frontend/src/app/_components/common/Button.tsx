"use client";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit";
}

export default function Button({
  onClick,
  children,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-indigo-600 w-full text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300"
    >
      {children}
    </button>
  );
}
