import request from 'request-promise-native';

import config from '../../config/mediaApi';

import { IMediaSummary, IMediaDetail } from '../../types/mediaTypes';
import IMovie from '../../types/movie';
import Client from './client';

export default class MovieClient extends Client {
  private apiKey: string;

  constructor(uri: string, searchPath: string, apiKey: string) {
    super(uri, searchPath);
    this.apiKey = apiKey;
    this.type = 'Movie';
  }

  public getById(id: string): any {

    return request.get({
      url: `${this.uri}${config.movieConfig.idSearchPath}/${id}`,
      qs: {
        api_key: this.apiKey,
      },
      json: true,
    })
      .then((res) => this.populateMediaDetail(res))
      .catch((err) => { throw err; });
  }

  public searchByString(search: string): Promise<void | IMediaSummary[]> {
    return request.get({
      url: `${this.uri}${this.searchPath}`,
      qs: {
        api_key: this.apiKey,
        query: search,
      },
      json: true,
    })
      .then((res) => this.truncateData(res.results))
      .catch((err) => { throw err; });
  }

  private truncateData(results: IMovie[]) {
    const shortData = results.splice(0, 10);
    const newData: IMediaSummary[] = [];
    shortData.forEach((movie: IMovie) => {
      newData.push({
        id: movie.id.toString(),
        name: movie.title,
        type: this.type,
        releaseDate: movie.release_date,
      });
    });
    return newData;
  }

  private populateMediaDetail(movie: IMovie): IMediaDetail {
    return {
      id: movie.id.toString(),
      name: movie.title,
      type: this.type,
      releaseDate: movie.release_date,
      imageUrl: movie.poster_path ? config.movieConfig.baseImageUrl + movie.poster_path : null,
    };
  }
}
