import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdb } from "../adapters/tmdb";
import Card from "../components/Card";
import { type Movie } from "../entites/tmdb";
import MediaLayout from "./layouts/MediaLayout";
import { FaImage } from "react-icons/fa6";

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
    <MediaLayout highlight={<Highlight movie={movie} />}>
      <div className="mt-4 flex justify-between gap-8 px-2 xl:px-64">
        <main className="flex flex-col gap-4 xl:w-4/6">
          <Card className="block sm:hidden" title={movie?.title}>
            teste
          </Card>
          <Card title="Sinopse">{movie?.overview}</Card>
        </main>
        <aside className="hidden lg:block xl:w-2/6">
          <Card>teste</Card>
        </aside>
      </div>
    </MediaLayout>
  );
}

function Highlight({ movie }: { movie?: Movie }) {
  const releaseYear =
    movie?.release_date != null
      ? new Date(movie?.release_date).getFullYear()
      : "";

  const releaseDate =
    movie?.release_date != null
      ? new Date(movie?.release_date).toLocaleDateString()
      : "";

  return (
    <div
      className="w-full bg-sky-950"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: "50% 30%",
        backgroundSize: "cover",
      }}
    >
      <div className="flex bg-slate-700/40 py-4 sm:justify-start">
        <Poster movie={movie} />
        <div className="hidden flex-col items-start justify-around px-4 sm:flex">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-white xl:text-4xl">
              {movie?.title}
              <span className="ml-3 text-2xl text-gray-200">{releaseYear}</span>
            </h1>
            <h3 className="text-lg font-medium text-gray-200">{releaseDate}</h3>
          </div>
          <div className="flex flex-col justify-end">
            <strong className="text-white">Avaliação dos usuários</strong>
            <Vote movie={movie} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Poster({ movie }: { movie?: Movie }) {
  const className =
    "h-[149px] w-[96px] rounded-xl shadow-md sm:h-[338px] sm:w-[225px] ms-2 xl:ms-64";

  if (movie == null) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-sky-900`}
      >
        <FaImage className="text-4xl text-sky-600" />
      </div>
    );
  }
  return (
    <img
      className={className}
      src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
    />
  );
}

function Vote({ movie }: { movie?: Movie }) {
  const voteAverage = movie?.vote_average ?? 0;
  const percentage = Math.trunc(voteAverage * 10);

  let color = "bg-green-500";
  if (percentage < 70 && percentage >= 40) {
    color = "bg-yellow-500";
  } else if (percentage < 40) {
    color = "bg-red-500";
  }

  return (
    <span
      className={`w-fit rounded-2xl px-4 py-1 text-2xl font-semibold text-white shadow-sm ${color}`}
    >
      {`${percentage}%`}
    </span>
  );
}
