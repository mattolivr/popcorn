import React, { useId } from "react";
import { type IconType } from "react-icons";
import { FaFacebook, FaImage, FaImdb, FaInstagram } from "react-icons/fa";
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
  FaXTwitter,
} from "react-icons/fa6";
import Button from "../../components/Button.tsx";
import Card from "../../components/Card";
import Carousel, { type CarouselData } from "../../components/Carousel.tsx";
import Divider from "../../components/Divider.tsx";
import {
  getAllWatchProviders,
  getDate,
  getRuntime,
  getTitle,
  type Movie,
  type TVShow,
} from "../../entites/tmdb.media.ts";
import Tag from "../../components/Tag.tsx";

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
      <div className="lg-px-48 flex justify-between gap-4 sm:mt-4 sm:px-2 2xl:px-64">
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
            <ExtraControlls />
            <ExternalIds />
            <WatchProviders />
          </Card>
        </aside>
      </div>
      {props.children}
    </div>
  );
}

export const showElement = (obj: any): string =>
  obj != null && obj !== "" ? "inline" : "hidden";

function Highlight(): JSX.Element {
  const mediaDate = getDate(media);
  const runtime = getRuntime(media);

  return (
    <Backdrop>
      <div className="flex bg-slate-700/40 py-4 sm:justify-start 2xl:ms-64">
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
    "h-[149px] w-[96px] rounded-xl shadow-md sm:h-[338px] sm:w-[225px] ms-2";

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
          color="primary"
          to={`/genres/${genre.id}`}
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

function Cast(): JSX.Element {
  const cast = media?.credits?.cast.slice(0, 15);

  if (cast == null) {
    return <></>;
  }

  const elements: CarouselData[] = cast.map((person) => {
    const t: CarouselData = {
      key: person.id.toString(),
      title: person.name,
      description: person.character,
      img:
        person.profile_path == null
          ? undefined
          : `https://image.tmdb.org/t/p/original${person.profile_path}`,
    };
    return t;
  });

  return (
    <>
      <h1 className="mb-2 text-2xl font-semibold text-stone-950">Elenco</h1>
      <Carousel data={elements} className="mb-5" />
    </>
  );
}

function Controlls(): JSX.Element {
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
    <div className="flex flex-row flex-wrap">
      {controlls.map((ctrl) => (
        <Button
          key={ctrl.key}
          icon={ctrl.icon}
          className="flex h-full grow flex-col gap-0 py-2 text-xl xl:text-2xl"
          color="transparent"
        >
          <span className="mt-1 text-base text-gray-700">{ctrl.label}</span>
        </Button>
      ))}
    </div>
  );
}

function ExtraControlls(): JSX.Element {
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
      <Divider />
      {extraControlls.map((ctrl) => (
        <Button
          key={ctrl.key}
          color="transparent"
          align="start"
          icon={ctrl.icon}
        >
          {ctrl.label}
        </Button>
      ))}
    </>
  );
}

interface ExternalIdButton {
  id: string;
  icon: IconType;
  path: string;
}

function ExternalIds(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { external_ids } = media ?? {};

  const buttons: ExternalIdButton[] = [
    {
      id: "d" + external_ids?.imdb_id,
      icon: FaImdb,
      path: `https://www.imdb.com/title/${external_ids?.imdb_id}`,
    },
    {
      id: "f" + external_ids?.facebook_id,
      icon: FaFacebook,
      path: `https://www.facebook.com/${external_ids?.facebook_id}`,
    },
    {
      id: "i" + external_ids?.instagram_id,
      icon: FaInstagram,
      path: `https://www.instagram.com/${external_ids?.instagram_id}`,
    },
    {
      id: "x" + external_ids?.twitter_id,
      icon: FaXTwitter,
      path: `https://twitter.com/${external_ids?.twitter_id}`,
    },
  ];

  return (
    <>
      <Divider />
      <div className="flex">
        {buttons
          .filter((button) => !button.id.includes("null"))
          .map((button) => (
            <Button
              key={button.id}
              to={button.path}
              icon={button.icon}
              color="transparent"
              className="grow text-2xl"
            />
          ))}
      </div>
    </>
  );
}

function WatchProviders(): JSX.Element {
  const providers = getAllWatchProviders(media);

  console.log("providers", providers);

  if (providers == null) {
    return <></>;
  }

  return (
    <>
      <Divider />
      <a
        className="flex cursor-pointer flex-col gap-2"
        href={media?.["watch/providers"]?.results?.BR?.link}
      >
        {providers.map((provider) => (
          <div
            key={provider.provider_id}
            className="flex h-14 w-full flex-row rounded-2xl border shadow-sm hover:bg-gray-100"
          >
            <img
              src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
              className="h-full rounded-2xl"
            />
            <div className="flex w-full flex-col justify-center text-wrap px-2">
              <strong>{provider.provider_name}</strong>
              <div className="flex flex-row gap-1">
                {provider.type.map((type) => {
                  let props: { text: string; color: string };

                  switch (type) {
                    case "buy":
                      props = { text: "Comprar", color: "bg-green-200" };
                      break;
                    case "rent":
                      props = { text: "Alugar", color: "bg-yellow-200 " };
                      break;
                    default:
                      props = { text: "Streaming", color: "bg-purple-200" };
                      break;
                  }

                  return (
                    <Tag key={provider.provider_id + type} color={props.color}>
                      {props.text}
                    </Tag>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </a>
    </>
  );
}
