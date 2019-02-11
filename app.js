const express = require('express');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

const init = () => {
  console.log(`Server listening on port: ${port}`);
  app.listen(port);
  app.use(morgan('tiny'));
};

init();
