export default interface IAlbum {
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
  images: [Image];
}

interface Image {
  height: number;
  width: number;
  url: string;
}
