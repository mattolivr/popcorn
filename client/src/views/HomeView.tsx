import { type AxiosResponse } from "axios";
import { useEffect, useId, useState } from "react";
import { FaImage, FaMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { get } from "../adapters/tmdb";
import Button from "../components/Button";
import Card from "../components/Card";
import Carousel, { type CarouselItem } from "../components/Carousel";
import Input from "../components/Input";
import {
  getTitle,
  isMovie,
  type Movie,
  type TVShow,
} from "../entites/tmdb.media";

export default function HomeView(): JSX.Element {
  return (
    <div className="mt-4 flex w-full flex-col gap-2 px-2 md:w-3/4 lg:w-7/12">
      <Highlights />
      <NewPost />
    </div>
  );
}

function NewPost(): JSX.Element {
  const textAreaId = useId();
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const clean = text === "";

  return (
    <Card>
      <form action="">
        <div className="flex flex-row items-start gap-3">
          <div className="hidden w-10 items-center sm:flex">
            <Link
              to="/users"
              className="block h-10 w-10 rounded-full bg-orange-300"
            />
          </div>
          <Input
            id={textAreaId}
            type="textarea"
            placeholder="O que está pensando?..."
            onInput={(e) => {
              setText(e.currentTarget.value);
            }}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
          />
        </div>
        <ul
          className={`ml-10 items-center justify-end pl-3 pt-2 sm:gap-1 ${clean && !focused ? "hidden" : "flex"}`}
        >
          <li>
            <Button color="transparent" icon={FaImage} />
          </li>
          <li>
            <Button color="transparent" icon={FaMessage} />
          </li>
          <li>
            <Button
              className={clean ? "hidden" : ""}
              color="secondary"
              onClick={() => {
                setText("");
              }}
            >
              Limpar
            </Button>
          </li>
          <li>
            <Button disabled={clean} color="primary">
              Enviar
            </Button>
          </li>
        </ul>
      </form>
    </Card>
  );
}

function Highlights(): JSX.Element {
  const [data, setData] = useState<CarouselItem[]>();

  useEffect(() => {
    function getMedia(response: AxiosResponse<any, any>): void {
      setData(
        response.data?.results?.map((media: Movie | TVShow) => {
          return {
            key: media.id,
            title: getTitle(media) ?? "",
            background: `https://image.tmdb.org/t/p/original/${media.backdrop_path}`,
            link: `/${isMovie(media) ? "movies" : "shows"}/${media.id}`,
          };
        }) as CarouselItem[],
      );
    }
    if (data == null) {
      get("trending/all/day", getMedia);
    }
  });

  return <Carousel data={data} />;
}
