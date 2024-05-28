import { type InputHTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { useFormContext } from "../form/context";
import { useInputContext } from "./context";

export function InputText(
  props: InputHTMLAttributes<HTMLInputElement>,
): React.ReactNode {
  const {
    input: {
      focus: { setFocus },
      optional,
      name,
    },
  } = useInputContext();

  const isRequired = optional == null || !optional;

  const formContext = useFormContext();
  let registerProps;
  if (formContext != null && name != null) {
    registerProps = formContext.form.register(name, {
      onBlur: () => {
        setFocus(false);
      },
      required: isRequired,
    });
  }

  return (
    <input
      type="text"
      className={inputTextStyle({ className: props.className })}
      onFocus={(e) => {
        setFocus(true);
        if (props.onFocus != null) {
          props.onFocus(e);
        }
      }}
      {...registerProps}
    />
  );
}

const inputTextStyle = tv({
  base: "bg-transparent border-none focus:ring-transparent w-full h-10 p-0",
});
