'use strict';

const mongoose = require('mongoose');
require('dotenv').config();
let server = require('./lib/server.js');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

server.start(process.env.PORT);
