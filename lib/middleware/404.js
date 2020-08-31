'use strict';

module.exports = (req, res) => {
  res.status(404).send('404 Error: Route not found');
};