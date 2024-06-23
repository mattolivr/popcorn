import { type InputHTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { useFormContext } from "../../form/context";
import { useInputContext } from "../context";
import { getRegisterProps } from "./input";

export function InputText(props: InputHTMLAttributes<HTMLInputElement>): React.ReactNode {
  const { input } = useInputContext();
  const { form } = useFormContext() ?? { form: undefined };
  const { onFocus, onBlur, ...rest } = props;

  const {
    focus: { setFocus },
  } = input;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
    setFocus(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
    setFocus(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const registerProps = getRegisterProps(input, handleBlur, form);

  return (
    <input
      type="text"
      className={inputTextStyle({ className: props.className })}
      onFocus={handleFocus}
      onBlur={registerProps ? handleBlur : () => {}}
      {...registerProps}
      {...rest}
    />
  );
}

const inputTextStyle = tv({
  base: "bg-transparent border-none focus:ring-transparent w-full h-10 p-0",
});
