'use strict';

module.exports = (req, res, next) => {
  let model = req.params.model;
  switch(model) {
  case 'products': {
    console.log('product triggered');
    let productModel = require('../models/products/products-model.js');
    req.model = productModel;
    break;
  }
  case 'categories': {
    console.log('category triggered');
    let categoryModel = require('../models/categories/categories-model.js');
    req.model = categoryModel;
    break;
  }
  default: 
    next('NOT a Valid Route');
  }
  next();
};