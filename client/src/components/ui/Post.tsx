import { Avatar } from "flowbite-react";
import { useId } from "react";
import { FaComment, FaEllipsisVertical, FaHeart, FaShare } from "react-icons/fa6";
import Button from "../button/Button";
import Card from "../Card";
import Carousel, { type CarouselItem } from "../Carousel";
import PostInput from "../PostInput";
import Comment from "./Comment";

// Mudar para entidade
export interface PostProps {
  user?: any;
  text?: string;
  media?: string[];
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export default function Post({ id }: { id: string }): JSX.Element {
  const props: PostProps = {
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
    <Card>
      <Header {...props} />
      <Body {...props} />
    </Card>
  );
}

function Header(props: PostProps): JSX.Element {
  return (
    <div className="flex w-full gap-3">
      <Avatar rounded />
      <div className="flex grow flex-col justify-center leading-5">
        <span className="font-medium">Nome do usuário</span>
        <span className="text-slate-700">@username</span>
      </div>
      <Button icon={FaEllipsisVertical} color="transparent" className="px-3 py-2" />
    </div>
  );
}

function Body(props: PostProps): JSX.Element {
  return (
    <>
      <p className="my-2">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore veniam enim eveniet nisi
        quia sapiente commodi obcaecati, quaerat molestias ea quibusdam veritatis ipsam! Porro sit
        quisquam, velit maiores autem odit!
      </p>
      <Medias {...props} />
      <Controlls {...props} />
      <NewComment {...props} />
      <Comment />
    </>
  );
}

function Medias(props: PostProps): JSX.Element {
  const { media } = props;
  const id = useId();

  if (media == null || media.length === 0) {
    return <></>;
  }

  if (media.length === 1) {
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

function Controlls(props: PostProps): JSX.Element {
  const { stats } = props;

  return (
    <ul className="my-2 flex flex-row gap-1">
      <Button className="grow" color="transparent" icon={FaHeart}>
        {stats.likes}
      </Button>
      <Button className="grow" color="transparent" icon={FaComment}>
        {stats.comments}
      </Button>
      <Button className="grow" color="transparent" icon={FaShare}>
        {stats.shares}
      </Button>
    </ul>
  );
}

function NewComment(props: PostProps): JSX.Element {
  return <PostInput />;
}
