'use strict';

module.exports = (req, res, next) => {
  req.requestTime = new Date().toString();
  console.log('req.requestTime:', req.requestTime);
  next();
};