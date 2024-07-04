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
      state: { state },
      focus: { focus },
    },
  } = useInputContext();

  const style = baseStyle({ state, focus, className });
  return <div className={style}>{children}</div>;
}

const baseStyle = tv({
  base: "flex items-center rounded-xl w-full gap-2 px-3",
  variants: {
    state: {
      default: "bg-gray-100 ring-gray-300",
      error: "bg-gray-100 ring-2 text-red-800 placeholder-red-700 ring-red-400",
      success:
        "bg-emerald-100 text-emerald-800 placeholder-emerald-700 ring-emerald-300",
    },
    focus: {
      true: "ring-2",
    },
  },
  defaultVariants: {
    state: "default",
  },
});
