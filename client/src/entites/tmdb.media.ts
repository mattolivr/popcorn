import { type Entity } from "../adapters/tmdb";
import { Cast, Crew } from "./tmdb.person";
import { getWatchProviderType, type WatchProvider } from "./tmdb.provider";

export abstract class Media implements Entity {
  id: number;
  externalIds: {
    imdbId?: string;
    facebookId?: string;
    instagramId?: string;
    twitterId?: string;
  };

  poster_path: string;
  backdrop_path: string;

  overview: string;
  tagline: string;
  status: string;
  homepage: string;
  adult: boolean;

  genres: [{ id: number; name: string }];
  credits: { cast?: Cast[]; crew?: Crew[] };
  production_companies: any[];
  production_countries: any[];

  popularity: number;
  vote_average: number;
  vote_count: number;

  providers: WatchProvider[] = [];
  providersLink?: string;

  entityName: string;
  appendTo: string[];

  constructor(object: any, entityName: string, appendTo: string[]) {
    this.id = object.id;
    this.entityName = entityName;
    this.appendTo = appendTo;

    this.externalIds = {
      imdbId: object.external_ids?.imdb_id,
      facebookId: object.external_ids?.facebook_id,
      instagramId: object.external_ids?.instagram_id,
      twitterId: object.external_ids?.twitter_id,
    };

    this.poster_path = object.poster_path;
    this.backdrop_path = object.backdrop_path;

    this.overview = object.overview;
    this.tagline = object.tagline;
    this.status = object.status;
    this.homepage = object.homepage;
    this.adult = object.adult;

    this.genres = object.genres;
    this.credits = {
      cast: object.credits?.cast?.map((cast: any) => new Cast(cast)),
      crew: object.credits?.crew?.map((crew: any) => new Crew(crew)),
    };
    this.production_companies = object.production_companies;
    this.production_countries = object.production_countries;

    this.popularity = object.popularity;
    this.vote_average = object.vote_average;
    this.vote_count = object.vote_count;

    const providers = object["watch/providers"]?.results?.BR;
    if (providers) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Object.entries(providers).forEach((entry) => {
        if (Array.isArray(entry[1])) {
          entry[1].forEach((provider) => {
            this.providers.push({
              type: getWatchProviderType(entry[0]),
              provider_id: provider.provider_id,
              provider_name: provider.provider_name,
              logo_path: provider.logo_path,
              display_priority: provider.display_priority,
            });
          });
        }
      });
      this.providersLink = providers?.link;
    }
  }

  abstract isMovie(): boolean;
  abstract getTitle(): string | undefined;
  abstract getDate(): { start?: string; end?: string };
  abstract getYear(): string | undefined;
  abstract getRuntime(): { hours?: number; minutes?: number };

  getVotePercentage(): number {
    if (!this.vote_average) {
      return 0;
    }
    return Math.trunc(this.vote_average * 10);
  }

  getInfos(): string[] {
    const infos: Array<string | undefined> = [this.getDate().start, this.getDate().end];

    if (this.getRuntime().hours != null) {
      infos.push(`${this.getRuntime().hours}h ${this.getRuntime().minutes}min`);
    }

    const dividedInfos: string[] = [];
    infos.forEach((info, index, array) => {
      if (info) {
        dividedInfos.push(info);
        if (index < array.length - 1) {
          dividedInfos.push("·");
        }
      }
    });

    return dividedInfos;
  }
}

export class Movie extends Media {
  title?: string;
  runtime?: number;
  release_date?: string;

  constructor(object: any) {
    super(object, "movie", ["credits", "external_ids", "watch/providers"]);

    this.title = object.title;
    this.runtime = object.runtime;
    this.release_date = object.release_date;
  }

  isMovie(): boolean {
    return true;
  }

  getTitle(): string | undefined {
    return this.title;
  }

  getDate(): { start?: string; end?: string } {
    return {
      start: this.release_date && new Date(this.release_date).toLocaleDateString(),
    };
  }

  getYear(): string | undefined {
    return this.release_date && new Date(this.release_date).getFullYear().toString();
  }

  getRuntime(): { hours?: number; minutes?: number } {
    const hours = this.runtime && Math.floor(this.runtime / 60);
    const minutes = this.runtime && this.runtime % 60;

    return { hours, minutes };
  }
}

export class TVShow extends Media {
  name?: string;

  first_air_date?: string;
  last_air_date?: string;

  in_production?: boolean;
  number_of_episodes?: number;
  number_of_seasons?: number;

  constructor(object: any) {
    super(object, "tv", ["credits", "external_ids", "watch/providers"]);

    this.name = object.name;

    this.first_air_date = object.first_air_date;
    this.last_air_date = object.last_air_date;

    this.in_production = object.in_production;
    this.number_of_episodes = object.number_of_episodes;
    this.number_of_seasons = object.number_of_seasons;
  }

  isMovie(): boolean {
    return false;
  }

  getTitle(): string | undefined {
    return this.name;
  }

  getDate(): { start?: string; end?: string } {
    return {
      start: this.first_air_date && new Date(this.first_air_date).toLocaleDateString(),
      end: this.last_air_date && new Date(this.last_air_date).toLocaleDateString(),
    };
  }

  getYear(): string | undefined {
    return this.first_air_date && new Date(this.first_air_date).getFullYear().toString();
  }

  getRuntime(): { hours?: number; minutes?: number } {
    return {};
  }
}

export function newMedia(object: any): Movie | TVShow {
  if ("title" in object) {
    return new Movie(object);
  }
  return new TVShow(object);
}
