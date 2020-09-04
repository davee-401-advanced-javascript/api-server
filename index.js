'use strict';

require('dotenv').config();

let server = require('./lib/server2.js');

server.start(process.env.PORT);
