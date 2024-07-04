import { Avatar } from "flowbite-react";
import { type IconType } from "react-icons";
import { FaBell, FaDoorOpen, FaEnvelope, FaHouse, FaStar } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";
import Button from "../button/Button";
import Card from "../card/Card";

export interface MenuProps {
  visibility: {
    visible: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export default function Menu({ visibility }: MenuProps): React.ReactNode {
  return (
    <div
      className={`left-0 top-0 z-40 h-lvh w-full
      pb-[48px] pt-[56px] md:w-fit md:px-2 md:pb-[8px] md:pt-[64px] xl:w-[17rem]
       ${visibility.visible ? "fixed" : "hidden"}`}
    >
      <Card className="h-full gap-3 rounded-none sm:rounded-md">
        <User />
        <Navigation />
      </Card>
    </div>
  );
}

function User(): React.ReactNode {
  return (
    <a
      className="flex flex-col items-center rounded-xl
      p-2 hover:bg-gray-300 md:p-0
      md:hover:bg-transparent xl:p-2 xl:hover:bg-gray-300"
      href="/teste"
    >
      <div className="flex w-full items-center justify-start gap-2">
        <Avatar rounded />
        <div className="flex flex-col leading-5 md:hidden xl:flex">
          <span className="font-medium">Nome do usuário</span>
          <span className="text-slate-700">@username</span>
        </div>
      </div>
    </a>
  );
}

interface MenuButtonProps {
  label: string;
  path?: string;
  icon?: IconType;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function MenuButton({ button }: { button: MenuButtonProps }): React.ReactNode {
  const currentPath = useLocation();
  const isCurrentPath = currentPath.pathname === button.path;

  const backgroundColor = isCurrentPath ? "bg-gray-300" : "";
  return (
    <Button
      key={button.label}
      to={button.path}
      color="transparent"
      className={menuButtonStyle(backgroundColor)}
      icon={<Button.Icon icon={button.icon} />}
      align="start"
      onClick={button.onClick}
    >
      <span className="inline md:hidden xl:inline">{button.label}</span>
    </Button>
  );
}

const menuButtonStyle = (backgroundColor: string) => {
  return `hover:bg-gray-300 ${backgroundColor} w-full 
        justify-start p-2 md:justify-center md:p-0 xl:justify-start xl:p-2`;
};

function Navigation(): React.ReactNode {
  const auth = useAuth();
  const navigate = useNavigate();

  const navigationButtons: MenuButtonProps[] = [
    {
      label: "Página Inicial",
      icon: FaHouse,
      path: "/",
    },
    {
      label: "Notificações",
      icon: FaBell,
      path: "/notifications",
    },
    {
      label: "Mensagens",
      icon: FaEnvelope,
      path: "/messages",
    },
    {
      label: "Avaliações",
      icon: FaStar,
      path: "/reviews",
    },
  ];

  return (
    <div className="flex grow flex-col gap-1">
      {navigationButtons.map((btn, index) => (
        <MenuButton key={`menu-btn-nav-${index}`} button={btn} />
      ))}
      <div className="grow" />
      <Button
        color="transparent"
        className={menuButtonStyle("")}
        icon={<Button.Icon icon={FaDoorOpen} />}
        align="start"
        onClick={() => {
          auth.logout();
          navigate("/login");
        }}
      >
        <span className="inline md:hidden xl:inline">Sair</span>
      </Button>
    </div>
  );
}
