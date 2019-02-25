import {Session} from "../types/graphql-utils";
import {UnauthorizedError} from "./errors";

export const verifyLoggedIn = (session: Session) => {
    if (!session || !session.userId) {
        return new UnauthorizedError();
    }
};
