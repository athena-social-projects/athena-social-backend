import express = require('express');
import morgan = require('morgan');

import { pingController } from './controllers/ping';

const app = express();
const port = process.env.PORT || 3000;

const initRoutes = () => {
  app.use('/ping', pingController);
};

const initMiddleware = () => {
  app.use(morgan('tiny'));
};

const init = () => {
  console.log(`Server listening on port: ${port}`);
  app.listen(port);

  initRoutes();
  initMiddleware();
};

init();
