import request from 'request-promise-native';

import config from '../../config/mediaApi';
import { IMediaSummary, IMediaDetail } from '../../types/mediaTypes';
import IAlbum from '../../types/album';
import Client from './client';
import mediaType from '../../config/mediaSource';

export default class MusicClient extends Client {
  private apiKey: string;
  // private accessToken: string;

  constructor(uri: string, searchPath: string, apiKey: string) {
    super(uri, searchPath);
    this.apiKey = apiKey;
  }

  public getById(id: string): any {
    return this.authenticate()
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
    return this.authenticate()
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
        .catch((err) => { console.log(err); });
  }

  public populateMediaDetail(album: IAlbum): IMediaDetail {
    return {
      id: album.id,
      name: album.name,
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
        name: album.name,
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
      .then((res) => {
        return `${res.token_type} ${res.access_token}`;
      });
  }
}
