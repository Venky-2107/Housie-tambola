import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`bg-card border border-slate-600 rounded-md px-3 py-1 text-gray-800 placeholder-gray-500
                  focus:outline-none focus:ring-1 focus:ring-accent
                  ${className}`}
      {...props}
    />
  );
}
