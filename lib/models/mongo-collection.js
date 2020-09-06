'use strict';

class Model {

  constructor(schema) {
    this.schema = schema;
  }

  create(obj) {
    let record = new this.schema(obj);
    return record.save();
  }

  read(id) {
    if(!id){
      return this.schema.find({});
    } else {
      return this.schema.findById(id);
    }
  }

  update(id, record) {
    return this.schema.findOneAndUpdate({_id: id}, {$set: record}, {new:true});
  }

  destroy(id) {
    return this.schema.findByIdAndRemove(id);
  }
}

module.exports = Model;