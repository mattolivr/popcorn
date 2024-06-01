import React from "react";
import { tv } from "tailwind-variants";
import CardTitle from "./CardTitle";

interface CardProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  hidden?: boolean;
}

export default function Card(props: CardProps): React.ReactNode {
  const { title, children, className, hidden } = props;
  return (
    !hidden && (
      <div className={cardStyle({ className })}>
        {title}
        {children}
      </div>
    )
  );
}

Card.Title = CardTitle;

const cardStyle = tv({
  base: "flex flex-col h-fit w-full rounded-md bg-white px-4 py-2 shadow-sm",
});
