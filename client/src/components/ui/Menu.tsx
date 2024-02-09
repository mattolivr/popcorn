import { type IconType } from "react-icons";
import { FaBell, FaBookmark, FaComment, FaStar } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import Button from "../Button";
import Divider from "../Divider";

export default function Menu({ visible }: { visible: boolean }): JSX.Element {
  return (
    <div
      className={`left-0 top-0 h-full w-64 bg-white ${visible ? "absolute" : "hidden"}`}
    >
      <UserHeader />
      <UserControlls />
    </div>
  );
}

function UserHeader(): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-12 h-20 w-full bg-sky-400" />
      <div className="absolute">
        <div className="h-20 w-20 translate-y-[2.5rem] rounded-full bg-orange-300" />
      </div>
      <span className="font-medium">Nome do usuário</span>
      <span>username#0000</span>
      <Divider className="px-2" />
    </div>
  );
}

function UserControlls(): JSX.Element {
  interface Controll {
    label: string;
    icon: IconType;
    path: string;
  }

  const controlls: Controll[] = [
    {
      label: "Notificações",
      icon: FaBell,
      path: "/notifications",
    },
    {
      label: "Mensagens",
      icon: FaMessage,
      path: "/messages",
    },
    {
      label: "Avaliações",
      icon: FaStar,
      path: "/reviews",
    },
    {
      label: "Tópicos",
      icon: FaComment,
      path: "#",
    },
    {
      label: "Interesses",
      icon: FaBookmark,
      path: "#",
    },
  ];

  return (
    <div className="flex flex-col gap-1 px-2">
      {controlls.map((btn) => (
        <Button
          key={btn.label}
          path={btn.path}
          variant="blank"
          icon={btn.icon}
          textAlign="start"
        >
          {btn.label}
        </Button>
      ))}
      <Divider className="px-2" />
    </div>
  );
}
