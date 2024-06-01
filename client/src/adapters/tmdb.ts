import axios from "axios";

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: process.env.TMDB_TOKEN,
  },
  params: {
    language: "pt-BR",
  },
});

export async function getEntity<T extends Entity>(
  Constructor: new (object: any) => T,
  id: string,
  setter: React.Dispatch<React.SetStateAction<T | undefined>>,
): Promise<void> {
  const entity = new Constructor({});
  const url = `/${entity.entityName}/${id}`;
  const appendToResponse = entity.appendTo?.join(",");

  tmdb
    .get(url, { params: { appendToResponse } })
    .then((response) => {
      setter(new Constructor(response.data));
    })
    .catch((reject) => {
      console.log(reject);
    });
}

export interface Entity {
  entityName: string;
  appendTo: string[];
}

export function getImage(path: string): string {
  return `https://image.tmdb.org/t/p/original/${path}`;
}
