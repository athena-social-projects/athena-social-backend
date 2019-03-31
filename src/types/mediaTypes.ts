export interface IMediaSummary {
  id: string;
  name: string;
  type: string;
  release_date: string;
}

export interface IMediaDetail extends IMediaSummary {
  image_url: string;
}
