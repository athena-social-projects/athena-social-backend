export interface IMediaSummary {
  id: string;
  name: string;
  type: string;
  releaseDate: string;
}

export interface IMediaDetail extends IMediaSummary {
  imageUrl: string;
}
