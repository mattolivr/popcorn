import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdb } from "../adapters/tmdb";
import { type Movie } from "../entites/tmdb.media";
import MediaLayout from "./layouts/MediaLayout";

export default function MovieView() {
  const [movie, setMovie] = useState<Movie>();
  const { id } = useParams();

  useEffect(() => {
    if (movie == null) {
      tmdb
        .get(`/movie/${id}`)
        .then((response): void => {
          setMovie(response.data as Movie);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  if (movie != null) {
    // TODO: Melhorar forma que é implementado, talvez com uma biblioteca chamada React Helmet
    document.title = `Popcorn | ${movie.title}`;
  }

  return (
    <MediaLayout media={movie}>
      <></>
    </MediaLayout>
  );
}
