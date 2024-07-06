import { tv } from "tailwind-variants";

interface DividerType {
  className?: string;
  children?: React.ReactNode;
}

export default function Divider(props: DividerType): JSX.Element {
  const { className, children } = props;

  return (
    <div className={dividerStyle({ className })}>
      <hr className="my-2 h-[3px] w-full rounded-2xl bg-gray-300" />
      {children && <p className={labelStyle()}>{children}</p>}
      {children && <hr className="my-2 h-[3px] w-full rounded-2xl bg-gray-300" />}
    </div>
  );
}

const dividerStyle = tv({
  base: "flex flex-row gap-2 items-center",
});

const labelStyle = tv({
  base: "text-nowrap font-medium text-gray-500",
});
