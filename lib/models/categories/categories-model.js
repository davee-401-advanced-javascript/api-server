'use strict';

const mongoose = require('mongoose');
const Model = require('../mongo-collection.js');

const categoriesDefinition = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
});

const categorySchema = mongoose.model('category', categoriesDefinition);

module.exports = new Model(categorySchema);