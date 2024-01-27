interface DividerType {
  text?: string;
}

export default function Divider({ text }: DividerType) {
  return (
    <div className="relative inline-flex w-full items-center justify-center">
      <hr className="my-2 h-0.5 w-full bg-slate-300" />
      <Span text={text} />
    </div>
  );
}

function Span({ text }: { text?: string }) {
  if (text) {
    return (
      <span
        className="absolute left-1/2 -translate-x-1/2 bg-white px-3
            font-medium text-gray-400"
      >
        {text}
      </span>
    );
  }
}
