import { type ElementType } from "react";
import { tv } from "tailwind-variants";

interface InputIconProps {
  icon: ElementType;
  className?: string;
}

export function InputIcon(props: InputIconProps): React.ReactNode {
  const { icon: Icon, className } = props;
  return <Icon className={iconStyle({ className })} />;
}

const iconStyle = tv({
  base: "min-w-max text-lg",
  variants: {
    status: {
      default: "text-gray-600",
      error: "text-red-800",
      success: "text-emerald-800",
    },
  },
  defaultVariants: {
    status: "default",
  },
});
