export default {
  movieConfig: {
    rootUrl: 'https://api.themoviedb.org/3',
    searchPath: '/search/movie',
    idSearchPath: '/movie',
    apiKey: process.env.MOVIE_API_KEY,
    baseImageUrl: 'http://image.tmdb.org/t/p/original',
  },
  musicConfig: {
    rootUrl: 'https://api.spotify.com',
    searchPath: '/v1/search',
    idSearchPath: '/v1/albums',
    apiKey: process.env.MUSIC_API_KEY,
    authUrl: 'https://accounts.spotify.com',
    authPath: '/api/token',
  },
  redisConfig: {
    port: 6379,
    rootUrl: '127.0.0.1',
  },
};
