'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../lib/server.js');
const request = supergoose(server.app);

describe('Model-Finder Test', () => {
  it('Should be able to pick products model', () => {
    
  });
});