'use strict';

module.exports = (database) => {
  return (req, res, next) => {
    if(req.path.match(/products/)) {
      req.useThisCollection = database.products;
    } 
    if(req.path.match(/category/)) {
      req.useThisCollection = database.category;
    }
    console.log('req.useThisCollection:', req.useThisCollection);
    next();
  };
};