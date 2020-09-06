'use strict';

const schema = require('./products-schema.js');

class ProductCollection {

  create(newProduct) {
    let record = new schema(newProduct);
    return record.save();
  }

  read(id) {
    if(!id){
      return schema.find({});
    } else {
      return schema.findById(id);
    }
  }

  update(id, record) {
    return schema.findOneAndUpdate({_id: id}, {$set: record}, {new:true});
  }

  destroy(id) {
    return schema.findByIdAndRemove(id);
  }
}

module.exports = new ProductCollection();