import { type InputHTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { useFormContext } from "../form/context";
import { useInputContext } from "./context";

export function InputText(props: InputHTMLAttributes<HTMLInputElement>): React.ReactNode {
  const {
    input: {
      focus: { setFocus },
      optional,
      name,
    },
  } = useInputContext();
  const formContext = useFormContext();

  const isRequired = optional == null || !optional;

  const onBlur = (): void => {
    setFocus(false);
  };

  let registerProps;
  if (formContext != null && name != null) {
    registerProps = formContext.form.register(name, {
      onBlur,
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
      onBlur={onBlur}
      {...registerProps}
    />
  );
}

const inputTextStyle = tv({
  base: "bg-transparent border-none focus:ring-transparent w-full h-10 p-0",
});
