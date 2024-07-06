import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { tv } from "tailwind-variants";
import Button, { ButtonProps } from "../button/Button";

export function MenuButton({ button }: { button: ButtonProps }): ReactNode {
  const currentPath = useLocation();
  const isCurrentPath = currentPath.pathname === button.to;

  // TODO: Alterar para estilo específico de botão
  return (
    <Button
      to={button.to}
      color="clear"
      className={menuButtonStyle({ isCurrentPath })}
      icon={button.icon}
      align="start"
      onClick={button.onClick}
    >
      <span className="inline md:hidden xl:inline">{button.children}</span>
    </Button>
  );
}

const menuButtonStyle = tv({
  base: "hover:bg-gray-300 w-full justify-start p-2 md:justify-center md:p-0 xl:justify-start xl:p-2",
  variants: {
    isCurrentPath: {
      true: "text-sky-700 hover:bg-sky-200",
    },
  },
});
