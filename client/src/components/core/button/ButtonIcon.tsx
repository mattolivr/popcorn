import { type ElementType } from "react";
import { tv } from "tailwind-variants";

interface ButtonIconProps {
  icon?: ElementType;
  className?: string;
}

export function ButtonIcon({ icon: Icon, className }: ButtonIconProps): React.ReactNode {
  if (Icon == null) {
    return <></>;
  }
  return <Icon className={buttonStyle({ className })} />;
}

const buttonStyle = tv({
  base: "text-xl",
});
