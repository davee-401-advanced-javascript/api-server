'use strict';

const schema = require('./categories-schema.js');

class CategoryCollection {

  create(newCategory) {
    let record = new schema(newCategory);
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

module.exports = new CategoryCollection();