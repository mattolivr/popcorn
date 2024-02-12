import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdb } from "../adapters/tmdb";
import Card from "../components/Card";
import { type Movie } from "../entites/tmdb";
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

  console.log(movie);

  return (
    <MediaLayout highlight={<Highlight movie={movie} />}>
      <div className="flex">
        <Card className="block sm:hidden" title={movie?.title}>
          teste
        </Card>
      </div>
    </MediaLayout>
  );
}

function Highlight({ movie }: { movie?: Movie }) {
  return (
    <div
      className="w-full bg-sky-800"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex bg-slate-700/40 p-4 sm:justify-start">
        <img
          className="ms-0 h-[149px] w-[96px] rounded-xl shadow-md sm:h-[338px] sm:w-[225px] xl:ms-64"
          src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
        />
        <div className="hidden flex-col items-start justify-center px-4 sm:flex">
          <h1 className="text-3xl font-bold text-white">{movie?.title}</h1>
          <strong className="text-white">Avaliação dos usuários</strong>
          <h2 className="text-2xl font-bold text-green-400">
            {movie?.vote_average}
          </h2>
        </div>
      </div>
    </div>
  );
}
