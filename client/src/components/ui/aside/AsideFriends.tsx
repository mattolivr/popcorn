import { fakerPT_BR as faker } from "@faker-js/faker";
import { Avatar } from "flowbite-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import User from "../../../entites/user";
import Divider from "../../Divider";

export default function AsideFriends(): ReactNode {
  // TODO: Remover dados Fake
  const users: User[] = Array.from({ length: 10 }, () => ({
    name: faker.internet.userName(),
    email: faker.internet.email(),
    birth: faker.date.birthdate().toLocaleDateString(),
    password: "",
    displayName: faker.person.fullName(),
    imgProfile: faker.image.avatar(),
  }));

  return (
    <div className="flex flex-col gap-1 overflow-hidden">
      <Divider>Amigos</Divider>
      {users.map((user, index) => (
        <AsideFriend key={index} user={user} />
      ))}
    </div>
  );
}

function AsideFriend({ user }: { user: User }): ReactNode {
  return (
    <Link to={`/profile/${user?.name}`} className="flex flex-col items-center rounded-lg p-2 hover:bg-gray-300">
      <div className="flex w-full items-center justify-start gap-2">
        <Avatar img={faker.image.avatar()} className="shrink-0 grow-0" rounded />
        <div className="flex flex-col overflow-hidden leading-5">
          <span className="truncate text-nowrap font-medium">{user?.displayName}</span>
          <span className="truncate text-slate-700">{faker.hacker.phrase()}</span>
        </div>
      </div>
    </Link>
  );
}
