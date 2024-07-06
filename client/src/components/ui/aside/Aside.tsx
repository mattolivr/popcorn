import { ReactNode } from "react";
import { FaPlus } from "react-icons/fa6";
import Button from "../../button/Button";
import Card from "../../card/Card";
import { menuStyle } from "../menu/Menu";
import AsideClubs from "./AsideClubs";
import AsideFriends from "./AsideFriends";
import AsideHighlight from "./AsideHighlight";

export default function Aside(): ReactNode {
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

  return (
    <div className={style}>
      <Card>
        <Button color="clear" icon={FaPlus}>
          Nova postagem
        </Button>
      </Card>
      <Card className="grow gap-3 overflow-hidden px-2">
        <AsideHighlight />
        <AsideClubs />
        <AsideFriends />
      </Card>
    </div>
  );
}
