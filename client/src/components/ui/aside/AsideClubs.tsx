import { faker } from "@faker-js/faker";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Divider from "../../Divider";

// TODO: Implementar
export default function AsideClubs(): ReactNode {
  return (
    <div className="grow overflow-hidden">
      <Divider>Clubes</Divider>
      {Array.from({ length: 5 }).map(() => (
        <Link to={"#"} className="flex flex-col items-center rounded-lg p-2 hover:bg-gray-300">
          <div className="flex w-full items-center justify-start gap-2">
            <img src={faker.image.urlPicsumPhotos()} className="h-10 w-10 rounded-lg" />
            <div className="flex max-h-10 flex-col overflow-hidden leading-5">
              <span className="text-wrap font-medium">{faker.music.songName()}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
