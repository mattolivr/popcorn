import { createContext, useContext } from "react";
import { type ButtonType } from "./Button";

const ButtonContext = createContext<{ button: ButtonType } | null>(null);

export function useButtonContext(): { button: ButtonType } {
  const context = useContext(ButtonContext);
  if (context == null) {
    throw Error("Os elementos Button.* devem ser reenderizados dentro de Button");
  }
  return context;
}

export default ButtonContext;
