import { ReactNode } from "react";
import { FaBell, FaCompass, FaEnvelopeOpen, FaHouseChimney, FaStar } from "react-icons/fa6";
import { ButtonProps } from "../button/Button";
import { MenuButton } from "./MenuButton";

export function MenuNavigation(): ReactNode {
  return (
    <div className="flex flex-col gap-1">
      {navigationLinks.map((btn, index) => (
        <MenuButton key={index} button={btn} />
      ))}
    </div>
  );
}

const navigationLinks: ButtonProps[] = [
  {
    icon: FaHouseChimney,
    children: "Página Inicial",
    to: "/",
  },
  {
    icon: FaCompass,
    children: "Explorar",
    to: "/discover",
  },
  {
    icon: FaBell,
    children: "Notificações",
    to: "/notifications",
  },
  {
    icon: FaEnvelopeOpen,
    children: "Mensagens",
    to: "/chats",
  },
  {
    icon: FaStar,
    children: "Avaliações",
  },
];
