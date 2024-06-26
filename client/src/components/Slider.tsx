import { useId, useState, type ComponentProps } from "react";
import { type IconBaseProps, type IconType } from "react-icons";
import { FaAngleLeft, FaAngleRight, FaImage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { tv, type VariantProps } from "tailwind-variants";

export type CarouselProps = ComponentProps<"div"> &
  VariantProps<typeof carousel> & {
    data?: SliderData[];
  };

// TODO: Implementar
export interface SliderData {
  key: string;
  title: string;
  description: string;
  img?: string;
}

let sliderId = "";

export default function Slider({
  className,
  ...props
}: CarouselProps): JSX.Element {
  const [position, setPosition] = useState(0);
  const { base } = carousel({ className });

  sliderId = useId();

  return (
    <div className="relative flex items-center">
      <Controll
        icon={FaAngleLeft}
        direction="left"
        position={position}
        setPosition={setPosition}
      />
      <div
        id={sliderId}
        className={base()}
        onScroll={(event) => {
          handleScroll(event, setPosition);
        }}
      >
        <Content props={props} />
      </div>
      <Controll
        icon={FaAngleRight}
        direction="right"
        position={position}
        setPosition={setPosition}
      />
    </div>
  );
}

const carousel = tv({
  slots: {
    base: "scroll no-scrollbar flex gap-2 h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap",
  },
  variants: {
    type: {
      list: {},
      highlight: {},
    },
  },
});

function Content({
  props,
}: {
  props: CarouselProps;
}): JSX.Element[] | undefined {
  // TODO: Implementar botão "Ver Mais"
  const data = props.data;

  if (data == null) {
    return;
  }

  switch (props.type) {
    case "highlight": {
      return;
    }
    default: {
      return data.map((entity) => (
        <Link
          to={`/person/${entity.key}`}
          key={`cast-${entity.key}`}
          className="rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
        >
          <div className="h-full w-28 sm:w-40">
            <div className="flex h-40 w-full items-center justify-center rounded-t-xl bg-gray-300 text-2xl text-white sm:h-60 sm:text-4xl">
              {entity.img == null ? (
                <FaImage />
              ) : (
                <img src={entity.img} className="h-full w-full rounded-t-xl" />
              )}
            </div>
            <div className="text-wrap px-2 py-1">
              <strong>{entity.title}</strong>
              <p className="text-gray-700">{entity.description}</p>
            </div>
          </div>
        </Link>
      ));
    }
  }
}

interface SliderProps {
  icon: IconType;
  direction: "left" | "right";
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
}

function Controll(props: SliderProps): JSX.Element {
  const iconProps: IconBaseProps = {
    size: 28,
  };
  const align = props.direction === "left" ? "left-0" : "right-0";
  const slider = document.getElementById(sliderId);

  if (props.direction === "left" && props.position <= 0) {
    return <></>;
  }
  if (
    slider != null &&
    props.direction === "right" &&
    props.position >= slider.scrollWidth - 600
  ) {
    return <></>;
  }
  return (
    <div
      className={`absolute flex h-full w-10 items-center justify-center ${align}`}
    >
      <button
        className=" rounded-full bg-sky-500 bg-opacity-0 p-3 text-white transition hover:bg-opacity-85"
        onClick={() => {
          slide(props.direction, props.position, props.setPosition);
        }}
        id={`${sliderId}-${props.direction}`}
      >
        {props.icon(iconProps)}
      </button>
    </div>
  );
}

const slide = (
  direction: "left" | "right",
  position: number,
  setPosition: React.Dispatch<React.SetStateAction<number>>,
): void => {
  const slider = document.getElementById(sliderId);

  if (slider == null) {
    return;
  }

  if (direction === "left") {
    if (slider.scrollLeft - 500 <= 150) {
      slider.scrollLeft = 0;
      setPosition(0);
    } else {
      slider.scrollLeft = slider.scrollLeft - 500;
      setPosition(position - 500);
    }
  } else {
    if (slider.scrollWidth - (slider.scrollLeft + 500) <= 250) {
      slider.scrollLeft = slider.scrollWidth;
      setPosition(slider.scrollWidth);
    } else {
      slider.scrollLeft = slider.scrollLeft + 500;
      setPosition(position + 500);
    }
  }
};

const handleScroll = (
  event: React.UIEvent<HTMLDivElement, UIEvent>,
  setPosition: React.Dispatch<React.SetStateAction<number>>,
): void => {
  setPosition(event.currentTarget.scrollLeft);
};
