import request from 'request-promise-native';

import config from '../../config/base';
import { IMedia, IAlbum } from '../../types/mediaTypes';
import Client from './client';

export default class MusicClient extends Client {
  private apiKey: string;
  // private accessToken: string;

  constructor(uri: string, searchPath: string, apiKey: string) {
    super(uri, searchPath);
    this.apiKey = apiKey;
  }

  // public getById(): any;

  public searchByString(search: string): Promise<void | IMedia[]> {
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

  private truncateData(results: IAlbum[]): IMedia[] {
    const shortData = results.splice(0, 10);
    const newData: IMedia[] = [];
    shortData.forEach((album: IAlbum) => {
      newData.push({
        id: album.id,
        name: album.name,
        type: 'Album',
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
