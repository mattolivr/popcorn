import { ComponentProps } from "react";
import { IconType } from "react-icons";

export type TagProps = ComponentProps<"span"> & {
  icon?: IconType;
  color: string;
};

export default function Tag({ icon, color, ...props }: TagProps): JSX.Element {
  // TODO: Implementar variantes
  const colorStyle = color.includes("#") ? `bg-[${color}]` : color;

  return (
    <span className={`${colorStyle} rounded-lg px-1.5 py-0.5 font-medium`}>
      {icon != null ? icon({}) : <></>}
      {props.children}
    </span>
  );
}
