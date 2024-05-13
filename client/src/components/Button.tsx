import { type ComponentProps } from "react";
import { type IconBaseProps, type IconType } from "react-icons";
import { Link } from "react-router-dom";
import { tv, type VariantProps } from "tailwind-variants";

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonStyle> & {
    to?: string; // Navegação por Link -> React Router DOM

    icon?: IconType;
  };

export default function Button({
  to,
  icon,
  color,
  align,
  className,
  ...props
}: ButtonProps): JSX.Element {
  const style = buttonStyle({ color, align, className });

  if (to != null) {
    return (
      <Link to={to} className={style}>
        <Icon icon={icon} />
        {props.children}
      </Link>
    );
  }
  return (
    <button className={style} {...props}>
      <Icon icon={icon} />
      {props.children}
    </button>
  );
}

const buttonStyle = tv({
  base: "rounded-xl px-4 h-9 font-semibold flex flex-row items-center gap-2",
  variants: {
    color: {
      primary:
        "bg-sky-500 outline-sky-600 text-white hover:bg-sky-600 active:bg-sky-700 disabled:bg-gray-400",
      secondary:
        "bg-transparent border-2 border-sky-300 text-sky-400 hover:bg-sky-400 hover:border-sky-400 hover:text-white active:bg-sky-500 active:border-sky-500 active:text-white",
      blank:
        "bg-white outline-gray-400 shadow-sm border border-gray-100 hover:bg-gray-100 text-gray-700",
      transparent:
        "bg-transparent outline-gray-300 hover:bg-gray-200 text-gray-700",
      transparent_selected:
        "bg-sky-100 outline-sky-300 hover:bg-sky-200 text-sky-500 hover:text-sky-600",
    },
    align: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    },
  },
  defaultVariants: {
    color: "primary",
    align: "center",
  },
});

function Icon({ icon }: { icon?: IconType }): JSX.Element {
  if (icon != null) {
    const props: IconBaseProps = {
      className: `inline text-xl`,
    };

    return icon(props);
  }
  return <></>;
}
