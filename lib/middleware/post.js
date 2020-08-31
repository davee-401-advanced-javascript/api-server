'use strict';

module.exports = (req, res, next) => {
  
  let resultArray = req.useThisCollection.results;
  let newID = resultArray[resultArray.length-1].id + 1;
  req.body.id = newID;
  next();
};
