import request from 'request-promise-native';

import config from '../../config/mediaApi';
import { IMediaSummary, IMediaDetail } from '../../types/mediaTypes';
import IAlbum from '../../types/album';
import Client from './client';
import logger from '../logger';
import mediaType from '../../config/mediaSource';
import redis from '../redis';

export default class MusicClient extends Client {
  private apiKey: string;
  private tokenKey = 'spotifyToken';

  constructor(uri: string, searchPath: string, apiKey: string) {
    super(uri, searchPath);
    this.apiKey = apiKey;
  }

  public getById(id: string): any {
    return this.getToken()
      .then((accessToken) =>
        request.get({
          url: `${this.uri}${config.musicConfig.idSearchPath}/${id}`,
          qs: {
            api_key: this.apiKey,
          },
          headers: {
            Authorization: accessToken,
          },
          json: true,
        }))
        .then((res) => this.populateMediaDetail(res))
        .catch((err) => { throw err; });
  }

  public searchByString(search: string): Promise<void | IMediaSummary[]> {
    return this.getToken()
      .then((accessToken) =>
        request.get({
          url: `${this.uri}${this.searchPath}`,
          qs: {
            type: 'album',
            q: search,
          },
          headers: {
            Authorization: accessToken,
          },
          json: true,
        }))
        .then((res) => this.truncateData(res.albums.items))
        .catch((err) => { logger.error('Error getting music:', err); });
  }

  public populateMediaDetail(album: IAlbum): IMediaDetail {
    return {
      id: album.id,
      title: album.name,
      type: mediaType.Album,
      releaseDate: album.release_date,
      imageUrl: album.images[0] ? album.images[0].url : null,
    };
  }

  private truncateData(results: IAlbum[]): IMediaSummary[] {
    const shortData = results.splice(0, 10);
    const newData: IMediaSummary[] = [];
    shortData.forEach((album: IAlbum) => {
      newData.push({
        id: album.id,
        title: album.name,
        type: mediaType.Album,
        releaseDate: album.release_date,
      });
    });
    return newData;
  }

  private authenticate() {
    return request.post({
      uri: `${config.musicConfig.authUrl}${config.musicConfig.authPath}`,
      headers: {
        'Authorization': this.apiKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
      json: true,
    })
      .then((authentication) => authentication);
  }

  private getToken() {
    return redis.get(this.tokenKey)
      .then((res) => {
        if (res === null) {
          return this.authenticate()
            .then((authResponse) => {
              const timeLimit = authResponse.expires_in - 30;
              const token = `${authResponse.token_type} ${authResponse.access_token}`;
              return redis.setex(this.tokenKey, timeLimit, token)
                .then(() => token);
            });
        } else {
          return res;
        }
      })
      .catch((err) => {
        logger.error('Could not Auth spotify api', err);
      });
  }
}
