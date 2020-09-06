'use strict';

const mongoose = require('mongoose');
const Model = require('../mongo-collection.js');

const productDefinition = mongoose.Schema({
  name: {type: String, required: true},
  category: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  inStock: {type: Number, required: true},
});

const productSchema = mongoose.model('product', productDefinition);

module.exports = new Model(productSchema);