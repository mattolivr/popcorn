import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TVShow } from "../../core/models/tmdb/tmdb.media";
import mediaService from "../../core/services/media.service";
import MediaLayout from "../layouts/media/MediaLayout";

export default function TVShowPage(): React.ReactNode {
  const [show, setShow] = useState<TVShow>();
  const { id } = useParams();

  useEffect(() => {
    if (show == null && id != null) {
      void mediaService.getEntity(TVShow, id, setShow);
    }
  }, [show, id]);

  return (
    <MediaLayout media={show}>
      <></>
    </MediaLayout>
  );
}
