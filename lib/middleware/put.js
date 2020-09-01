'use strict';

module.exports = (req, res, next) => {

  let selectedCollection = req.useThisCollection.results;

  let index = selectedCollection.findIndex( obj => obj.id === +req.params.id);

  req.targetIndex = index;
  req.body.id = +req.params.id;

  if(!req.targetIndex) {
    next('ID is not present in the database');
  } else {
    next();
  }

};