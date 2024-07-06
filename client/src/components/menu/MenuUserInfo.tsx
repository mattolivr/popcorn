import { Avatar } from "flowbite-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { tv } from "tailwind-variants";
import { useAuth } from "../../hooks/auth.hook";
import { useMenu } from "./context";

export function MenuUserInfo(): ReactNode {
  const { user } = useAuth();
  const menu = useMenu();

  const style = menuUserStyle({
    padding: {
      initial: "p2",
      md: "none",
      xl: menu.collapsed ? "none" : "p2",
    },
    hoverBackground: {
      initial: "gray",
      md: "clear",
      xl: menu.collapsed ? "clear" : "gray",
    },
  });

  const textStyle = menuUserTextDivStyle({
    visible: {
      initial: true,
      md: false,
      xl: !menu.collapsed,
    },
  });

  return (
    <Link to={`/profile/${user?.name}`} className={style}>
      <div className="flex w-full items-center justify-start gap-2">
        <Avatar rounded />
        <div className={textStyle}>
          <span className="font-medium">{user?.displayName}</span>
          <span className="text-slate-700">@{user?.name}</span>
        </div>
      </div>
    </Link>
  );
}

const menuUserStyle = tv(
  {
    base: "flex flex-col items-center rounded-lg",
    variants: {
      padding: {
        none: "p-0",
        p2: "p-2",
      },
      hoverBackground: {
        gray: "hover:bg-gray-300",
        clear: "hover:bg-transparent",
      },
    },
  },
  { responsiveVariants: ["md", "xl"] },
);

const menuUserTextDivStyle = tv(
  {
    base: "flex-col leading-5",
    variants: {
      visible: {
        true: "flex",
        false: "hidden",
      },
    },
  },
  {
    responsiveVariants: ["md", "xl"],
  },
);
