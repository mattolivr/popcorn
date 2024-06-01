import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEntity } from "../adapters/tmdb";
import { TVShow } from "../entites/tmdb.media";
import MediaLayout from "./layouts/media/MediaLayout";

export default function TVShowView(): React.ReactNode {
  const [show, setShow] = useState<TVShow>();
  const { id } = useParams();

  useEffect(() => {
    if (show == null && id != null) {
      void getEntity(TVShow, id, setShow);
    }
  }, [show, id]);

  return (
    <MediaLayout media={show}>
      <></>
    </MediaLayout>
  );
}
