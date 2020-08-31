'use strict';

module.exports = (req, res, next) => {
  console.log('PATH: ', req.path);
  console.log('METHOD: ', req.method);
  console.log('Request Time: ', req.requestTime);
  next();
};