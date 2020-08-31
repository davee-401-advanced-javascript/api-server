'use strict';

module.exports = (database) => {
  return (req, res, next) => {
    console.log('req.body:', req.body);
    next();
  };
};