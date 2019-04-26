import config from '../../config/mediaApi';

import Client from './client';
import MovieClient from './movieClient';
import MusicClient from './musicClient';
import MediaSource from '../../config/mediaSource';

export default class MediaClientManager {
  public readonly clients: Client[];
  public readonly movieClient: MovieClient;
  public readonly musicClient: MusicClient;

  constructor() {
    this.movieClient = new MovieClient(config.movieConfig.rootUrl,
      config.movieConfig.searchPath,
      config.movieConfig.apiKey);
    this.musicClient = new MusicClient(config.musicConfig.rootUrl,
      config.musicConfig.searchPath,
      config.musicConfig.apiKey);

    this.clients = [
      this.movieClient,
      this.musicClient,
    ];
  }

  public getClient(mediaSource: string): Client {
    switch (mediaSource) {
    case MediaSource.Movie:
      return this.movieClient;
    case MediaSource.Album:
      return this.musicClient;
    }
  }
}
