import { type HTMLInputTypeAttribute } from "react";
import { type FieldValues, type UseFormRegister } from "react-hook-form";
import { type IconBaseProps, type IconType } from "react-icons";
interface Props {
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
}

interface Action {
  name: string;
  function: () => void;
}

export default function Input(props: Props) {
  return (
    <div className={props.visible === false ? "hidden" : "relative"}>
      <input
        type={props.type}
        className={`peer block w-full rounded-lg border-transparent bg-gray-100 px-4 py-3 text-sm 
          focus:outline-sky-500 disabled:pointer-events-none disabled:opacity-5 
          ${props.icon != null ? "ps-11" : ""}`}
        placeholder={props.label}
        {...props.register(props.name, { required: props.required })}
      />
      <Icon icon={props.icon} />
    </div>
  );
}

function Icon({ icon }: { icon?: IconType }): JSX.Element {
  if (icon != null) {
    const props: IconBaseProps = {
      color: "#9ca3af",
    };

    return (
      <div
        className="pointer-events-none absolute inset-y-0 start-0 flex items-center 
        ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50"
      >
        {icon(props)}
      </div>
    );
  }
  return <></>;
}
