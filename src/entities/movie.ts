export default interface IMovie {
  vote_count: Int16Array;
  id: Int16Array;
  video: boolean;
  vote_average: Int16Array;
  title: string;
  popularity: Int16Array;
  poster_path: string;
  original_language: string;
  original_title: string;
  backdrop_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
}
