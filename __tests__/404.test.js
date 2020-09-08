'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../lib/server.js');

const request = supergoose(server.app);

describe('404 Error Test', () => {
  it('Should send 404 error if route not valid', async() => {
    let response = await request.get('/badroute');
    expect(response.status).toEqual(404);
  });
});

