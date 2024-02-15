export interface Media {
  adult: boolean;
  backdrop_path: string;
  genres: [{ id: number; name: string }];
  homepage: string;
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: any[];
  production_countries: any[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
}

export interface Movie extends Media {
  release_date: string;
  runtime: number;
  title: string;
}

export interface TVShow extends Media {
  first_air_date: string;
  in_production: boolean;
  last_air_date: string;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: [
    {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
      vote_avarage: number;
    },
  ];
}

export const getTitle = (media?: Movie | TVShow): string | undefined => {
  if (media != null) {
    return "name" in media ? media.name : media.title;
  }
};

export const getDate = (
  media?: Movie | TVShow,
): { startDate?: Date; endDate?: Date } | undefined => {
  let startDate, endDate;

  if (media != null) {
    if ("release_date" in media) {
      startDate = new Date(media.release_date);
    }

    if ("first_air_date" in media) {
      startDate = new Date(media.first_air_date);
    }

    if ("last_air_date" in media && media.last_air_date != null) {
      endDate = new Date(media.last_air_date);
    }

    return { startDate, endDate };
  }
};

export const getRuntime = (
  media?: Movie | TVShow,
): { hours: number; minutes: number } | undefined => {
  if (media != null && "runtime" in media) {
    const hours = Math.floor(media.runtime / 60);
    const minutes = media.runtime % 60;

    return { hours, minutes };
  }
};
