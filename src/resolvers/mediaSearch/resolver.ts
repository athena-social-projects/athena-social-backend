import Client from '../../utils/mediaClient/client';
import sortSearch from '../../utils/sortSearch';

import { IMediaSummary } from '../../types/mediaTypes';

export default function mediaSearch(obj: any, args: any, context: any) {
  const { search } = args;
  return compileData(context.mediaClientManager.clients , search)
    .then((data) => sortSearch(data, search))
    .then((res) => res);
}

const compileData = (clients: Client[], search: string) => {
  let compiledData: IMediaSummary[] = [];
  const promises: any = [];
  clients.forEach((client) => {
    promises.push(client.searchByString(search)
      .then((results: IMediaSummary) => {
        compiledData = compiledData.concat(results);
      }));
  });
  return Promise.all(promises)
    .then(() => compiledData);
};
