import { ReactNode } from "react";
import { menuStyle } from "../menu/Menu";
import { useAside } from "./context";

export default function Aside(): ReactNode {
  const aside = useAside();

  const style = menuStyle({
    height: {
      initial: "standard",
    },
    width: {
      initial: "fixed",
    },
    padding: {
      initial: "p2",
    },
    position: {
      initial: "sticky",
    },
    visibility: {
      initial: "hidden",
      xl: "show",
    },
    className: "hidden lg:flex flex-col gap-2",
  });

  return aside.content && <div className={style}>{aside.content}</div>;
}
