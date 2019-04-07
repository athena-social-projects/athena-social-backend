import { expect } from 'chai';
import nock from 'nock';

import config from '../../../src/config/mediaApi';
import MusicClient from '../../../src/utils/mediaClient/musicClient';
import { musicStringReply } from '../mock/mediaMocks';
import { IMediaSummary } from '../../../src/types/mediaTypes';

describe('MovieClient Tests', () => {
  it('Can create without thowing error', () => {
    expect(
      new MusicClient(config.musicConfig.rootUrl,
        config.musicConfig.searchPath,
        config.musicConfig.apiKey)
      ).not.to.throw;
  }); 

  it('Can search via string', () => {
    const movieDb = nock(config.musicConfig.rootUrl)
      .get(config.musicConfig.searchPath)
      .query(true)
      .reply(200, musicStringReply);
    const musicClient = new MusicClient(config.musicConfig.rootUrl,
      config.musicConfig.searchPath,
      config.musicConfig.apiKey);
    return musicClient.searchByString('test1')
      .then((result: IMediaSummary[]) => {
        result.forEach(media => {
          expect(media.id).to.be.exist;
          expect(media.name).to.be.exist;
          expect(media.type).to.be.exist;
          movieDb.done();
        });
      });
  });

  it('Search via string will thro error on 500', () => {
    const movieDb = nock(config.musicConfig.rootUrl)
      .get(config.musicConfig.searchPath)
      .query(true)
      .reply(500, 'Error Message');
    const musicClient = new MusicClient(config.musicConfig.rootUrl,
      config.musicConfig.searchPath,
      config.musicConfig.apiKey);
    return musicClient.searchByString('test1')
      .catch((err: any) => {
        expect(err.statusCode).to.equal(500);
        movieDb.done();
      });
  });
});
