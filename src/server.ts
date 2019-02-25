process.on('unhandledRejection', (reason, p) => {
    return [{
       message: reason.name
    }];
});

import { app } from "./app";

app();
