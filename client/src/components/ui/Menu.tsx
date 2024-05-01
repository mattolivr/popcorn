import { Avatar } from "flowbite-react";
import { type IconType } from "react-icons";
import { HiChat, HiChevronDoubleLeft } from "react-icons/hi";
import { HiBell, HiHome, HiStar } from "react-icons/hi2";
import { useLocation } from "react-router-dom";
import Button from "../Button";

export interface MenuProps {
  visibility: {
    visible: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export default function Menu({ visibility }: MenuProps): JSX.Element {
  return (
    <div
      className={`left-0 top-0 flex h-full w-64 flex-col gap-3 bg-gray-200 
        px-2 pt-2 shadow-sm ${visibility.visible ? "absolute" : "hidden"}`}
    >
      <Header visibility={visibility} />
      <User />
      <Navigation />
    </div>
  );
}

function Header({ visibility }: MenuProps): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-between">
      <img src="../src/assets/popcorn-logo.png" className="h-8 w-8" />
      <Button
        icon={HiChevronDoubleLeft}
        color="transparent"
        onClick={() => {
          visibility.setVisibility(false);
        }}
      />
    </div>
  );
}

function User(): JSX.Element {
  return (
    <a
      className="flex flex-col items-center rounded-xl p-2 hover:bg-gray-300"
      href="/teste"
    >
      <div className="flex w-full items-center justify-start gap-2">
        <Avatar
          img="https://source.unsplash.com/random/700x700/?person"
          rounded
        />
        <div className="flex flex-col leading-5">
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
      className={`hover:bg-gray-300 ${backgroundColor}`}
      icon={button.icon}
      align="start"
    >
      {button.label}
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
