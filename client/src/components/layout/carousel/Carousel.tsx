import { type CustomFlowbiteTheme, Carousel as FbCarousel } from "flowbite-react";

export interface CarouselProps {
  data?: CarouselItem[];
  static?: boolean;
}

export interface CarouselItem {
  key: string;
  title?: string;
  background: string;
  link?: string;
}

export default function Carousel(props: CarouselProps): JSX.Element {
  const slide = props.static == null || !props.static;

  return (
    <div className="h-44 overflow-hidden sm:h-64 xl:h-80">
      <FbCarousel theme={carouselStyle} slide={slide}>
        {props.data?.map((item) => <CarouselContentItem key={item.key} item={item} />)}
      </FbCarousel>
    </div>
  );
}

function CarouselContentItem({ item }: { item: CarouselItem }): JSX.Element {
  const cursor = item.link == null ? "cursor-default" : "cursor-pointer";
  const gradient = item.title == null ? "" : "bg-gradient-to-b from-transparent to-neutral-950";

  // TODO: Adicionar tratativa de erro ao não encontrar uma imagem
  return (
    <a
      className={`relative flex h-full items-end justify-center
        ${gradient} ${cursor}`}
      href={item.link}
    >
      <div className="absolute top-0 flex items-center justify-center">
        <img src={item.background} className="object-cover mix-blend-overlay" />
      </div>
      <span className="absolute mb-10 text-lg font-bold text-white">{item.title}</span>
    </a>
  );
}

const carouselStyle: CustomFlowbiteTheme["carousel"] = {
  control: {
    base: `inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 
      group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 
      group-focus:ring-transparent group-active:bg-white/60
      dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 
      dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10`,
  },
};
