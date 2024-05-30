import { type ButtonHTMLAttributes } from "react";
import { type VariantProps } from "tailwind-variants";
import ButtonBase, { type buttonStyle } from "./ButtonBase";
import { ButtonIcon } from "./ButtonIcon";
import ButtonContext from "./context";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyle> & {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    ricon?: React.ReactNode;
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
        {icon}
        {children}
        {ricon}
      </ButtonBase>
    </ButtonContext.Provider>
  );
}

Button.Icon = ButtonIcon;

export type ButtonType = VariantProps<typeof buttonStyle> & {
  to?: string;
  className?: string;
};
