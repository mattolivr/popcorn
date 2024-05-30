import { type ElementType } from "react";
import { tv } from "tailwind-variants";
import { useInputContext } from "./context";

interface InputIconProps {
  icon: ElementType;
  className?: string;
}

export function InputIcon(props: InputIconProps): React.ReactNode {
  const { icon: Icon, className } = props;
  const {
    input: {
      state: { state },
    },
  } = useInputContext();

  return <Icon className={iconStyle({ state, className })} />;
}

const iconStyle = tv({
  base: "min-w-max text-lg",
  variants: {
    state: {
      default: "text-gray-600",
      error: "text-red-700",
      success: "text-emerald-800",
    },
  },
  defaultVariants: {
    state: "default",
  },
});
