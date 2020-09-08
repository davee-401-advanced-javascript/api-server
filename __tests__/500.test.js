'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../lib/server.js');

const request = supergoose(server.app);

describe('500 Error Test', () => {
  it('Bad Category input should send 500 error', async() => {
    let obj = {
      name: 'missing description',
    };
    let response = await request.post('/api/v1/categories').send(obj);
    expect(response.status).toEqual(500);
  });

  it('Bad product input should send 500 error', async() => {
    let obj = {
      name: 'missing description',
    };
    let response = await request.post('/api/v1/products').send(obj);
    expect(response.status).toEqual(500);
  });
});