import { tmdb } from "../adapters/tmdb";
import { Media, newMedia } from "../entites/tmdb/tmdb.media";

class MediaService {
  async getEntity<T extends MediaEntity>(
    Constructor: new (object: any) => T,
    id: string,
    setter: React.Dispatch<React.SetStateAction<T | undefined>>,
  ): Promise<void> {
    const entity = new Constructor({});
    const url = `/${entity.entityName}/${id}`;
    const appendToResponse = entity.appendTo?.join(",");

    tmdb
      .get(url, { params: { append_to_response: appendToResponse } })
      .then((response) => {
        setter(new Constructor(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getHighlights(max: number): Promise<Media[]> {
    const url = "trending/all/day";
    let resp: Media[] = [];

    await tmdb
      .get(url)
      .then((response) => {
        resp = response.data?.results
          ?.filter((_value: any, index: number) => {
            return index < max;
          })
          ?.map((media: any) => newMedia(media));
      })
      .catch((error) => {
        console.log(error);
      });

    return resp;
  }

  getImage(path: string): string {
    return `https://image.tmdb.org/t/p/original/${path}`;
  }
}

export interface MediaEntity {
  entityName: string;
  appendTo: string[];
}

const mediaService = new MediaService();
export default mediaService;
