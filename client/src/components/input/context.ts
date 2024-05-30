import { createContext, useContext } from "react";
import { type InputType } from "./Input";

const InputContext = createContext<{ input: InputType } | null>(null);

export function useInputContext(): { input: InputType } {
  const context = useContext(InputContext);
  if (context == null) {
    throw Error(
      "Os elementos Input.* devem ser reenderizados dentro de Input.Root",
    );
  }
  return context;
}

export default InputContext;
