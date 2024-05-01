import { useId, useState } from "react";
import { type FieldValues, type UseFormRegister } from "react-hook-form";
import { type IconBaseProps, type IconType } from "react-icons";
import { FaInfo } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

export interface InputProps extends InputForm {
  type: Type;

  label?: string;
  hint?: string;

  action?: Action; // TODO: Implementar
  icon?: IconType;

  visible?: boolean;
  required?: boolean; // TODO: Implementar
  disabled?: boolean; // TODO: Implementar
}

interface InputForm {
  name?: string;
  register?: UseFormRegister<FieldValues>;

  validator?: (value: string) => string | null;
  sanitizer?: (value: string) => string; // TODO: Implementar
}

interface Action {
  name: string;
  function: () => void;
}

type Type =
  | "text"
  | "email"
  | "password"
  | "number"
  | "integer"
  | "date"
  | "file";

enum State {
  DEFAULT,
  ERROR,
  SUCCESS,
}

export default function Input(props: InputProps): JSX.Element {
  const [state, setState] = useState(State.DEFAULT);
  const [errorMessage, setErrorMessage] = useState("");

  const id = useId();

  const inputStyle = `${baseStyle} ${stateStyle(state)} 
    ${iconLeftPadding(props.icon != null)}`;

  let formProps = null;
  if (props.register != null) {
    if (props.name == null) {
      throw new Error('Input: Necessário especificar a propriedade "name"');
    }
    formProps = props.register(props.name, { required: props.required });
  }

  return (
    <>
      <div className={props.visible === false ? "hidden" : "relative"}>
        <Label id={id} label={props.label} />
        <div className="relative">
          <Icon icon={props.icon} state={state} />
          <input
            className={inputStyle}
            placeholder={props.hint}
            id={id}
            {...formProps}
            onChange={(event) => {
              handleChange(
                event,
                { setState, state, setErrorMessage },
                props.validator,
              );
            }}
          />
          <Interation state={state} />
        </div>
        <ErrorMessage state={state} errorMessage={errorMessage} />
      </div>
    </>
  );
}

function handleChange(
  event: React.ChangeEvent<HTMLInputElement>,
  errorHandler: {
    setState: React.Dispatch<React.SetStateAction<State>>;
    state: State;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  },
  validator?: (value: string) => string | null,
): void {
  if (validator != null) {
    if (event.target.value === "") {
      errorHandler.setState(State.DEFAULT);
      errorHandler.setErrorMessage("");
    } else {
      const ret = validator(event.target.value);
      errorHandler.setState(ret == null ? errorHandler.state : State.ERROR);
      errorHandler.setErrorMessage(ret ?? "");
    }
  }
}

function Label({ id, label }: { id: string; label?: string }): JSX.Element {
  if (label != null) {
    return (
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
    );
  }
  return <></>;
}

function Icon({ icon, state }: { icon?: IconType; state: State }): JSX.Element {
  let color: string;
  switch (state) {
    case State.ERROR:
      color = "text-red-700";
      break;
    case State.SUCCESS:
      color = "text-green-700";
      break;
    default:
      color = "text-gray-400";
  }

  if (icon != null) {
    const props: IconBaseProps = {
      className: color,
    };

    return (
      <div
        className={`pointer-events-none absolute inset-y-0 start-0 flex items-center 
        ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50`}
      >
        {icon(props)}
      </div>
    );
  }
  return <></>;
}

function Interation({ state }: { state: State }): JSX.Element {
  let iconType: IconType | null;
  let color: string;

  switch (state) {
    case State.ERROR:
      iconType = FaInfo;
      color = "text-red-700";
      break;
    case State.SUCCESS:
      iconType = FaCheck;
      color = "text-green-700";
      break;
    default:
      iconType = null;
      color = "";
  }

  if (iconType != null) {
    const props: IconBaseProps = {
      className: color,
    };

    return (
      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
        {iconType(props)}
      </div>
    );
  }
  return <></>;
}

function ErrorMessage({
  state,
  errorMessage,
}: {
  state: State;
  errorMessage: string;
}): JSX.Element {
  if (state === State.ERROR) {
    return (
      <p className="mt-1 text-sm font-medium text-red-600">{errorMessage}</p>
    );
  }
  return <></>;
}

const baseStyle = `peer block w-full rounded-lg bg-gray-100 px-4 py-3 text-sm 
disabled:pointer-events-none disabled:opacity-5`;

const stateStyle = (state: State) => {
  switch (state) {
    case State.ERROR:
      return "border-red-600 border-2 focus:outline-red-400";
    case State.SUCCESS:
      return "border-green-500 border-2 focus:outline-green-300";
    default:
      return "border-transparent focus:outline-sky-500";
  }
};

const iconLeftPadding = (icon: boolean) => (icon ? "ps-11" : "");
