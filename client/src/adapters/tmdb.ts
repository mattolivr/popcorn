import axios, { type AxiosResponse } from "axios";

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: process.env.TMDB_TOKEN,
  },
  params: {
    language: "pt-BR",
  },
});

export function get(path: string, onResponse: (response: AxiosResponse<any, any>) => void): void {
  tmdb
    .get(path)
    .then(onResponse)
    .catch((error) => {
      console.log(error);
    });
}

export function getImage(path: string): string {
  return `https://image.tmdb.org/t/p/original/${path}`;
}
