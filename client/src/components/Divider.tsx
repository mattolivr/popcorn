type DividerType = {
  text?: string;
};

export default function Divider({ text }: DividerType) {
  return (
    <div className="w-full relative inline-flex items-center justify-center">
      <hr className="w-full h-0.5 my-2 bg-slate-300" />
      <Span text={text} />
    </div>
  );
}

function Span({ text }: { text?: string }) {
  if (text) {
    return (
      <span
        className="absolute px-3 font-medium text-gray-600 -translate-x-1/2
            bg-white left-1/2"
      >
        {text}
      </span>
    );
  }
}
