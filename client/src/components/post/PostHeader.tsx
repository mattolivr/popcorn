import { fakerPT_BR as faker } from "@faker-js/faker";
import { Avatar } from "flowbite-react";
import { FaEllipsisVertical } from "react-icons/fa6";
import Button from "../button/Button";
import { usePostContext } from "./context";

export default function PostHeader(): React.ReactNode {
  // TODO: Deixar dinâmico com dados do usuário
  const { post } = usePostContext();
  return (
    <div className="flex w-full gap-3">
      <Avatar className="h-10 w-10 shrink-0 grow-0" img={faker.image.avatar()} rounded />
      <div className="flex grow flex-col justify-center leading-5">
        <span className="font-medium">{faker.person.fullName()}</span>
        <span className="text-slate-700">@{faker.internet.userName()}</span>
      </div>
      <Button icon={<Button.Icon icon={FaEllipsisVertical} />} color="clear" className="px-3 py-2" />
    </div>
  );
}
