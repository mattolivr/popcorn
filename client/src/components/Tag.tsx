import { type ComponentProps } from "react";
import { type IconType } from "react-icons";

export type TagProps = ComponentProps<"span"> & {
  icon?: IconType;
  color: string;
};

export default function Tag({ icon, color, ...props }: TagProps): JSX.Element {
  // TODO: Implementar variantes
  const colorStyle = color.includes("#") ? `bg-[${color}]` : color;

  return (
    <span className={`${colorStyle} rounded-lg px-2 py-0.5 font-medium`}>
      {icon != null ? icon({}) : <></>}
      {props.children}
    </span>
  );
}
