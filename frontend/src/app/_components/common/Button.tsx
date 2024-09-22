"use client";

import classNames from "classnames";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit";
}

export default function Button({
  onClick,
  children,
  className,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames("bg-indigo-600 w-full text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300", className)}
    >
      {children}
    </button>
  );
}
