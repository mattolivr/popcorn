import { tv } from "tailwind-variants";
import { useInputContext } from "./context";

interface InputHintProps {
  text: string;
  className?: string;
}

export function InputHint(props: InputHintProps): React.ReactNode {
  const { text, className } = props;
  const {
    input: {
      focus: { focus },
      state: { state, message },
    },
  } = useInputContext();

  const showHint = message == null ? focus : true;

  return (
    <span className={hintStyle({ state, className })} hidden={!showHint}>
      {message ?? text}
    </span>
  );
}

const hintStyle = tv({
  base: "text-sm mt-1",
  variants: {
    state: {
      default: "text-gray-500",
      error: "text-red-500 font-medium",
      success: "text-emerald-500 font-medium",
    },
  },
  defaultVariants: {
    state: "default",
  },
});
