import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-3 py-2 pr-4 rounded-full font-semibold transition 
                  bg-accent text-black hover:opacity-90 
                  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
