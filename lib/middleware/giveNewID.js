'use strict';

module.exports = (req, res, next) => {
  
  let selectedCollection = req.useThisCollection.results;
  let newID = selectedCollection[selectedCollection.length-1].id + 1;
  req.body.id = newID;
  next();
};
