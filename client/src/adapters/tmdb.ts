import axios from "axios";

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: process.env.TMDB_TOKEN
  },
  params: {
    language: "pt-BR",
  },
});
