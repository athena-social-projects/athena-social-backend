import {App} from './app';
import {importSchema} from 'graphql-import';
import * as path from 'path';
import {resolvers} from './resolvers';

const typeDefs = importSchema(path.join(__dirname, '../schema.graphql'));

const Server = new App(resolvers, typeDefs);

Server.start();
