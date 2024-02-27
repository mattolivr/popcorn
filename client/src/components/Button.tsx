import { type ComponentProps } from "react";
import { type IconBaseProps, type IconType } from "react-icons";
import { Link } from "react-router-dom";
import { tv, type VariantProps } from "tailwind-variants";

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof button> & {
    to?: string; // Navegação por Link -> React Router DOM

    icon?: IconType;
  };

export default function Button({
  to,
  color,
  align,
  className,
  ...props
}: ButtonProps): JSX.Element {
  const style = button({ color, align, className });

  if (to != null) {
    return (
      <Link to={to} className={style}>
        <Icon icon={props.icon} />
        {props.children}
      </Link>
    );
  }
  return (
    <button className={style}>
      <Icon icon={props.icon} />
      {props.children}
    </button>
  );
}

const button = tv({
  base: "rounded-xl px-4 h-9 font-semibold flex flex-row items-center gap-2",
  variants: {
    color: {
      primary:
        "bg-sky-500 outline-sky-600 text-white hover:bg-sky-600 active:bg-sky-700",
      secondary:
        "bg-transparent outline-sky-600 border border-sky-600 text-sky-600 hover:bg-sky-500 hover:border-sky-500 hover:text-white active:bg-sky-700 active:border-sky-700 active:text-white",
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
      className: `inline`,
    };

    return icon(props);
  }
  return <></>;
}
