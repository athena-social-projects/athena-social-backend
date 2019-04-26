import express = require('express');
import morgan = require('morgan');
import {ApolloServer, gql, IResolvers} from 'apollo-server-express';
import {createConnection} from 'typeorm';
import redis from './utils/redis';
import session from 'express-session';
import ConnectRedis from 'connect-redis';
import {schemaDirectives} from './directives';
import logger from './utils/logger';
import MediaClientManager from './utils/mediaClient/mediaClientManager';

const RedisStore = ConnectRedis(session);

const corsOptions = {
  origin: 'http://localhost:4000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export class App {
  private app = express();
  private port = process.env.PORT || 3000;
  private server: any;

  constructor(resolvers: IResolvers, typeDefs: string) {
    this.initRoutes();
    this.initMiddleware();
    this.createApolloServer(resolvers, typeDefs);
  }

  public async start(): Promise<any> {
    // Create Postgres connection to our database
    await createConnection();
    this.app.listen(this.port);
    logger.info(`Server listening on: http://localhost:${this.port}${this.server.graphqlPath}`);
  }

  private initRoutes(): void {
    // Add Express routes here
  }

  private initMiddleware(): void {
    this.app.use(morgan('tiny'));
    this.app.use(session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: 'qid',
      secret: 'super-secure-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days,
      },
    }));
  }

  private createApolloServer(resolvers: IResolvers, typeDefs: string): void {
    this.server = new ApolloServer({
      typeDefs: gql(typeDefs),
      resolvers,
      schemaDirectives,
      // TODO: Figure out interface for context obj
      context: ({req}) => ({
        redis,
        req,
        mediaClientManager: new MediaClientManager(),
      } as any),
    });
    this.server.applyMiddleware({app: this.app, cors: corsOptions});
  }
}
