import { type ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { tv } from "tailwind-variants";
import { useButtonContext } from "./context";

export default function ButtonBase(
  props: ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
): React.ReactNode {
  const {
    button: { align, color, className, to },
  } = useButtonContext();

  if (to == null || to === "") {
    return (
      <button {...props} className={buttonStyle({ align, color, hidden: props.hidden, className })}>
        {props.children}
      </button>
    );
  }
  return (
    <Link
      to={to}
      {...props}
      className={buttonStyle({ align, color, hidden: props.hidden, className })}
    >
      {props.children}
    </Link>
  );
}

export const buttonStyle = tv({
  base: "rounded-xl px-4 h-9 font-semibold flex-row items-center gap-2",
  variants: {
    color: {
      primary:
        "bg-sky-500 outline-transparent text-white hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-700 disabled:bg-gray-400",
      secondary:
        "bg-transparent border-2 border-sky-300 text-sky-400 hover:bg-sky-400 hover:border-sky-400 hover:text-white active:bg-sky-500 active:border-sky-500 active:text-white",
      blank:
        "bg-white outline-gray-400 shadow-sm border border-gray-100 hover:bg-gray-100 text-gray-700",
      transparent:
        "bg-transparent outline-transparent text-gray-700 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-300 disabled:bg-gray-300",
      transparent_selected:
        "bg-sky-100 outline-sky-300 hover:bg-sky-200 text-sky-500 hover:text-sky-600",
    },
    align: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    },
    hidden: {
      true: "hidden",
      false: "flex",
    },
  },
  defaultVariants: {
    color: "primary",
    align: "center",
    hidden: false,
  },
});
