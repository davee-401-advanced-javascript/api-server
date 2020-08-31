'use strict';

const express = require('express');
const app = express();

const timeStamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');
const whichDB = require('./middleware/whichDB.js');
const getById = require('./middleware/getById.js');
const post = require('./middleware/post.js');
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

let myDatabase = {
  category: {
    count: 2,
    results: [    {
      'id': 1,
      'name': 'Electronics',
      'description': 'electronic stuff',
    },
    {
      'id': 2,
      'name': 'Kitchen',
      'description': 'kitchen stuff',
    }],
  },

  products: {
    count: 2,
    results: [
      {
        'name': 'Samsung TV',
        'category': 'Electronics',
        'description': '80in TV',
        'price': 1299,
        'inStock': 5,
        'id': 1,
      },
      {
        'name': 'Kitchen Towels',
        'category': 'Kitchen',
        'description': 'fancy kitchen towels',
        'price': 10,
        'inStock': 20,
        'id': 2,
      },
    ],
  },
};

app.use(timeStamp);
app.use(logger);
app.use(whichDB(myDatabase));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', (req, res) => {
  const parts = {
    query: req.query,
    params: req.params,
    body: req.body,
    time: req.requestTime,
  };
  console.log('parts: ', parts);
  res.status(200).json(parts);
});

app.get('/products', (req, res) => {
  req.output = req.useThisCollection.results;
  res.status(200).send(req.output);
});

app.get('/products/:id', getById, (req, res) => {
  res.status(200).send(req.output);
});

app.post('/products', post, (req, res) => {
  myDatabase[req.collection].results.push(req.body);
  myDatabase[req.collection].count+=1;
  console.log('Posted to Database: ', myDatabase);
  res.status(200).send(req.body);
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