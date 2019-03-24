import config from '../config/base';

import Client from './mediaClient/client';
import MovieClient from './mediaClient/movieClient';
import MusicClient from './mediaClient/musicClient';
import mediaSource from './mediaType';

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

    public getClient(mediaType: string): Client {
        switch (mediaType) {
            case mediaSource.Movie:
                return this.movieClient;
            case mediaSource.Album:
                return this.musicClient;
        }
    }
}
