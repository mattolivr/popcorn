import { type UseFormRegisterReturn } from "react-hook-form";
import { type FormType } from "../../form/Form";
import { type IInput } from "../Input";

export function getRegisterProps(
  input: IInput,
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void,
  form?: FormType,
): UseFormRegisterReturn<string> | undefined {
  const { optional, name } = input;

  if (form && name) {
    return form.register(name, {
      onBlur,
      required: !optional,
    });
  }
}
