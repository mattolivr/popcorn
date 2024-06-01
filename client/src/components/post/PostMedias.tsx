import Carousel, { type CarouselItem } from "../Carousel";
import { usePostContext } from "./context";

export function PostMedias(): React.ReactNode {
  const {
    post: { id, media },
  } = usePostContext();

  if (!media) {
    return <></>;
  }

  if (media?.length === 1) {
    return <img className="h-80 w-full rounded-lg object-cover" src={media[0]} />;
  }

  const medias: CarouselItem[] = media.map((path, index) => {
    return {
      key: `${id}-${index}`,
      background: path,
    };
  });

  return <Carousel data={medias} static />;
}
