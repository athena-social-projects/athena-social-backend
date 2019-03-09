import config from '../config/base';
import MovieClient from '../lib/mediaClient/movieClient';
import Client from '../lib/mediaClient/client';
import IMedia from '../entities/media';

export default function media(obj: any, args: any) {
  const { search } = args;
  const clients: Client[] = createClients();
  return compileData(clients, search)
    .then((res) => {
      return res;
    });
}

const createClients = (): Client[] => {
  const clients: Client[] = [];
  clients.push(new MovieClient(config.movieConfig.rootUrl, config.movieConfig.searchPath, config.movieConfig.apiKey));
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
