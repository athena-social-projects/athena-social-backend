import "reflect-metadata";
import "dotenv/config";
import {GraphQLServer} from "graphql-yoga";
import {createConnection} from "typeorm";
import * as session from "express-session";
import * as ConnectRedis from "connect-redis";

import {redis} from "./redis";
import {genSchema} from "./utils/generateSchema";
import {confirmEmail} from "./routes/confirmEmail";
import {Context} from "./types/graphql-utils";

const RedisStore = ConnectRedis(session);

export const app = async () => {

    const server = new GraphQLServer({
        schema: genSchema(),
        context: ({request}) => ({
            redis,
            url: request.protocol + "://" + request.get("host"),
            session: request.session
        } as Context)
    });

    server.express.use(
        session({
            store: new RedisStore({
                client: redis as any
            }),
            name: "qid",
            secret: String(process.env.SESSION_SECRET),
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
            }
        })
    );

    const cors = {
        credentials: true,
        origin: String(process.env.FRONT_END_HOST)
    };

    server.express.get("/confirm/:id", confirmEmail);

    await createConnection();
    const gql = await server.start({
        cors,
        port: process.env.NODE_ENV === "test" ? 0 : 4000
    });
    console.log("Server is running on localhost:4000");
    redis.on("error", (err) => {
        console.log(err);
    });

    return gql;
};
