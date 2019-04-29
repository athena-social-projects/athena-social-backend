import config from '../config/mediaApi';
import Redis from 'ioredis';
import logger from './logger';

const redis = new Redis(config.redisConfig.port, config.redisConfig.rootUrl);

redis.on('connect', (err, replies) => {
  if (err) {
    logger.info('Error on Redis connection:' + err);
  } else {
    logger.info('Connected to Redis');
  }
});

redis.on('error', (err, replies) => {
  logger.info('Error on Redis connection:' + err);
});

export default redis;
