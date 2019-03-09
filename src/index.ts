import { App } from './app';
import { importSchema } from 'graphql-import';
import ping from './resolvers/ping';
import * as path from 'path';

const resolvers = {
  Query: {
    ping,
  },
};

const typeDefs = importSchema(path.join(__dirname, '../schema.graphql'));

const Server = new App(resolvers, typeDefs);
Server.start();
