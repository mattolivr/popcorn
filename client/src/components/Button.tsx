import { type IconBaseProps, type IconType } from "react-icons";
import { Link } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
  className?: string;
  variant?: Variant;
  visible?: boolean;
  disabled?: boolean;
  icon?: IconType;
  type?: "submit" | "reset" | "button";
  textAlign?: "start" | "center" | "right";

  path?: string;

  onClick?: React.MouseEventHandler;
}

export type Variant =
  | "primary"
  | "secondary"
  | "blank"
  | "blank-selected"
  | "white"
  | undefined;

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
      className: `inline`,
    };

    return icon(props);
  }
  return <></>;
}

function getStyle(props: Props): string {
  let style: string = "flex items-center rounded-2xl px-4 py-2 font-semibold ";

  const value = variants[props.variant ?? "primary"];
  if (value != null) {
    style += `${value.style} ${value.text} `;
  }

  if (props.icon !== undefined) {
    style += " gap-2 ";
  }

  const widthRegex = /(?:\s|^)w-(\d+)/;
  const match = props.className?.match(widthRegex);
  if (match?.[1] != null) {
    style += `w-${match[1]} `;
  } else if (props.className?.includes("w-fit") === true) {
    style += `w-fit `;
  } else {
    style += "w-full ";
  }

  style +=
    props.textAlign == null ? "justify-center " : `justify-${props.textAlign} `;
  style += props.className?.includes("w-");
  style += props.disabled === true ? "cursor-not-allowed " : "";
  style += props.className == null ? "" : ` ${props.className} `;

  return style;
}

const variants = {
  primary: {
    style: "bg-sky-400 outline-sky-600 hover:bg-sky-300 active:bg-sky-500",
    text: "text-white",
  },
  secondary: {
    style:
      "bg-transparent outline-sky-600 border border-gray-300 hover:bg-sky-400 hover:border-sky-400",
    text: "text-gray-700 hover:text-white",
  },
  white: {
    style:
      "bg-white shadow-sm border border-gray-100 outline-gray-400 hover:bg-gray-100",
    text: "text-gray-700",
  },
  blank: {
    style: "bg-transparent outline-gray-400 hover:bg-gray-100",
    text: "text-gray-900",
  },
  "blank-selected": {
    style: "outline-sky-400 bg-sky-200",
    text: "text-gray-900",
  },
};
