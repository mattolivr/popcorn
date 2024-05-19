import { Carousel as FbCarousel } from "flowbite-react";

export interface CarouselProps {
  data?: CarouselItem[];
}

export interface CarouselItem {
  key: string;
  title?: string;
  background: string;
  link?: string;
}

export default function Carousel(props: CarouselProps): JSX.Element {
  // TODO: Ajustar responsivididade, z-index maior que o Menu e ring dos botões
  return (
    <div className="h-44 overflow-hidden sm:h-64 xl:h-80 2xl:h-96">
      <FbCarousel>
        {props.data?.map((item) => (
          <CarouselContentItem key={item.key} item={item} />
        ))}
      </FbCarousel>
    </div>
  );
}

function CarouselContentItem({ item }: { item: CarouselItem }): JSX.Element {
  const cursor = item.link == null ? "cursor-default" : "cursor-pointer";

  // TODO: Adicionar tratativa de erro ao não encontrar uma imagem
  return (
    <a
      className={`relative flex h-full items-end justify-center
        bg-gradient-to-b from-transparent to-neutral-950 ${cursor}`}
      href={item.link}
    >
      <div className="absolute top-0 flex items-center justify-center">
        <img src={item.background} className="object-cover mix-blend-overlay" />
      </div>
      <span className="absolute mb-10 text-lg font-bold text-white">
        {item.title}
      </span>
    </a>
  );
}
