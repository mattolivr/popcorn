import { Avatar } from "flowbite-react";
import { type IconType } from "react-icons";
import { HiChat } from "react-icons/hi";
import { HiBell, HiHome, HiStar } from "react-icons/hi2";
import { useLocation } from "react-router-dom";
import Button from "../Button";
import Card from "../Card";

export interface MenuProps {
  visibility: {
    visible: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export default function Menu({ visibility }: MenuProps): JSX.Element {
  return (
    <div
      className={`left-0 top-0 z-50 flex h-full w-full flex-col sm:w-fit sm:px-2
        sm:py-4 xl:w-[17rem] ${visibility.visible ? "absolute" : "hidden"}`}
    >
      <Card className="h-full gap-3">
        <User />
        <Navigation />
      </Card>
    </div>
  );
}

function User(): JSX.Element {
  return (
    <a
      className="flex flex-col items-center rounded-xl
      p-2 hover:bg-gray-300 sm:p-0
      sm:hover:bg-transparent xl:p-2 xl:hover:bg-gray-300"
      href="/teste"
    >
      <div className="flex w-full items-center justify-start gap-2">
        <Avatar rounded />
        <div className="flex flex-col leading-5 sm:hidden xl:flex">
          <span className="font-medium">Nome do usuário</span>
          <span className="text-slate-700">@username</span>
        </div>
      </div>
    </a>
  );
}

interface MenuButtonProps {
  label: string;
  path: string;
  icon?: IconType;
}

function MenuButton({ button }: { button: MenuButtonProps }): JSX.Element {
  const currentPath = useLocation();
  const isCurrentPath = currentPath.pathname === button.path;

  const backgroundColor = isCurrentPath ? "bg-gray-300" : "";
  return (
    <Button
      key={button.label}
      to={button.path}
      color="transparent"
      className={`hover:bg-gray-300 ${backgroundColor} w-full 
        justify-start p-2 sm:justify-center sm:p-0 xl:justify-start xl:p-2`}
      icon={button.icon}
      align="start"
    >
      <span className="inline sm:hidden xl:inline">{button.label}</span>
    </Button>
  );
}

function Navigation(): JSX.Element {
  const navigationButtons: MenuButtonProps[] = [
    {
      label: "Página Inicial",
      icon: HiHome,
      path: "/",
    },
    {
      label: "Notificações",
      icon: HiBell,
      path: "/notifications",
    },
    {
      label: "Mensagens",
      icon: HiChat,
      path: "/messages",
    },
    {
      label: "Avaliações",
      icon: HiStar,
      path: "/reviews",
    },
  ];

  return (
    <div className="flex flex-col gap-1">
      {navigationButtons.map((btn, index) => (
        <MenuButton key={`menu-btn-nav-${index}`} button={btn} />
      ))}
    </div>
  );
}
