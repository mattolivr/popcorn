import { createContext, useContext } from "react";
import { type Media } from "../../../entites/tmdb/tmdb.media";

const MediaLayoutContext = createContext<{ media?: Media } | null>(null);

export function useMediaLayoutContext(): { media?: Media } {
  const context = useContext(MediaLayoutContext);
  if (context == null) {
    throw Error(
      "Os elementos MediaLayout.* devem ser reenderizados dentro de MediaLayout",
    );
  }
  return context;
}

export default MediaLayoutContext;
