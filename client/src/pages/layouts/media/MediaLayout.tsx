import React, { ReactNode, useState } from "react";
import Card from "../../../components/core/card/Card.tsx";
import Anchor from "../../../components/core/link/Link.tsx";
import Slider, { type SliderData } from "../../../components/layout/horizontal-list/Slider.tsx";
import { type Media } from "../../../core/models/tmdb/tmdb.media.ts";
import mediaService from "../../../core/services/media.service.ts";
import MediaLayoutContext, { useMediaLayoutContext } from "./context.ts";
import {
  MediaLayoutAuxControlls,
  MediaLayoutMainControlls,
  MediaLayoutMobileControlls,
} from "./MediaLayoutControlls.tsx";
import { MediaLayoutMobileWatchProviders, MediaLayoutWatchProviders } from "./MediaLayoutExternal.tsx";
import { MediaLayoutHeader } from "./MediaLayoutHeader.tsx";

export interface MediaLayoutProps {
  children: React.ReactNode;
  media?: Media;
}

export default function MediaLayout(props: MediaLayoutProps): React.ReactNode {
  // TODO: Implementar React Helmet
  const { media } = props;

  return (
    <MediaLayoutContext.Provider value={{ media }}>
      <MediaLayoutContent />
    </MediaLayoutContext.Provider>
  );
}

function MediaLayoutContent(): ReactNode {
  return (
    <>
      <main className="flex h-full w-full flex-col items-center">
        <MediaLayoutBackground />
        <div className="z-20 w-full pr-2 xl:pr-0 2xl:w-[800px]">
          <MediaLayoutHeader />
          <div className="flex">
            <section className="mt-2 flex flex-col gap-1 sm:gap-2">
              <MediaLayoutMobileInfos />
              <MediaLayoutOverview />
              <MediaLayoutMobileWatchProviders />
              <MediaLayoutCast />
            </section>
            <aside>
              <MediaLayoutMainControlls />
              <Card className="z-40 h-full px-2">
                <MediaLayoutAuxControlls />
                <MediaLayoutWatchProviders />
              </Card>
            </aside>
          </div>
        </div>
      </main>
      <MediaLayoutMobileControlls />
    </>
  );
}

function MediaLayoutBackground(): React.ReactNode {
  const { media } = useMediaLayoutContext();
  const style: React.CSSProperties = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.8)), 
      url('https://image.tmdb.org/t/p/original${media?.backdrop_path}')`,
    backgroundPosition: "50% 30%",
    backgroundSize: "cover",
  };

  return <div className="absolute left-0 top-0 h-[23rem] w-full bg-sky-100" style={style} />;
}

function MediaLayoutMobileInfos(): React.ReactNode {
  const { media } = useMediaLayoutContext();
  return (
    <Card className="block sm:hidden">
      <span className="text-2xl font-semibold">{media?.getTitle()}</span>
      <span className="ml-2 text-lg font-semibold">{`(${media?.getYear()})`}</span>
      <p className="font-medium italic text-slate-900">{media?.tagline}</p>
      <div className="flex gap-1">
        {media?.getInfos().map((value, index) => {
          return <span key={index}>{value}</span>;
        })}
      </div>
      <strong className="mr-2 text-xl font-medium">{media?.getVotePercentage()}%</strong>
      <MediaLayoutGenres mobile />
    </Card>
  );
}

function MediaLayoutOverview(): React.ReactNode {
  const { media } = useMediaLayoutContext();
  const { text, preview } = getTextPreview(media?.overview);
  const [allText, setAllText] = useState(false);

  return (
    text && (
      <Card className="text-pretty" title={<Card.Title text="Sinopse" />}>
        <div className="hidden sm:block">
          <p>{text}</p>
        </div>
        <div className="block sm:hidden">
          <span>{allText ? text : preview}</span>
          <span
            className="cursor-pointer font-semibold text-sky-700"
            hidden={preview?.length === text.length}
            onClick={() => {
              setAllText(!allText);
            }}
          >
            {allText ? " Mostrar menos." : " Mostrar mais."}
          </span>
        </div>
        <MediaLayoutGenres />
      </Card>
    )
  );
}

function getTextPreview(text?: string): { text?: string; preview?: string } {
  const previewRegEx = /^.*?\..*?\./;

  const regExMatch = text?.match(previewRegEx);
  if (regExMatch != null) {
    return {
      text,
      preview: regExMatch[0],
    };
  }

  return { text, preview: text };
}

function MediaLayoutGenres({ mobile }: { mobile?: boolean }): React.ReactNode {
  const { media } = useMediaLayoutContext();
  const display = mobile ? "flex sm:hidden" : "hidden sm:flex";

  return (
    <div className={`mt-2 gap-1 overflow-x-auto ${display}`}>
      {media?.genres?.map((genre) => (
        <span key={genre.id} className="text-nowrap rounded-xl bg-sky-700 px-3 py-1 font-semibold text-white">
          {genre.name}
        </span>
      ))}
    </div>
  );
}

function MediaLayoutCast(): React.ReactNode {
  const { media } = useMediaLayoutContext();
  const cast = media?.credits?.cast?.slice(0, 15);

  const elements: SliderData[] | undefined = cast?.map((person) => {
    return {
      key: person.id.toString(),
      title: person.name,
      description: person.character,
      img: mediaService.getImage(person.profilePath),
    };
  });

  return (
    cast && (
      <Card title="Elenco">
        <Slider data={elements} />
        <Anchor to="./cast" className="mt-1 text-right">
          Ver todo o Elenco...
        </Anchor>
      </Card>
    )
  );
}
