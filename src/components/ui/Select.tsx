import React from "react";

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export default function Select({ className = "", ...props }: SelectProps) {
  return (
    <select
      className={`bg-card border border-slate-700 rounded-md px-2 py-1 w-full ${className}`}
      {...props}
    />
  );
}
