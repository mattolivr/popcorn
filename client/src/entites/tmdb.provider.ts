export interface ExternalIds {
  imdb_id?: string;
  wikidata_id?: string;
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
}

export interface WatchProvider {
  type: string;
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export function getWatchProviderType(type: string): string {
  switch (type) {
    case "buy":
      return "Comprar";
    case "rent":
      return "Alugar";
    default:
      return "Streaming";
  }
}
