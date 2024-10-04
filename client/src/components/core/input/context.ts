import { createContext, useContext } from "react";
import { type IInput } from "./Input";

const InputContext = createContext<{ input: IInput } | null>(null);

export function useInputContext(): { input: IInput } {
  const context = useContext(InputContext);
  if (context == null) {
    throw Error("Os elementos Input.* devem ser reenderizados dentro de Input");
  }
  return context;
}

export default InputContext;
