interface DividerType {
  className?: string;
  children?: React.ReactNode;
}

export default function Divider(props: DividerType): JSX.Element {
  const { className, children } = props;

  return (
    <div
      className={`relative inline-flex w-full items-center justify-center ${className}`}
    >
      <hr className="my-2 h-0.5 w-full bg-slate-300" />
      {children != null && (
        <span
          className="absolute left-1/2 -translate-x-1/2 bg-white px-3
            font-medium text-gray-400"
        >
          {children}
        </span>
      )}
    </div>
  );
}
