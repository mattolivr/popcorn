import { InputBase } from "./InputBase";
import { InputIcon } from "./InputIcon";
import { InputLabel } from "./InputLabel";
import { InputRoot } from "./InputRoot";
import { InputText } from "./InputText";

export const Input = {
  Root: InputRoot,
  Base: InputBase,
  Label: InputLabel,
  Icon: InputIcon,
  InputText,
};

export interface InputType {
  id: string;
  name?: string;

  state: InputState;
  focus: {
    focus: boolean;
    setFocus: React.Dispatch<React.SetStateAction<boolean>>;
  };

  optional?: boolean;
}

export type InputState = "default" | "error" | "success";
