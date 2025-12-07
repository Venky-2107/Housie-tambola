import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return <h2 className="text-lg font-semibold mb-2">{children}</h2>;
}
