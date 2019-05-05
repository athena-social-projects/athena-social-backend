export interface IMediaSummary {
  id: string;
  title: string;
  type: string;
  releaseDate: string;
}

export interface IMediaDetail extends IMediaSummary {
  imageUrl: string;
}

export enum mediaType {
  MOVIE = 'MOVIE',
  MUSIC = 'MUSIC',
}
