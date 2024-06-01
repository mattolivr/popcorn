import { tv } from "tailwind-variants";

interface CardTitleProps {
  text?: string;
  className?: string;
}

export default function CardTitle(props: CardTitleProps): React.ReactNode | undefined {
  const { text, className } = props;

  return text && <h1 className={cardTitleStyle({ className })}>{text}</h1>;
}

const cardTitleStyle = tv({
  base: "mb-2 text-lg font-semibold text-stone-950 sm:text-2xl",
});
