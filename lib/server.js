'use strict';

const express = require('express');
const app = express();

// Middleware
const timeStamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

// Routes
const apiRoute = require('./routes/api.js');

app.use(timeStamp);
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res, next) => {
  res.redirect('https://www.google.com/');
});

app.use('/api/v1', apiRoute);

app.use('/*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log('Server is running on port', port));
  },
};