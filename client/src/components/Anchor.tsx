import { Link } from "react-router-dom";
import { tv, type VariantProps } from "tailwind-variants";

export type AnchorProps = VariantProps<typeof anchorStyle> & {
  to: string;
  className?: string;
  children: React.ReactNode;
  hidden?: boolean;
};

export default function Anchor(props: AnchorProps): React.ReactNode {
  const { color, to, className, children, hidden } = props;
  const style = anchorStyle({ color, className });

  return (
    !hidden && (
      <Link to={to} className={style}>
        {children}
      </Link>
    )
  );
}

const anchorStyle = tv({
  base: "rounded-2xl px-1 py-1 text-center font-semibold",
  variants: {
    color: {
      primary:
        "text-sky-700 outline-transparent hover:bg-sky-100 focus:bg-sky-100 focus:text-sky-600",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});
