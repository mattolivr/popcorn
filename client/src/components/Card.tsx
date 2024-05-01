import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  title,
  children,
  className,
}: CardProps): JSX.Element {
  // TODO: Adicionar variants
  return (
    <div
      className={`flex h-fit w-full flex-col rounded-sm bg-white px-4 py-2 shadow-sm sm:rounded-md ${className}`}
    >
      {title != null ? (
        <h1 className="mb-2 text-lg font-semibold text-stone-950 sm:text-xl">
          {title}
        </h1>
      ) : (
        <></>
      )}
      {children}
    </div>
  );
}
