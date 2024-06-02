import { useEffect, useState } from "react";
import { getHighlights, getImage } from "../adapters/tmdb";
import Card from "../components/card/Card";
import Carousel, { type CarouselItem } from "../components/Carousel";
import Post from "../components/post/Post";
import UserInput from "../components/ui/UserInput";
import { type Post as PostType } from "../entites/pop.post";

export default function HomeView(): React.ReactNode {
  const post: PostType = {
    id: "1",
    media: [
      "https://source.unsplash.com/random/1",
      "https://source.unsplash.com/random/2",
      "https://source.unsplash.com/random/3",
    ],
    stats: {
      likes: 24,
      comments: 2,
      shares: 1,
    },
  };

  return (
    <div className="my-2 flex h-fit w-full flex-col gap-2 px-3 sm:px-2 md:w-3/4 lg:w-7/12 xl:w-5/12 2xl:w-2/5">
      <Highlights />
      <Card>
        <UserInput />
      </Card>
      <Post post={post} />
    </div>
  );
}

function Highlights(): React.ReactNode {
  const [data, setData] = useState<CarouselItem[]>();

  useEffect(() => {
    async function get(): Promise<void> {
      const items = await getHighlights(9);
      setData(
        items.map((highlight, index) => {
          return {
            title: highlight.getTitle(),
            background: getImage(highlight.backdrop_path),
            link: `/${highlight.entityName === "tv" ? "shows" : "movies"}/${highlight.id}`,
            key: index.toString(),
          };
        }),
      );
    }
    if (!data) {
      void get();
    }
  });

  return <Carousel data={data} />;
}
