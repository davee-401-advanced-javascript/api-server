'use strict';

module.exports = (req, res, next) => {

  let selectedCollection = req.useThisCollection.results;
  let index = selectedCollection.findIndex( obj => obj.id === +req.params.id);

  if(typeof index !== 'number') {
    next('ID is not present in Database');
  } else {
    req.targetIndex = index;
    next();
  }
};