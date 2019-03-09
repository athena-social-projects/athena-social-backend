import request from 'request-promise-native';

import IMovie from '../../entities/movie';
import IMedia from '../../entities/media';
import Client from './client';

export default class MovieClient extends Client{
  private apiKey: string;

  constructor(uri: string, searchPath: string, apiKey: string) {
    super(uri, searchPath);
    this.apiKey = apiKey;
    this.type = 'Movie';
  }

  // public getById(): any;

  public searchByString(search: string): Promise<void | IMedia[]> {
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
    const newData: IMedia[] = [];
    shortData.forEach((movie: IMovie) => {
      newData.push({
        id: movie.id,
        name: movie.title,
        type: this.type,
      });
    });
    return newData;
  }
}
