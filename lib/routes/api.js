'use strict';

const express = require('express');
const router = express.Router();

const modelFinder = require('../middleware/model-finder.js');
router.param('model', modelFinder);

router.post('/:model', create);
router.get('/:model', getAll);
router.get('/:model/:id', getOne);
router.put('/:model/:id', update);
router.delete('/:model/:id', destroy);

async function create(req, res, next) {
  try {
    let newRecord = await req.model.create(req.body);
    res.status(201).json(newRecord);
  } catch(e) {
    next(e);
  }
}

async function getAll(req, res, next) {
  try{
    let list = await req.model.read();
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
    let record = await req.model.read(req.params.id);
    res.status(200).json(record);
  } catch(e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    let record = await req.model.update(req.params.id, req.body);
    res.status(200).json(record);
  } catch(e) {
    next(e);
  }
}

async function destroy(req, res, next) {
  try {
    let record = await req.model.destroy(req.params.id);
    console.log('this is record after destroy: ', record);
    res.status(200).send({});
  } catch(e) {
    next(e);
  }
}

module.exports  = router;