import { useRef, type ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { tv } from "tailwind-variants";
import { useButtonContext } from "./context";

export default function ButtonBase(
  props: ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
): React.ReactNode {
  const {
    button: { align, color, className, to },
  } = useButtonContext();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>): void => {
    if (buttonRef.current) {
      buttonRef.current.blur();
    }
    if (anchorRef.current) {
      anchorRef.current.blur();
    }
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const { onClick, ...rest } = props;

  if (to == null || to === "") {
    return (
      <button
        ref={buttonRef}
        className={buttonStyle({ align, color, hidden: props.hidden, className })}
        onClick={handleClick}
        {...rest}
      >
        {props.children}
      </button>
    );
  }
  return (
    <Link to={to} ref={anchorRef} className={buttonStyle({ align, color, hidden: props.hidden, className })} {...rest}>
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
      clear:
        "bg-transparent outline-transparent text-gray-700 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-300 disabled:bg-gray-300",
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
