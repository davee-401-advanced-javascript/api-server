'use strict';

const express = require('express');
const router = express.Router();

const productCollection = require('../models/products/products-collection.js');

router.post('/products', create);
router.get('/products', getAll);
router.get('/products/:id', getOne);
router.put('/products/:id', update);
router.delete('/products/:id', destroy);

async function create(req, res, next) {
  try {
    let newRecord = await productCollection.create(req.body);
    res.status(201).json(newRecord);
  } catch(e) {
    next(e);
  }
}

async function getAll(req, res, next) {
  try{
    let list = await productCollection.read();
    let output = {
      count: list.length,
      results: list,
    };
    res.status(200).json(output);
  } catch(e) {
    next(e);
  }
}

async function getOne(req, res, next) {
  try {
    let record = await productCollection.read(req.params.id);
    res.status(200).json(record);
  } catch(e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    let record = await productCollection.update(req.params.id, req.body);
    res.status(200).json(record);
  } catch(e) {
    next(e);
  }
}

async function destroy(req, res, next) {
  try {
    let record = await productCollection.destroy(req.params.id);
    console.log('this is record after destroy: ', record);
    res.status(200).send({});
  } catch(e) {
    next(e);
  }
}

module.exports  = router;