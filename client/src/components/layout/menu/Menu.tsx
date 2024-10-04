import { ReactNode } from "react";
import { tv } from "tailwind-variants";
import Card from "../../core/card/Card";
import { useMenu } from "./context";
import MenuBottomLinks from "./MenuBottomLinks";
import MenuClubs from "./MenuClubs";
import { MenuNavigation } from "./MenuNavigation";
import { MenuUserInfo } from "./MenuUserInfo";

export default function Menu(): ReactNode {
  const menu = useMenu();

  const style = menuStyle({
    height: {
      initial: "mobile",
      md: "standard",
      xl: "standard",
    },
    width: {
      initial: "full",
      md: "fit",
      xl: "fixed",
    },
    padding: {
      initial: "none",
      md: "p2",
      xl: "p2",
    },
    position: {
      initial: "fixed",
      md: "sticky",
      xl: "sticky",
    },
    visibility: {
      initial: menu.visible ? "hidden" : "show",
      md: "show",
      xl: "show",
    },
  });

  const cardStyle = `h-full gap-3 px-2 w-full md:w-fit ${menu.collapsed ? "xl:w-fit" : "xl:w-full"}`;

  return (
    <div className={style}>
      <Card className={cardStyle}>
        <MenuUserInfo />
        <MenuNavigation />
        <MenuClubs />
        <MenuBottomLinks />
      </Card>
    </div>
  );
}

export const menuStyle = tv(
  {
    base: "z-40 shrink-0 grow-0 left-0 top-[3.5em]",
    variants: {
      height: {
        standard: "menu-height",
        mobile: "menu-height-mobile",
      },
      width: {
        full: "w-full",
        fit: "w-fit",
        fixed: "w-[17rem]",
      },
      padding: {
        none: "px-0",
        p2: "p-2",
      },
      position: {
        sticky: "sticky",
        fixed: "fixed",
      },
      visibility: {
        hidden: "hidden",
        show: "flex flex-col",
      },
    },
  },
  { responsiveVariants: ["md", "xl"] },
);
