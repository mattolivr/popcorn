import { type FieldValues, type UseFormRegister } from "react-hook-form";
import { type FormType } from ".";
import FormContext from "./context";

interface FormProps {
  children: React.ReactNode;
  register: UseFormRegister<FieldValues>;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;

  className?: string;
}

export default function FormContainer(props: FormProps): React.ReactNode {
  const { children, register, onSubmit, className } = props;
  const form: FormType = {
    register,
    onSubmit,
  };

  return (
    <FormContext.Provider value={{ form }}>
      <div className={className}>{children}</div>
    </FormContext.Provider>
  );
}
