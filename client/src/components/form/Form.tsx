import { type FieldValues, type FormState, type UseFormRegister } from "react-hook-form";
import FormContext from "./context";
import FormSubmit from "./FormSubmit";

interface FormProps {
  children: React.ReactNode;

  register: UseFormRegister<FieldValues>;
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  formState: FormState<FieldValues>;

  className?: string;
}

export default function Form(props: FormProps): React.ReactNode {
  const { children, register, onSubmit, formState, className } = props;
  const form: FormType = {
    register,
    onSubmit,
    formState,
  };

  return (
    <FormContext.Provider value={{ form }}>
      <div className={className}>{children}</div>
    </FormContext.Provider>
  );
}

Form.Submit = FormSubmit;

export interface FormType {
  register: UseFormRegister<FieldValues>;
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  formState: FormState<FieldValues>;
}
