import { Avatar } from "flowbite-react";
import { FaEllipsisVertical } from "react-icons/fa6";
import Button from "../button/Button";
import { usePostContext } from "./context";

export default function PostHeader(): React.ReactNode {
  // TODO: Deixar dinâmico com dados do usuário
  const { post } = usePostContext();
  return (
    <div className="flex w-full gap-3">
      <Avatar rounded />
      <div className="flex grow flex-col justify-center leading-5">
        <span className="font-medium">Nome do usuário</span>
        <span className="text-slate-700">@username</span>
      </div>
      <Button
        icon={<Button.Icon icon={FaEllipsisVertical} />}
        color="transparent"
        className="px-3 py-2"
      />
    </div>
  );
}
