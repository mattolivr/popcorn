// TODO: Mudar para entidade

import { Avatar } from "flowbite-react";

export default function Comment(): JSX.Element {
  return (
    <div className="flex w-full items-start gap-2">
      <Avatar rounded />
      <div className="flex flex-col truncate">
        <div className="flex flex-wrap gap-x-1">
          <span className="font-medium">Nome de Usuário Muito grande</span>
          <span className="text-slate-700">@username</span>
        </div>
        <p className="truncate">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione
          quidem ad, explicabo modi incidunt doloribus iure? Eveniet quibusdam
          accusamus, nam perspiciatis dolores nobis explicabo reiciendis libero
          magni. Ea, architecto eos.
        </p>
      </div>
    </div>
  );
}
