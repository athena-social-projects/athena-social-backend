const express = require('express');

// Middleware
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Routes
const ping = require('./controllers/ping');
const userRoutes = require('./controllers/user');


const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/apollo_local_db');


const initRoutes = () => {
  app.use('/user', userRoutes);
  app.use(ping);
};

const initMiddleware = () => {
  app.use(morgan('tiny'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
};

const init = () => {
  initMiddleware();
  initRoutes();
  console.log(`Server listening on port: ${port}`);
  app.listen(port);
};

init();
