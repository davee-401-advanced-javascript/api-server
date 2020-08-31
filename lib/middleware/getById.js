'use strict';

module.exports = (req, res, next) => {
  req.output = req.useThisCollection.results.find(obj => obj.id === +req.params.id);
  console.log('req.output:', req.output);
  if (!req.output) {
    next('ID is not present in the database');
  } else {
    next();
  }
};
