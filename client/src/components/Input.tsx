import { useState, type HTMLInputTypeAttribute } from "react";
import { type FieldValues, type UseFormRegister } from "react-hook-form";
import { type IconBaseProps, type IconType } from "react-icons";
import { FaInfo } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
interface InputProps {
  label?: string;
  name: string;
  type: HTMLInputTypeAttribute;
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  hint?: string;
  action?: Action;
  icon?: IconType;
  visible?: boolean;
  required?: boolean;

  register: UseFormRegister<FieldValues>;
  validator?: (value: string) => string | null; 
}

interface Action {
  name: string;
  function: () => void;
}

const defaultStyle = `peer block w-full rounded-lg bg-gray-100 px-4 py-3 text-sm 
disabled:pointer-events-none disabled:opacity-5`;

const errorStyle = (error: boolean) => error 
  ? "border-red-600 border-2 focus:outline-red-400" 
  : "border-transparent focus:outline-sky-500"

const iconLeftPadding = (icon: boolean) => icon ? "ps-11" : ""; 

export default function Input(props: InputProps) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <div className={props.visible === false ? "hidden" : "relative"}>
        <div className="relative">
          <Icon icon={props.icon} />
          <input
            className={` ${defaultStyle} ${errorStyle(error)} ${iconLeftPadding(props.icon != null)}`}
            placeholder={props.label}
            {...props.register(props.name, { required: props.required })}
            onChange={(event) => {handleChange(event, {setError, setErrorMessage}, props.validator)}}
          />
          <Interation error={error}/>
        </div>
        {error ? <p className="text-sm font-medium text-red-600 mt-1">{ errorMessage }</p> : <></>}        
      </div>
    </>
  );
}

function handleChange(
  event: React.ChangeEvent<HTMLInputElement>,
  errorHandler: { 
    setError: React.Dispatch<React.SetStateAction<boolean>>, 
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  },
  validator?: (value: string) => string | null, 
) {
  if (validator != null) {
    const ret = validator(event.target.value);
    errorHandler.setError(ret != null);
    errorHandler.setErrorMessage(ret ?? "");
  }
}

function Icon({ icon }: { icon?: IconType }): JSX.Element {
  if (icon != null) {
    const props: IconBaseProps = {
      color: "#9ca3af"
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

const InterationMap = new Map<string, IconType>([
  ["error", FaInfo], ["success", FaCheck]
])

function Interation({ error }: { error: boolean }): JSX.Element {
  let iconType: string = "";
  if (error) {
    iconType = "error";
  }

  const icon = InterationMap.get(iconType);
  if (icon != null) {
    const props: IconBaseProps = {
      color: "#dc2626"
    };

    return (
      <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
        {icon(props)}
      </div>
    )
  }
  return <></>
}
