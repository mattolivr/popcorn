import { Link } from "react-router-dom";

export interface AnchorProps {
  path: string;
  className?: string;
  children: React.ReactNode;
}

export default function Anchor(props: AnchorProps): JSX.Element {
  return (
    <Link
      to={props.path}
      className={`rounded-2xl px-1 text-center font-semibold
                text-sky-700 outline-sky-500 ${props.className}`}
    >
      {props.children}
    </Link>
  );
}
