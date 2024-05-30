import { useId, useState } from "react";
import { type FieldErrors } from "react-hook-form";
import { useFormContext } from "../form/context";
import InputContext from "./context";
import { InputBase } from "./InputBase";
import { InputHint } from "./InputHint";
import { InputIcon } from "./InputIcon";
import { InputLabel } from "./InputLabel";

interface InputRootProps {
  type: React.ReactNode;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  ricon?: React.ReactNode;
  hint?: React.ReactNode;

  name?: string;

  hidden?: boolean;
  optional?: boolean;
}

export function Input(props: InputRootProps): React.ReactNode {
  const { label, icon, ricon, hint, type } = props;
  const { name, hidden, optional } = props;

  const id = useId();
  const [focus, setFocus] = useState(false);
  const [state, setState] = useState<InputState>({ state: "default" });
  const formContext = useFormContext();

  if (formContext != null) {
    if (name == null) {
      throw Error("É necessário informar a propriedade 'name' para inputs de formulário");
    }

    const error: FieldErrors[typeof name] = formContext.form.formState?.errors[name];

    if (error == null && state.state !== "default") {
      setState({ state: "default" });
    }
    if (error != null && state.state !== "error") {
      setState({ state: "error", message: getErrorByType(error.type) });
    }
  }

  const input: InputType = {
    id,
    name,
    state,
    focus: { focus, setFocus },
    optional,
  };

  return (
    <InputContext.Provider value={{ input }}>
      <div className={`${hidden ? "hidden" : "flex"} flex-col`}>
        {label}
        <InputBase>
          {icon}
          {type}
          {ricon}
        </InputBase>
        {hint ?? <InputHint text={state.message ?? ""} />}
      </div>
    </InputContext.Provider>
  );
}

Input.Label = InputLabel;
Input.Icon = InputIcon;
Input.Hint = InputHint;

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
