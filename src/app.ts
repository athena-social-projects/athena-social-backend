import express = require('express');
import morgan = require('morgan');
import { importSchema } from 'graphql-import';
import { ApolloServer, gql } from 'apollo-server-express';
import * as path from 'path';

import ping from './resolvers/ping';

const typeDefs = importSchema(path.join(__dirname, '../schema.graphql'));

const resolvers = {
  Query: {
    ping,
  },
};

export class App {
  private app = express();
  private port = process.env.PORT || 3000;

  constructor() {
    this.initRoutes();
    this.initMiddleware();
    this.init();
    this.createApolloServer();
  }

  private initRoutes(): void {
    // Add Express routes here
  }

  private initMiddleware(): void {
    this.app.use(morgan('tiny'));
  }

  private createApolloServer(): void {
    const server = new ApolloServer({ typeDefs: gql(typeDefs), resolvers });
    server.applyMiddleware({ app: this.app });
    console.log(`Server listening on: http://localhost:${this.port}${server.graphqlPath}`);
  }

  private init(): void {
    this.app.listen(this.port);
  }
}
