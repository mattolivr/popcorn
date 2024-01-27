import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className }: Props) {
  return (
    <div
      className={`flex flex-col rounded-md bg-white px-4 py-3 shadow-sm ${className}`}
    >
      <h1 className="mb-2 text-2xl font-semibold text-stone-950">{title}</h1>
      {children}
    </div>
  );
}
