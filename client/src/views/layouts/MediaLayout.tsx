import React, { useId } from "react";
import { FaImage } from "react-icons/fa";
import {
  FaBars,
  FaCircleDown,
  FaCircleMinus,
  FaCircleUp,
  FaClock,
  FaComment,
  FaEye,
  FaHeart,
  FaPlus,
  FaStar,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from "../../components/Button.tsx";
import Card from "../../components/Card";
import Divider from "../../components/Divider.tsx";
import {
  getDate,
  getRuntime,
  getTitle,
  type Movie,
  type TVShow,
} from "../../entites/tmdb.media.ts";

let media: Movie | TVShow | undefined;

export interface MediaLayoutProps {
  children: React.ReactNode;
  media?: Movie | TVShow;
}

export default function MediaLayout(props: MediaLayoutProps): JSX.Element {
  media = props.media;
  const mediaDate = getDate(media);
  const runtime = getRuntime(media);

  return (
    <div className="flex h-full w-full flex-col">
      <Highlight />
      <div className="lg-px-48 flex justify-between gap-4 sm:mt-4 sm:px-2 xl:px-64">
        <main className="sm:7/8 flex w-full flex-col gap-1 sm:gap-4 lg:w-8/12">
          <Card className="block sm:hidden" title={getTitle(media)}>
            <div className="flex flex-row items-center gap-2">
              <p>{`${mediaDate?.startDate?.toLocaleDateString()}`}</p>
              <p className={showElement(mediaDate?.endDate)}>
                {`- ${mediaDate?.endDate?.toLocaleDateString()}`}
              </p>
              <p
                className={showElement(runtime)}
              >{`· ${runtime?.hours}h ${runtime?.minutes}min`}</p>
              <Vote />
            </div>
            <p className="italic text-gray-700">{media?.tagline}</p>
          </Card>
          <Card>
            <Overview />
            <Divider />
            <Cast />
          </Card>
          {props.children}
          <Button
            className="absolute bottom-4 right-4 h-14 w-14 rounded-full text-2xl sm:hidden"
            icon={FaPlus}
          />
        </main>
        <aside className="sm:1/8 hidden lg:block lg:w-4/12">
          <Card>
            <Controlls />
            <Divider />
            <ExtraControlls />
            <Divider />
          </Card>
        </aside>
      </div>
      {props.children}
    </div>
  );
}

export const showElement = (obj: any) =>
  obj != null && obj !== "" ? "inline" : "hidden";

function Highlight(): JSX.Element {
  const mediaDate = getDate(media);
  const runtime = getRuntime(media);

  return (
    <Backdrop>
      <div className="flex bg-slate-700/40 py-4 sm:justify-start">
        <Poster />
        <div className="hidden flex-col items-start justify-between px-4 sm:flex">
          <div className="flex h-full flex-col justify-center">
            <div className="flex flex-row items-end">
              <h1 className="text-3xl font-bold text-white xl:text-4xl">
                {getTitle(media)}
              </h1>
              <span className="ml-3 text-2xl text-gray-200">
                {mediaDate?.startDate?.getFullYear()}
              </span>
            </div>
            <ul className="flex flex-row items-center gap-2 text-lg font-medium text-gray-200">
              <li>{mediaDate?.startDate?.toLocaleDateString()}</li>
              <li className={showElement(mediaDate?.endDate)}>-</li>
              <li className={showElement(mediaDate?.endDate)}>
                {mediaDate?.endDate?.toLocaleDateString()}
              </li>
              <li>·</li>
              <li
                className={showElement(runtime)}
              >{`${runtime?.hours}h ${runtime?.minutes}min`}</li>
            </ul>
            <p className="mt-2 text-lg font-medium italic text-gray-200">
              {media?.tagline}
            </p>
          </div>
          <div className="flex flex-col justify-end">
            <strong className="text-lg text-white">
              Avaliação dos usuários
            </strong>
            <Vote />
            <Genres />
          </div>
        </div>
      </div>
    </Backdrop>
  );
}

function Backdrop({ children }: { children: React.ReactNode }): JSX.Element {
  const style: React.CSSProperties = {
    backgroundImage: `url('https://image.tmdb.org/t/p/original${media?.backdrop_path}')`,
    backgroundPosition: "50% 30%",
    backgroundSize: "cover",
  };

  return (
    <div className="w-full bg-sky-950" style={style}>
      {children}
    </div>
  );
}

function Poster(): JSX.Element {
  const className =
    "h-[149px] w-[96px] rounded-xl shadow-md sm:h-[338px] sm:w-[225px] ms-2 xl:ms-64";

  if (media == null) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-sky-900`}
      >
        <FaImage className="text-4xl text-sky-600" />
      </div>
    );
  } else {
    return (
      <img
        className={className}
        src={`https://image.tmdb.org/t/p/original/${media?.poster_path}`}
      />
    );
  }
}

function Vote(): JSX.Element | undefined {
  const votePercentage = Math.trunc(
    media != null ? media.vote_average * 10 : 0,
  );

  let color = "text-red-400";
  let icon = FaCircleDown;

  if (votePercentage > 40) {
    color = "text-yellow-400";
    icon = FaCircleMinus;
  }

  if (votePercentage > 70) {
    color = "text-green-400";
    icon = FaCircleUp;
  }

  if (votePercentage > 0) {
    return (
      <div
        className={`flex w-fit items-center rounded-2xl bg-slate-900 px-4 py-1 leading-3 ${color} mb-2`}
      >
        <span className="font-bold sm:text-3xl">{votePercentage}%</span>
        <span className="ml-1 translate-y-[1px] sm:text-2xl">{icon({})}</span>
      </div>
    );
  }
}

function Genres(): JSX.Element {
  return (
    <div className="flex gap-1">
      {media?.genres?.map((genre) => (
        <Button
          key={`genre-${genre.id}`}
          variant="white"
          path={`/genres/${genre.id}`}
        >
          {genre.name}
        </Button>
      ))}
    </div>
  );
}

function Overview(): JSX.Element {
  const regex = /^.*?\..*?\./;
  let preview;
  let text = media?.overview;

  const res = media?.overview.match(regex);
  if (res != null) {
    preview = res[0];
    text = text?.slice(preview.length);
  }

  return (
    <div className={`${showElement(media?.overview)} text-pretty`}>
      <h2 className="mb-1 text-2xl font-semibold">Sinopse</h2>
      <p className="hidden sm:block">{media?.overview}</p>
      <div className="block leading-relaxed sm:hidden">
        <p>{preview ?? text}</p>
        <div
          id="hs-show-hide-collapse-heading"
          className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
          aria-labelledby="hs-show-hide-collapse"
        >
          <p>{text}</p>
        </div>
        <p className={`mt-2 ${showElement(preview)}`}>
          <button
            type="button"
            className="hs-collapse-toggle inline-flex items-center gap-x-1 rounded-lg border 
            border-transparent text-sm font-semibold text-sky-600 hover:text-sky-700 
            disabled:pointer-events-none disabled:opacity-50"
            id="hs-show-hide-collapse"
            data-hs-collapse="#hs-show-hide-collapse-heading"
          >
            <span className="hs-collapse-open:hidden">Mostrar mais</span>
            <span className="hidden hs-collapse-open:block">Mostrar menos</span>
            <svg
              className="size-4 flex-shrink-0 hs-collapse-open:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </p>
      </div>
    </div>
  );
}

function Cast() {
  // TODO: Mover para componente genérico
  const cast = media?.credits?.cast.slice(0, 15);

  return (
    <div className="w-full">
      <h2 className="mb-1 text-2xl font-semibold">Elenco</h2>
      <div className="mt-2 flex snap-x gap-4 overflow-x-auto">
        {cast?.map((cast) => (
          <Link
            to={`/person/${cast.id}`}
            key={`cast-${cast.id}`}
            className="mb-2 flex flex-col rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
          >
            <div className="w-28 sm:w-40">
              <img
                className="h-auto w-full rounded-t-xl"
                src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
              />
              <div className="p-2">
                <h3 className="text-base font-bold sm:text-lg">{cast.name}</h3>
                <p className="mt-1 text-gray-600">{cast.character}</p>
              </div>
            </div>
          </Link>
        ))}

        <Link
          to={"#"}
          className={`mb-2 flex min-w-28 flex-col items-center justify-center rounded-xl
          bg-white shadow-sm transition hover:shadow-lg sm:min-w-40`}
        >
          <FaPlus className="text-4xl text-gray-600" />
          <span className="font-medium text-gray-600">Ver mais</span>
        </Link>
      </div>
    </div>
  );
}

function Controlls() {
  const controlls = [
    {
      key: useId(),
      icon: FaEye,
      label: "Assistir",
      activeLabel: "Assistido",
      hoverLabel: "Remover",
    },
    {
      key: useId(),
      icon: FaHeart,
      label: "Favoritar",
      activeLabel: "Favorito",
      hoverLabel: "Remover",
    },
    {
      key: useId(),
      icon: FaStar,
      label: "Avaliar",
      activeLabel: "Avaliado",
      hoverLabel: "Remover",
    },
  ];

  return (
    <ul className="flex flex-row justify-around">
      {controlls.map((ctrl) => (
        <li key={ctrl.key}>
          <Button
            icon={ctrl.icon}
            className="flex h-full flex-col gap-0 text-xl xl:text-2xl"
            variant="blank"
          >
            <span className="mt-1 text-base text-gray-700">{ctrl.label}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
}

function ExtraControlls() {
  const extraControlls = [
    {
      key: useId(),
      icon: FaClock,
      label: "Assistir mais tarde",
    },
    {
      key: useId(),
      icon: FaBars,
      label: "Adicionar à uma lista",
    },
    {
      key: useId(),
      icon: FaComment,
      label: "Criar novo tópico",
    },
  ];

  return (
    <>
      {extraControlls.map((ctrl) => (
        <Button
          key={ctrl.key}
          variant="blank"
          icon={ctrl.icon}
          className="text-left"
        >
          {ctrl.label}
        </Button>
      ))}
    </>
  );
}
