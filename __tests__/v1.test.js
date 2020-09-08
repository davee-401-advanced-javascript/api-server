'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../lib/server.js');
const { response } = require('express');
const request = supergoose(server.app);

describe('Get methods should work', () => {
  let obj1 = {
    name: 'first',
    description: 'first description',
  };
  let obj2 = {
    name: 'second',
    description: 'second description',
  };
  it('Post should create new record', async() => {
    let response1 = await request.post('/api/v1/categories').send(obj1);
    console.log('response1', response1.body);
  });

  it('getAll should work for categories', async() => {
    let response = await request.get('/api/v1/categories');
    expect(response.status).toEqual(200);
  });
  it('getAll should work for products', async() => {
    let response = await request.get('/api/v1/products');
    expect(response.status).toEqual(200);
  });
  it('getOne should work for categories', async() => {
    let response = await request.get('/api/v1/categories/:id');
    expect(response.status).toEqual(200);
  });
  it('getOne should work for products', async() => {
    let response = await request.get('/api/v1/products/:id');
    expect(response.status).toEqual(200);
  });
});

