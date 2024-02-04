import { FaBell } from "react-icons/fa";
import { FaBookmark, FaComment, FaMessage, FaStar } from "react-icons/fa6";
import Button from "../Button";
import Divider from "../Divider";

export default function Menu({ visible }: { visible: boolean }): JSX.Element {
  return (
    <div
      className={`left-0 top-0 h-full w-full bg-white sm:w-64 ${visible ? "absolute" : "hidden"}`}
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
  return (
    <div className="px-2">
      <Button variant="blank" icon={FaBell} path="/notifications">
        Notificações
      </Button>
      <Button variant="blank" icon={FaMessage} path="/messages">
        Mensagens
      </Button>
      <Button variant="blank" icon={FaStar} path="/reviews">
        Avaliações
      </Button>
      <Button variant="blank" icon={FaComment} path="/topics">
        Discussões
      </Button>
      <Button variant="blank" icon={FaBookmark} path="#">
        Interesses
      </Button>
      <Divider className="px-2" />
    </div>
  );
}
