export interface Post {
  id: string;
  user_id?: string;
  media?: string[];
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
}
