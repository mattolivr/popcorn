import { useEffect, useState } from "react";
import Card from "../components/card/Card";
import Carousel, { type CarouselItem } from "../components/Carousel";
import Post from "../components/post/Post";
import UserInput from "../components/ui/UserInput";
import { type Post as PostType } from "../entites/post";
import mediaService from "../services/media.service";

export default function HomePage(): React.ReactNode {
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
    <div className="my-2 flex h-fit w-full flex-col gap-2 px-1">
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
      const items = await mediaService.getHighlights(9);
      setData(
        items.map((highlight, index) => {
          return {
            title: highlight.getTitle(),
            background: mediaService.getImage(highlight.backdrop_path),
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
