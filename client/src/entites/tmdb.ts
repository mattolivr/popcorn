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
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_avarage: number;
  };
}
