import { Link } from "react-router-dom";
import colors from "../assets/color";

type Props = {
  children: React.ReactNode;
  className?: string;
  secundary?: boolean;
  link?: string;
  color?: string;
  outline?: boolean;
};

export default function Button(props: Props) {
  console.log(getColor(props));
  if (props.link) {
    return (
      <Link to={props.link} className={getClassName(props)}>
        {props.children}
      </Link>
    );
  }
  return <button className={getClassName(props)}>{props.children}</button>;
}

function getClassName(props: Props): string {
  return `text-center font-semibold rounded-2xl px-1 py-2 w-full ${getColor(props)} ${props.className}`;
}

function getColor(props: Props): string {
  // TODO: Adicionar suporte a dark-mode
  const base = props.outline ? "border-" : "bg-";
  const color = colors.get(props.color ?? "primary") ?? colors.get("primary");
  const text = props.outline ? color?.darkText : color?.text;

  return `${base}${color?.color} text-${text} ${props.outline ? "border-2" : ""}`;
}
