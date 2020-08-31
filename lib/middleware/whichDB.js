'use strict';

module.exports = (database) => {
  return (req, res, next) => {
    if(req.path.match(/products/)) {
      req.useThisCollection = database.products;
      req.collection = 'products';
    } 
    if(req.path.match(/category/)) {
      req.useThisCollection = database.category;
      req.collection = 'category';
    }
    next();
  };
};