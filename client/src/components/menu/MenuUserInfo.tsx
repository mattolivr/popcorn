import { Avatar } from "flowbite-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";

export function MenuUserInfo(): ReactNode {
  const { user } = useAuth();

  return (
    <Link
      to={`/profile/${user?.name}`}
      className={`flex flex-col items-center rounded-lg
        p-2 hover:bg-gray-300 md:p-0
        md:hover:bg-transparent xl:p-2 xl:hover:bg-gray-300`}
    >
      <div className="flex w-full items-center justify-start gap-2">
        <Avatar rounded />
        <div className="flex flex-col leading-5 md:hidden xl:flex">
          <span className="font-medium">{user?.displayName}</span>
          <span className="text-slate-700">@{user?.name}</span>
        </div>
      </div>
    </Link>
  );
}
