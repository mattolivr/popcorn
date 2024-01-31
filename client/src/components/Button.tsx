import { type IconBaseProps, type IconType } from "react-icons";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secundary" | "blank";
  visible?: boolean;
  disabled?: boolean;
  icon?: IconType;
  type?: "submit" | "reset" | "button";

  path?: string;

  onClick?: React.MouseEventHandler;
}

export default function Button(props: Props) {
  if (props.visible === false) {
    return <></>;
  }

  if (props.path != null) {
    return (
      <Link to={props.path} className={getClassName(props)}>
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={getClassName(props)}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type ?? "button"}
    >
      <Icon icon={props.icon} />
      {props.children}
    </button>
  );
}

function Icon({ icon }: { icon?: IconType }): JSX.Element {
  if (icon != null) {
    const props: IconBaseProps = {
      color: "#1c1917",
      className: "inline mr-2",
    };

    return icon(props);
  }
  return <></>;
}

function getClassName(props: Props): string {
  return `flex justify-center items-center font-semibold rounded-2xl px-1 py-2 
  w-full ${getColor(props)} ${props.className ?? ""} 
  ${props.disabled === true ? "cursor-not-allowed" : ""}`;
}

function getColor(props: Props): string {
  /**
   * TODO: Melhorar esquema de cores para suportar:
   * - Modo dark
   * - Botões desabilitados
   */
  switch (props.variant) {
    case "blank":
      return "bg-white border border-gray-200 shadow-sm text-stone-900 outline-gray-400";
    case "secundary":
      return "border-2 border-sky-500 text-stone-900";
    case "primary":
    default:
      return "bg-sky-500 text-white outline-sky-800";
  }
}
