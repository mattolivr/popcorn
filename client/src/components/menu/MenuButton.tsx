import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { tv } from "tailwind-variants";
import Button, { ButtonProps } from "../button/Button";
import { useMenu } from "./context";

export function MenuButton({ button }: { button: ButtonProps }): ReactNode {
  const currentPath = useLocation();
  const menu = useMenu();

  const isCurrentPath = currentPath.pathname === button.to;

  const buttonStyle = menuButtonStyle({
    isCurrentPath,
    align: {
      initial: "start",
      md: "center",
      xl: menu.collapsed ? "center" : "start",
    },
  });

  const textStyle = menuButtonTextStyle({
    visible: {
      initial: true,
      md: false,
      xl: !menu.collapsed,
    },
  });

  return (
    <Button
      to={button.to}
      color="clear"
      className={buttonStyle}
      icon={button.icon}
      align="start"
      onClick={button.onClick}
    >
      <span className={textStyle}>{button.children}</span>
    </Button>
  );
}

const menuButtonStyle = tv(
  {
    base: "hover:bg-gray-300 w-full p-2 md:p-0 xl:p-2",
    variants: {
      isCurrentPath: {
        true: "text-sky-700 hover:bg-sky-200",
      },
      align: {
        start: "justify-start",
        center: "justify-center",
      },
    },
  },
  { responsiveVariants: ["md", "xl"] },
);

const menuButtonTextStyle = tv(
  {
    variants: {
      visible: {
        true: "inline",
        false: "hidden",
      },
    },
  },
  {
    responsiveVariants: ["md", "xl"],
  },
);
