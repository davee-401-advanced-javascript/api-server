'use strict';

const express = require('express');
const app = express();

const logger = require('./middleware/logger.js');
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

app.use(logger);

app.get('/', (req, res) => {
  const parts = {
    query: req.query,
    params: req.params,
    body: req.body,
    stuff: req.stuff,
  };
  res.status(200).json(parts);
});


// app.get('/categories/id:')


function start(port) {
  app.listen(port, () => console.log('Server is running on port', port));
}

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = {
  start: start,
  server: app,
};