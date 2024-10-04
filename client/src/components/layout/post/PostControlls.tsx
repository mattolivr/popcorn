import { FaComment, FaHeart, FaShare } from "react-icons/fa6";
import Button, { ButtonProps } from "../button/Button";
import { usePostContext } from "./context";

export default function PostControlls(): React.ReactNode {
  const {
    post: {
      stats: { comments, likes, shares },
    },
  } = usePostContext();

  // TODO: Formatar números grandes
  const buttons: ButtonProps[] = [
    { color: "clear", className: "grow", icon: FaHeart, children: likes },
    { color: "clear", className: "grow", icon: FaComment, children: comments },
    { color: "clear", className: "grow", icon: FaShare, children: shares },
  ];

  return (
    <ul className="flex flex-row gap-1">
      {buttons.map((btn, index) => (
        <Button key={index} {...btn} />
      ))}
    </ul>
  );
}
