'use strict';

module.exports = (database) => {
  return (req, res, next) => {
    req.output = database.results.find(obj => obj.id === +req.params.id);
    next();
  };
};