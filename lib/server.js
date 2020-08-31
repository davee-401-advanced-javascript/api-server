'use strict';

const express = require('express');
const app = express();

const timeStamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

app.use(timeStamp);
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let productsDB = [];
let categoryDB = [];

app.get('/', (req, res) => {
  const parts = {
    query: req.query,
    params: req.params,
    body: req.body,
    time: req.timeStamp,
  };
  res.status(200).json(parts.time);
});

app.get('/products', (req, res) => {
  res.status(200).send('get products');
});

app.get('/products/:id', (req, res) => {
  res.status(200).send('get products with id');
});

app.post('/products', (req, res) => {
  res.status(200).send('post product');
});

app.put('/products/:id', (req, res) => {
  res.status(200).send('put product');
});

app.delete('/products/:id', (req, res) => {
  res.status(200).send('post product');
});




function start(port) {
  app.listen(port, () => console.log('Server is running on port', port));
}

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = {
  start: start,
  server: app,
};