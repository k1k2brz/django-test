"use client";

import classNames from "classnames";

interface InputProps {
  className?: string;
  id: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  type?: "text" | "password";
}

export default function Input({
  id,
  value,
  onChange,
  placeholder,
  className,
  type = "text",
}: InputProps) {
  return (
    <input
      id={id}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={classNames('w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500', className)}
    />
  );
}
