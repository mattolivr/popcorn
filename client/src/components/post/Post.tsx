import { type Post as PostType } from "../../entites/pop.post";
import Card from "../card/Card";
import UserInput from "../ui/UserInput";
import PostContext from "./context";
import PostControlls from "./PostControlls";
import PostHeader from "./PostHeader";
import { PostMedias } from "./PostMedias";
import PostText from "./PostText";

interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps): React.ReactNode {
  return (
    <PostContext.Provider value={{ post }}>
      <Card className="gap-2">
        <PostHeader />
        <PostText />
        <PostMedias />
        <PostControlls />
        <UserInput />
      </Card>
    </PostContext.Provider>
  );
}
