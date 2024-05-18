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
  credits?: { cast: Cast[]; crew: Crew[] };
  external_ids?: ExternalIds;
  "watch/providers": {
    results: {
      BR: Providers;
    };
  };
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

export interface Cast {
  id: number;
  known_for_department: string;
  name: string;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew {
  id: number;
  known_for_department: string;
  name: string;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface ExternalIds {
  imdb_id?: string;
  wikidata_id?: string;
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
}

export interface Provider {
  type: string[];
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

interface Providers {
  link: string;
  buy: Provider[];
  flatrate: Provider[];
  rent: Provider[];
}

export const isMovie = (media?: Movie | TVShow): media is Movie => {
  if (media != null && "title" in media) {
    return true;
  }
  return false;
};

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

export const getVotePercentage = (media: Media | undefined): number => {
  return Math.trunc(media != null ? media.vote_average * 10 : 0);
};

export const getAllWatchProviders = (media?: Movie | TVShow): Provider[] => {
  const ret: Provider[] = [];
  const providers = media?.["watch/providers"].results.BR;

  if (providers == null) {
    return ret;
  }

  const { buy, flatrate, rent } = providers;

  const addProvidersWithType = (providers: Provider[], type: string): void => {
    if (providers == null || providers.length === 0) {
      return;
    }

    providers.forEach((provider) => {
      const existingProvider = ret.find(
        (p) => p.provider_id === provider.provider_id,
      );
      if (existingProvider != null) {
        existingProvider.type.push(type);
      } else {
        const newProvider: Provider = { ...provider, type: [type] };
        ret.push(newProvider);
      }
    });
  };

  addProvidersWithType(buy, "buy");
  addProvidersWithType(flatrate, "flatrate");
  addProvidersWithType(rent, "rent");

  return ret;
};
