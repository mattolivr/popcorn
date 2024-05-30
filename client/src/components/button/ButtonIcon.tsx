import { type ElementType } from "react";
import { tv } from "tailwind-variants";

interface ButtonIconProps {
  icon?: ElementType;
}

export function ButtonIcon({ icon: Icon }: ButtonIconProps): React.ReactNode {
  if (Icon == null) {
    return <></>;
  }
  return <Icon className={buttonStyle()} />;
}

const buttonStyle = tv({
  base: "text-lg",
});
