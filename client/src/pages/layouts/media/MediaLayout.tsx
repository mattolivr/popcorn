import React, { useState } from "react";
import Anchor from "../../../components/Anchor.tsx";
import Card from "../../../components/card/Card.tsx";
import Slider, { type SliderData } from "../../../components/Slider.tsx";
import { type Media } from "../../../entites/tmdb/tmdb.media.ts";
import mediaService from "../../../services/media.service.ts";
import MediaLayoutContext, { useMediaLayoutContext } from "./context.ts";
import {
  MediaLayoutControlls,
  MediaLayoutMobileControlls,
} from "./MediaLayoutControlls.tsx";
import {
  MediaLayoutMobileWatchProviders,
  MediaLayoutWatchProviders,
} from "./MediaLayoutExternal.tsx";
import { MediaLayoutHeader } from "./MediaLayoutHeader.tsx";

export interface MediaLayoutProps {
  children: React.ReactNode;
  media?: Media;
}

export default function MediaLayout(props: MediaLayoutProps): React.ReactNode {
  // TODO: Implementar React Helmet
  // TODO: Ajustar tamanho da tela para conter sempre o Menu
  const { media } = props;

  return (
    <MediaLayoutContext.Provider value={{ media }}>
      <main className="flex h-full w-full flex-col">
        <MediaLayoutHeader />
        <MediaLayoutBody>
          <section className="sm:7/8 flex w-full flex-col gap-1 sm:gap-2 lg:w-8/12">
            <MediaLayoutMobileInfos />
            <MediaLayoutOverview />
            <MediaLayoutMobileWatchProviders />
            <MediaLayoutCast />
          </section>
          <aside className="sm:1/8 hidden lg:block lg:w-4/12">
            <Card>
              <MediaLayoutControlls />
              <MediaLayoutWatchProviders />
            </Card>
          </aside>
        </MediaLayoutBody>
      </main>
      <MediaLayoutMobileControlls />
    </MediaLayoutContext.Provider>
  );
}

function MediaLayoutBody({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <div className="lg-px-48 my-1 flex justify-between gap-4 px-1 sm:my-4 sm:px-2 2xl:px-64">
      {children}
    </div>
  );
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
      <strong className="mr-2 text-xl font-medium">
        {media?.getVotePercentage()}%
      </strong>
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
        <span
          key={genre.id}
          className="text-nowrap rounded-xl bg-sky-700 px-3 py-1 font-semibold text-white"
        >
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
