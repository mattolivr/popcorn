import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEntity } from "../adapters/tmdb";
import { Movie } from "../entites/tmdb.media";
import MediaLayout from "./layouts/media/MediaLayout";

export default function MovieView(): React.ReactNode {
  const [movie, setMovie] = useState<Movie>();
  const { id } = useParams();

  useEffect(() => {
    if (movie == null && id != null) {
      void getEntity(Movie, id, setMovie);
    }
  }, [movie, id]);

  return (
    <MediaLayout media={movie}>
      <></>
    </MediaLayout>
  );
}
