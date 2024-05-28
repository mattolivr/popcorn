import { type FieldValues, type UseFormRegister } from "react-hook-form";
import FormContainer from "./FormContainer";
import FormSubmit from "./FromSubmit";

export const Form = {
  Container: FormContainer,
  Submit: FormSubmit,
};

export interface FormType {
  register: UseFormRegister<FieldValues>;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
}
