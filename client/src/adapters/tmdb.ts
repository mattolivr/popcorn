import axios from "axios";

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.external_tmdb_token}`,
  },
  params: {
    language: "pt-BR",
  },
});
