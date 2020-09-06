'use strict';

const uuid = require('uuid').v4;
const express = require('express');
const router = express.Router();

let categoriesDB = {
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

router.post('/categories', create);
router.get('/categories', getAll);
router.get('/categories/:id', getOne);
router.put('/categories/:id', update);
router.delete('/categories/:id', destroy);

function create(req, res) {
  let id = uuid();
  let newCategory = {
    _id: id,
    name: req.body.name,
    description: req.body.description,
  };
  categoriesDB[id] = newCategory;
  res.status(201).json(newCategory);
}

function getAll(req, res) {
  let output = {
    count: Object.values(categoriesDB).length,
    results: Object.values(categoriesDB), 
  };
  res.status(200).json(output);
}

function getOne(req, res, next) {
  let id = req.params.id;
  if(!id){
    next('ID is not present within the database');
  }
  res.status(200).json(categoriesDB[id]);
}

function update(req, res, next) {
  let id = req.params.id;
  if(!id){
    next('ID is not present within the database');
  }
  let updatedProduct = {
    _id: id,
    name: req.body.name,
    description: req.body.description,
  };
  categoriesDB[id] = updatedProduct;
  res.status(200).json(updatedProduct);
}

function destroy(req, res, next) {
  let id = req.params.id;
  if(!id){
    next('ID is not present within the database');
  }
  delete categoriesDB[id];
  res.status(200).send({});
}

module.exports  = router;