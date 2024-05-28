import { tv } from "tailwind-variants";
import { useInputContext } from "./context";

interface InputBaseProps {
  children: React.ReactNode;
  className?: string;
}

export function InputBase(props: InputBaseProps): React.ReactNode {
  const { children, className } = props;
  const {
    input: {
      focus: { focus },
    },
  } = useInputContext();

  const style = baseStyle({ focus, className });
  return <div className={style}>{children}</div>;
}

const baseStyle = tv({
  base: "flex items-center rounded-lg w-full gap-2 px-3",
  variants: {
    status: {
      default: "bg-gray-100",
      error: "bg-red-100 text-red-800 placeholder-red-700",
      success: "bg-emerald-100 text-emerald-800 placeholder-emerald-700",
    },
    focus: {
      true: "ring-2 ring-gray-300",
    },
  },
  defaultVariants: {
    status: "default",
  },
});
