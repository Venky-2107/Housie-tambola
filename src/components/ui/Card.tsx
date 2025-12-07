import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export default function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl p-4 bg-card bg-cyan-50 border border-slate-100 shadow-xl bg-gradient-to-br from-sky-200 via-teal-200 to-emerald-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
