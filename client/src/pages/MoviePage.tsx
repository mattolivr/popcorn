import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../entites/tmdb/tmdb.media";
import mediaService from "../services/media.service";
import MediaLayout from "./layouts/media/MediaLayout";

export default function MoviePage(): React.ReactNode {
  const [movie, setMovie] = useState<Movie>();
  const { id } = useParams();

  useEffect(() => {
    if (movie == null && id != null) {
      void mediaService.getEntity(Movie, id, setMovie);
    }
  }, [movie, id]);

  return (
    <MediaLayout media={movie}>
      <></>
    </MediaLayout>
  );
}
