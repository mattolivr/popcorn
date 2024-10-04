import { tv } from "tailwind-variants";
import { useInputContext } from "./context";

interface InputLabelProps {
  text: string;

  className?: string;
  addonClassName?: string;
}

export function InputLabel(props: InputLabelProps): React.ReactNode {
  const { text, className, addonClassName } = props;
  const {
    input: { id, optional },
  } = useInputContext();

  return (
    <label htmlFor={id} className="mb-1">
      <span className={labelStyle({ className })}>{text}</span>
      <span className={addonTagStyle({ className: addonClassName })}>
        {optional && "(opcional)"}
      </span>
    </label>
  );
}

const labelStyle = tv({
  base: "font-medium",
});

const addonTagStyle = tv({
  base: "font-medium ml-1 text-sm",
});
