'use strict';

const fs = require('fs');

module.exports = (req, res, next) => {
  let modelName = req.params.model;

  let file = `${process.cwd()}/lib/models/${modelName}/${modelName}-model.js`;
  console.log('file from model-finder: ', file);
  fs.access(file, fs.constants.F_OK, (err) => {
    if(err) {
      next(err.message);
    } else {
      req.model = require(file);
      next();
    }
  });

};