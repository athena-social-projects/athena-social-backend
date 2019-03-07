const express = require('express');
const morgan = require('morgan');

const ping = require('./controllers/ping');

const app = express();
const port = process.env.PORT || 3000;

const initRoutes = () => {
  app.use(ping);
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
