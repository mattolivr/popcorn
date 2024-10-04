import { type ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { type VariantProps } from "tailwind-variants";
import ButtonBase, { type buttonStyle } from "./ButtonBase";
import { ButtonIcon } from "./ButtonIcon";
import ButtonContext from "./context";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyle> & {
    children?: React.ReactNode;
    icon?: React.ReactNode | IconType;
    ricon?: React.ReactNode | IconType;
    to?: string;
  };

export default function Button(props: ButtonProps): React.ReactNode {
  const { children, icon, ricon, to = "", className, color, align, ...other } = props;

  const button: ButtonType = {
    align,
    color,
    to,
    className,
  };

  return (
    <ButtonContext.Provider value={{ button }}>
      <ButtonBase {...other}>
        {getIcon(icon)}
        {children}
        {getIcon(ricon)}
      </ButtonBase>
    </ButtonContext.Provider>
  );
}

Button.Icon = ButtonIcon;

export type ButtonType = VariantProps<typeof buttonStyle> & {
  to?: string;
  className?: string;
};

function getIcon(icon?: React.ReactNode | IconType): React.ReactNode {
  if (typeof icon === "function") {
    return <Button.Icon icon={icon} />;
  }
  return icon;
}
