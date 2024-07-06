import { faker } from "@faker-js/faker";
import { ReactNode } from "react";
import { FaFilm } from "react-icons/fa6";
import Card from "../../card/Card";

export default function AsideHighlight(): ReactNode {
  return (
    <Card className="flex flex-row gap-2 bg-orange-100 px-2">
      <div className="flex h-10 w-10 shrink-0 grow-0 items-center justify-center rounded-full bg-white">
        <FaFilm className="text-orange-400" />
      </div>
      <div className="flex flex-col overflow-hidden leading-5">
        <span className="truncate text-wrap font-medium">Novo Lançamento</span>
        <span className="truncate text-slate-700">{faker.music.songName()}</span>
      </div>
    </Card>
  );
}
