import { type IconBaseProps, type IconType } from "react-icons";
import { Link } from "react-router-dom";
import { getColor, type Variant } from "../assets/color";

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  visible?: boolean;
  disabled?: boolean;
  icon?: IconType;
  type?: "submit" | "reset" | "button";
  textAlign?: "start" | "center" | "right";
  width?: "full" | "fit" | number;

  path?: string;

  onClick?: React.MouseEventHandler;
}

export default function Button(props: Props) {
  if (props.visible === false) {
    return <></>;
  }

  if (props.path != null) {
    return (
      <Link to={props.path} className={getStyle(props)}>
        <Icon icon={props.icon} />
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={getStyle(props)}
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
      className: "inline mr-2 text-red-600",
    };

    return icon(props);
  }
  return <></>;
}

function getStyle(props: Props): string {
  let style: string = "flex items-center rounded-2xl px-4 py-2 font-semibold ";

  style += getColor(props.variant ?? "primary");
  style +=
    props.textAlign == null ? "justify-center " : `justify-${props.textAlign} `;
  style += props.width == null ? "w-full " : `w-${props.width} `;
  style += props.disabled === true ? "cursor-not-allowed " : "";
  style += props.className == null ? "" : ` ${props.className} `;

  return style;
}
