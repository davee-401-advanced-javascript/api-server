'use strict';

const express = require('express');
const app = express();
const uuid = require('uuid').v4;

const timeStamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

let productsDB = {
  1: {
    'name': 'Samsung TV',
    'category': 'Electronics',
    'description': '80in TV',
    'price': 1299,
    'inStock': 5,
    'id': 1,
  },
  2: {
    'name': 'Kitchen Towels',
    'category': 'Kitchen',
    'description': 'fancy kitchen towels',
    'price': 10,
    'inStock': 20,
    'id': 2,
  },
};

let categoryDB = {
  1: {
    'id': 1,
    'name': 'Electronics',
    'description': 'electronic stuff',
  },
  2: {
    'id': 2,
    'name': 'Kitchen',
    'description': 'kitchen stuff',
  },
};

app.use(timeStamp);
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', (req, res, next) => {
  res.redirect('https://www.google.com/');
});

app.post('/api/products', create);
app.get('/api/products', getAll);
app.get('/api/products/:id', getOne);
app.put('/api/products/:id', update);
app.delete('/api/products/:id', destroy);


function create(req, res) {
  let id = uuid();
  let newProduct = {
    _id: id,
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock,
  };
  productsDB[id] = newProduct;
  res.status(201).json(newProduct);
}

function getAll(req, res) {
  let output = {
    count: Object.values(productsDB).length,
    results: Object.values(productsDB), 
  };
  res.status(200).json(output);
}

function getOne(req, res, next) {
  let id = req.params.id;
  if(!id){
    next('ID is not present within the database');
  }
  res.status(200).json(productsDB[id]);
}

function update(req, res, next) {
  let id = req.params.id;
  if(!id){
    next('ID is not present within the database');
  }
  let updatedProduct = {
    _id: id,
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock,
  };
  productsDB[id] = updatedProduct;
  res.status(200).json(updatedProduct);
}

function destroy(req, res, next) {
  let id = req.params.id;
  if(!id){
    next('ID is not present within the database');
  }
  delete productsDB[id];
  res.status(200).send({});
}

app.use('/*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log('Server is running on port', port));
  },
};