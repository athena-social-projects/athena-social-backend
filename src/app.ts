import express = require('express');
import morgan = require('morgan');
import { ApolloServer, gql, IResolvers } from 'apollo-server-express';

export class App {
  private app = express();
  private port = process.env.PORT || 3000;

  constructor(resolvers: IResolvers, typeDefs: string) {
    this.initRoutes();
    this.initMiddleware();
    this.createApolloServer(resolvers, typeDefs);
  }

  public start(): void {
    this.app.listen(this.port);
  }

  private initRoutes(): void {
    // Add Express routes here
  }

  private initMiddleware(): void {
    this.app.use(morgan('tiny'));
  }

  private createApolloServer(resolvers: IResolvers, typeDefs: string): void {
    const server = new ApolloServer({ typeDefs: gql(typeDefs), resolvers });
    server.applyMiddleware({ app: this.app });
    console.log(`Server listening on: http://localhost:${this.port}${server.graphqlPath}`);
  }
}
