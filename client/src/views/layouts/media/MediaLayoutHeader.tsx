import { FaImage } from "react-icons/fa6";
import { getImage } from "../../../adapters/tmdb";
import { useMediaLayoutContext } from "./context";
import { MediaLayoutExternalLinks } from "./MediaLayoutExternal";

export function MediaLayoutHeader(): React.ReactNode {
  return (
    <MediaLayoutBackground>
      <MediaLayoutPoster />
      <div className="hidden flex-col items-start justify-between px-4 sm:flex">
        <div className="flex h-full flex-col justify-center">
          <MediaLayoutTitle />
          <MediaLayoutInfos />
          <MediaLayoutTagline />
          <MediaLayoutExternalLinks />
        </div>
        <MediaLayoutRating />
      </div>
      <div className="ml-2 flex items-end sm:hidden">
        <MediaLayoutExternalLinks />
      </div>
    </MediaLayoutBackground>
  );
}

function MediaLayoutBackground({ children }: { children: React.ReactNode }): React.ReactNode {
  const { media } = useMediaLayoutContext();
  const style: React.CSSProperties = {
    backgroundImage: `url('https://image.tmdb.org/t/p/original${media?.backdrop_path}')`,
    backgroundPosition: "50% 30%",
    backgroundSize: "cover",
  };

  return (
    <div className="w-full bg-sky-950" style={style}>
      <div className="bg-slate-700/40">
        <div className="flex py-4 sm:justify-start 2xl:ms-64">{children}</div>
      </div>
    </div>
  );
}

function MediaLayoutPoster(): React.ReactNode {
  const { media } = useMediaLayoutContext();
  const className = "h-[149px] w-[96px] rounded-xl shadow-md sm:h-[338px] sm:w-[225px] ms-2";

  if (media == null) {
    return (
      <div className={`${className} flex items-center justify-center bg-sky-900`}>
        <FaImage className="text-4xl text-sky-600" />
      </div>
    );
  } else {
    return <img className={className} src={getImage(media.poster_path)} />;
  }
}

function MediaLayoutTitle(): React.ReactNode {
  const { media } = useMediaLayoutContext();

  return (
    <div className="flex flex-row items-end">
      <h1 className="text-3xl font-bold text-white xl:text-4xl">{media?.getTitle()}</h1>
      <span className="ml-3 text-2xl text-gray-200">{media?.getYear()}</span>
    </div>
  );
}

function MediaLayoutInfos(): React.ReactNode {
  const { media } = useMediaLayoutContext();

  return (
    <ul className="flex flex-row items-center gap-2 text-lg font-medium text-gray-200">
      {media?.getInfos().map((info, index) => <li key={index}>{info}</li>)}
    </ul>
  );
}

function MediaLayoutTagline(): React.ReactNode {
  const { media } = useMediaLayoutContext();

  return (
    media?.tagline && (
      <p className="mt-2 text-lg font-medium italic text-gray-200">{media?.tagline}</p>
    )
  );
}

function MediaLayoutRating(): React.ReactNode {
  const { media } = useMediaLayoutContext();

  return (
    <div className="flex flex-col justify-start">
      <strong className="text-lg text-white">Avaliação dos usuários:</strong>
      <h2 className="text-left text-5xl font-extrabold text-white">
        {media?.getVotePercentage()}%
      </h2>
    </div>
  );
}
