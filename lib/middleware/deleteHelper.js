'use strict';

module.exports = (req, res, next) => {

  let selectedCollection = req.useThisCollection.results;
  let index = selectedCollection.findIndex( obj => obj.id === +req.params.id);

  req.targetIndex = index;
  next();
};