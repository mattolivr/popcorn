import { useId, useState } from "react";
import { type FieldErrors } from "react-hook-form";
import { type IconType } from "react-icons";
import { tv } from "tailwind-variants";
import { useFormContext } from "../form/context";
import InputContext from "./context";
import { InputBase } from "./InputBase";
import { InputHint } from "./InputHint";
import { InputIcon } from "./InputIcon";
import { InputLabel } from "./InputLabel";
import { InputDate } from "./type/InputDate";
import { InputText } from "./type/InputText";

interface InputRootProps {
  type?: React.ReactNode | InputType;
  label?: React.ReactNode | string;
  icon?: React.ReactNode | IconType;
  ricon?: React.ReactNode | IconType;
  hint?: React.ReactNode | string;

  name?: string;

  hidden?: boolean;
  optional?: boolean;

  className?: string;
}

export type InputType = "text" | "date";

export function Input(props: InputRootProps): React.ReactNode {
  const { label, icon, ricon, hint, type } = props;
  const { name, hidden, optional, className } = props;

  const id = useId();
  const [focus, setFocus] = useState(false);
  const [state, setState] = useState<InputState>({ state: "default" });
  const formContext = useFormContext();

  if (formContext != null) {
    if (name == null) {
      throw Error(
        "É necessário informar a propriedade 'name' para inputs de formulário",
      );
    }

    const formState = formContext.form.formState;
    if (formState) {
      const error: FieldErrors[typeof name] = formState.errors[name];

      if (error == null && state.state !== "default") {
        setState({ state: "default" });
      }
      if (error != null && state.state !== "error") {
        setState({ state: "error", message: getErrorByType(error.type) });
      }
    }
  }

  const input: IInput = {
    id,
    name,
    state,
    focus: { focus, setFocus },
    optional,
  };

  return (
    <InputContext.Provider value={{ input }}>
      <div className={inputStyle({ hidden, className })}>
        {getLabel(label)}
        <InputBase>
          {getIcon(icon)}
          {getType(type)}
          {getIcon(ricon)}
        </InputBase>
        {getHint(hint, state)}
      </div>
    </InputContext.Provider>
  );
}

Input.Label = InputLabel;
Input.Icon = InputIcon;
Input.Hint = InputHint;

export interface IInput {
  id: string;
  name?: string;

  state: InputState;
  focus: {
    focus: boolean;
    setFocus: React.Dispatch<React.SetStateAction<boolean>>;
  };

  optional?: boolean;
}

export interface InputState {
  state: "default" | "error" | "success";
  message?: string;
}

function getErrorByType(type: any | undefined): string | undefined {
  switch (type) {
    case "required":
      return "Este campo deve ser preenchido";
    default: {
      console.log("Tipo de erro de input não implementado: ", type);
    }
  }
}

function getLabel(
  label: React.ReactNode | string | undefined,
): React.ReactNode {
  if (typeof label === "string") {
    return <Input.Label text={label} />;
  }
  return label;
}

function getIcon(
  icon: React.ReactNode | IconType | undefined,
): React.ReactNode {
  if (typeof icon === "function") {
    return <Input.Icon icon={icon} />;
  }
  return icon;
}

function getType(
  type: React.ReactNode | InputType | undefined,
): React.ReactNode {
  if (!type) {
    return <InputText />;
  }
  if (typeof type === "string") {
    switch (type) {
      case "date":
        return <InputDate />;
    }
  }

  return type;
}

function getHint(
  hint: React.ReactNode | string | undefined,
  state: InputState,
): React.ReactNode {
  if (state.state !== "default" && state.message) {
    return <Input.Hint text={state.message} />;
  }
  if (typeof hint === "string") {
    return <Input.Hint text={hint} />;
  }
  return hint;
}

const inputStyle = tv({
  base: "flex-col",
  variants: {
    hidden: {
      true: "hidden",
      false: "flex",
    },
  },
  defaultVariants: {
    hidden: false,
  },
});
