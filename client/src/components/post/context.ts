import { createContext, useContext } from "react";
import { type Post } from "../../entites/pop.post";

const PostContext = createContext<{ post: Post } | null>(null);

export function usePostContext(): { post: Post } {
  const context = useContext(PostContext);
  if (context == null) {
    throw Error("Os elementos Post.* devem ser reenderizados dentro de Post");
  }
  return context;
}

export default PostContext;
