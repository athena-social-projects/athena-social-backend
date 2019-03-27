import { expect } from 'chai';
import nock from 'nock';

import config from '../../src/config/base';
import MovieClient from '../../src/utils/mediaClient/movieClient';
import { movieStringReply } from '../mock/mediaMocks';
import { IMedia } from '../../src/types/mediaTypes';

describe('MovieClient Tests', () => {
  it('Can create without thowing error', () => {
    expect(
      new MovieClient(config.movieConfig.rootUrl, config.movieConfig.searchPath, config.movieConfig.apiKey)
      ).not.to.throw;
  }); 

  it('Can search via string', () => {
    const movieDb = nock(config.movieConfig.rootUrl)
      .get(config.movieConfig.searchPath)
      .query(true)
      .reply(200, movieStringReply);
    const movieClient = new MovieClient(
      config.movieConfig.rootUrl,
      config.movieConfig.searchPath,
      config.movieConfig.apiKey);
    return movieClient.searchByString('test1')
      .then((result: IMedia[]) => {
        result.forEach(media => {
          expect(media.id).to.be.exist;
          expect(media.name).to.be.exist;
          expect(media.type).to.be.exist;
          movieDb.done();
        });
      });
  });

  it('Search via string will thro error on 500', () => {
    const movieDb = nock(config.movieConfig.rootUrl)
      .get(config.movieConfig.searchPath)
      .query(true)
      .reply(500, 'Error Message');
    const movieClient = new MovieClient(config.movieConfig.rootUrl,
      config.movieConfig.searchPath,
      config.movieConfig.apiKey);
    return movieClient.searchByString('test1')
      .catch((err: any) => {
        expect(err.statusCode).to.equal(500);
        movieDb.done();
      });
  });
});
