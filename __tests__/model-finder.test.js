'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../lib/server.js');
const request = supergoose(server.app);

describe('Model-Finder Test', () => {
  
  it('Model-finder should select categories', async() => {
    let obj = {
      name: 'category name',
      description: 'category description',
    };
    let response = await request.post('/api/v1/categories').send(obj);
    
  });
});