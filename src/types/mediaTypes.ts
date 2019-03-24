export interface IMediaSummary {
  id: string;
  name: string;
  type: string;
}

export interface IMediaDetail {
  id: string;
  name: string;
  type: string;
  release_date: string;
}

export interface IMovie {
  vote_count: number;
  id: number;
  video: boolean;
  vote_average: number;
  title: string;
  popularity: number;
  poster_path: string;
  original_language: string;
  original_title: string;
  backdrop_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
}

export interface IAlbum {
  spotify: string;
  href: string;
  id: string;
  title: string;
  name: string;
  release_date: string;
  total_tracks: number;
  uri: string;
  album_type: string;
  type: string;
}
