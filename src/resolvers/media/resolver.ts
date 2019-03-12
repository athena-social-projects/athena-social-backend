import config from '../../config/base';

import MovieClient from '../../utils/mediaClient/movieClient';
import MusicClient from '../../utils/mediaClient/musicClient';
import Client from '../../utils/mediaClient/client';
import sortSearch from '../../utils/sortSearch';

import { IMedia } from '../../types/custom-types';

export default function media(obj: any, args: any) {
  const { search } = args;
  const clients: Client[] = createClients();
  return compileData(clients, search)
    .then((data) => sortSearch(data, search))
    .then((res) => res);
}

const createClients = (): Client[] => {
  const clients: Client[] = [];
  clients.push(new MovieClient(config.movieConfig.rootUrl, config.movieConfig.searchPath, config.movieConfig.apiKey));
  clients.push(new MusicClient(config.musicConfig.rootUrl, config.musicConfig.searchPath, config.musicConfig.apiKey));
  return clients;
};

const compileData = (clients: Client[], search: string) => {
  let compiledData: IMedia[] = [];
  const promises: any = [];
  clients.forEach((client) => {
    promises.push(client.searchByString(search)
      .then((results: IMedia) => {
        compiledData = compiledData.concat(results);
      }));
  });
  return Promise.all(promises)
    .then(() => compiledData);
};