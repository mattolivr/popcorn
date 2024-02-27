import { useId, useState } from "react";
import { type IconBaseProps, type IconType } from "react-icons";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export interface CarouselProps {
  highlight?: boolean;
  data?: JSX.Element[];
}

// TODO: Implementar
export interface Data {
  img?: string;
  title: string;
  description: string;
}

let sliderId = "";

export default function Carousel(props: CarouselProps): JSX.Element {
  // TODO: Implementar variantes
  sliderId = useId();
  const [position, setPosition] = useState(0);

  return (
    <div className="relative flex items-center">
      <Slider
        icon={FaAngleLeft}
        direction="left"
        position={position}
        setPosition={setPosition}
      />
      <div
        id={sliderId}
        className="scroll no-scrollbar flex h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap"
      >
        {props.data}
      </div>
      <Slider
        icon={FaAngleRight}
        direction="right"
        position={position}
        setPosition={setPosition}
      />
    </div>
  );
}

interface SliderProps {
  icon: IconType;
  direction: "left" | "right";
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
}

function Slider(props: SliderProps): JSX.Element {
  const iconProps: IconBaseProps = {};
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
    <button
      className={`absolute flex h-full w-10 items-center justify-center rounded-md bg-transparent hover:bg-slate-900 hover:bg-opacity-45 ${align}`}
      onClick={() => {
        slide(props.direction, props.position, props.setPosition);
      }}
      id={`${sliderId}-${props.direction}`}
    >
      {props.icon(iconProps)}
    </button>
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
