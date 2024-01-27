import { type HTMLInputTypeAttribute } from "react";
import { type IconBaseProps, type IconType } from "react-icons";
interface Props {
  label?: string;
  type: HTMLInputTypeAttribute;
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  hint?: string;
  action?: Action;
  icon?: IconType;
}

interface Action {
  name: string;
  function: () => void;
}

export default function Input(props: Props) {
  return (
    <div className="relative">
      <input
        type={props.type}
        className="peer block w-full rounded-lg border-transparent bg-gray-100 px-4 py-3 ps-11 text-sm
        focus:outline-sky-500 disabled:pointer-events-none disabled:opacity-5"
        placeholder={props.label}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50">
        <Icon icon={props.icon} />
      </div>
    </div>
  );
}

function Icon({ icon }: { icon?: IconType }): JSX.Element {
  const props: IconBaseProps = {
    color: "#9ca3af",
  };
  return icon != null ? icon(props) : <></>;
}
