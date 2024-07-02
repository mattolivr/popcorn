import axios from "axios";
import { type Media, newMedia } from "../entites/tmdb.media";

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.external_tmdb_token}`,
  },
  params: {
    language: "pt-BR",
  },
});

export interface Entity {
  entityName: string;
  appendTo: string[];
}

export async function getEntity<T extends Entity>(
  Constructor: new (object: any) => T,
  id: string,
  setter: React.Dispatch<React.SetStateAction<T | undefined>>,
): Promise<void> {
  const entity = new Constructor({});
  const url = `/${entity.entityName}/${id}`;
  const appendToResponse = entity.appendTo?.join(",");

  tmdb
    .get(url, { params: { append_to_response: appendToResponse } })
    .then((response) => {
      setter(new Constructor(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getHighlights(max: number): Promise<Media[]> {
  const url = "trending/all/day";
  let resp: Media[] = [];

  await tmdb
    .get(url)
    .then((response) => {
      resp = response.data?.results
        ?.filter((_value: any, index: number) => {
          return index < max;
        })
        ?.map((media: any) => newMedia(media));
    })
    .catch((error) => {
      console.log(error);
    });

  return resp;
}

export function getImage(path: string): string {
  return `https://image.tmdb.org/t/p/original/${path}`;
}
