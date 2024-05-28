import { createContext, useContext } from "react";
import { type FormType } from ".";

const FormContext = createContext<{ form: FormType } | null>(null);

export function useFormContext(): { form: FormType } | null {
  return useContext(FormContext);
}

export default FormContext;
