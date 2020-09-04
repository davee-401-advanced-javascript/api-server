'use strict';

const uuid = require('uuid').v4;
const express = require('express');
const router = express.Router();

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

router.post('/products', create);
router.get('/products', getAll);
router.get('/products/:id', getOne);
router.put('/products/:id', update);
router.delete('/products/:id', destroy);

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

module.exports  = router;