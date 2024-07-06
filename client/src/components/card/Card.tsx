import { isValidElement, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";
import CardTitle from "./CardTitle";

interface CardProps extends VariantProps<typeof cardStyle> {
  children: ReactNode;

  title?: ReactNode | string;
  className?: string;

  hidden?: boolean;
}

export default function Card(props: CardProps): ReactNode {
  const { children, title, className, hidden, full, button } = props;
  return (
    !hidden && (
      <div className={cardStyle({ full, button, className })}>
        {getTitle(title)}
        {children}
      </div>
    )
  );
}

function getTitle(title?: ReactNode | string): ReactNode {
  if (typeof title === "string") {
    return <h4>{title}</h4>;
  }
  if (isValidElement(title)) {
    return title;
  }
}

Card.Title = CardTitle;

const cardStyle = tv({
  base: "flex flex-col h-fit rounded-lg bg-white px-4 py-2 shadow-sm",
  variants: {
    full: {
      true: "w-full",
    },
    button: {
      true: "hover:bg-gray-100 cursor-pointer",
    },
  },
});
