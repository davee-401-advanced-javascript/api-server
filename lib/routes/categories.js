'use strict';

const express = require('express');
const router = express.Router();

const categoryCollection = require('../models/categories/categories-collection.js');

router.post('/categories', create);
router.get('/categories', getAll);
router.get('/categories/:id', getOne);
router.put('/categories/:id', update);
router.delete('/categories/:id', destroy);

async function create(req, res, next) {
  try {
    let newRecord = await categoryCollection.create(req.body);
    res.status(201).json(newRecord);
  } catch(e) {
    next(e);
  }
}

async function getAll(req, res, next) {
  try{
    let list = await categoryCollection.read();
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
    let record = await categoryCollection.read(req.params.id);
    res.status(200).json(record);
  } catch(e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    let record = await categoryCollection.update(req.params.id, req.body);
    res.status(200).json(record);
  } catch(e) {
    next(e);
  }
}

async function destroy(req, res, next) {
  try {
    let record = await categoryCollection.destroy(req.params.id);
    console.log('this is record after destroy: ', record);
    res.status(200).send({});
  } catch(e) {
    next(e);
  }
}

module.exports  = router;