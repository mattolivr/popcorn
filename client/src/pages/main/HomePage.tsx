import { fakerPT_BR as faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Button from "../../components/core/button/Button";
import Card from "../../components/core/card/Card";
import AsideFriends from "../../components/layout/aside/AsideFriends";
import AsideHighlight from "../../components/layout/aside/AsideHighlight";
import { useAside } from "../../components/layout/aside/context";
import Carousel, { type CarouselItem } from "../../components/layout/carousel/Carousel";
import { type Post as PostType } from "../../core/models/post";
import mediaService from "../../core/services/media.service";

export default function HomePage(): React.ReactNode {
  const aside = useAside();

  useEffect(() => {
    aside.setContent(
      <>
        <Button color="clear" className="h-14 bg-white" icon={FaPlus}>
          Nova postagem
        </Button>
        <Card className="grow gap-3 overflow-hidden px-2">
          <AsideHighlight />
          <AsideFriends />
        </Card>
      </>,
    );
  }, [aside.setContent]);

  const posts: PostType[] = Array.from({ length: 15 }, () => {
    return {
      id: faker.string.uuid(),
      stats: {
        comments: faker.number.int({ max: 999999 }),
        likes: faker.number.int({ max: 999999 }),
        shares: faker.number.int({ max: 999999 }),
      },
      media: Array.from({ length: faker.number.int({ max: 2 }) }, () => faker.image.urlPicsumPhotos()),
      user_id: faker.string.uuid(),
    };
  });

  return (
    <div className="my-2 flex w-full flex-col gap-2 self-center sm:w-[600px]">
      {/* <Highlights />
      <Card>
        <UserInput />
      </Card>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))} */}
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
