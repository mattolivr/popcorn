import { FaComment, FaHeart, FaShare } from "react-icons/fa6";
import Button from "../button/Button";
import { usePostContext } from "./context";

export default function PostControlls(): React.ReactNode {
  const {
    post: {
      stats: { comments, likes, shares },
    },
  } = usePostContext();

  return (
    <ul className="flex flex-row gap-1">
      <Button className="grow" color="transparent" icon={<Button.Icon icon={FaHeart} />}>
        {likes}
      </Button>
      <Button className="grow" color="transparent" icon={<Button.Icon icon={FaComment} />}>
        {comments}
      </Button>
      <Button className="grow" color="transparent" icon={<Button.Icon icon={FaShare} />}>
        {shares}
      </Button>
    </ul>
  );
}
