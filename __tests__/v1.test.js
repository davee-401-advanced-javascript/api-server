'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../lib/server.js');
const request = supergoose(server.app);

let obj1 = {
  name: 'first',
  description: 'first description',
};

let obj2 = {
  name: 'second',
  description: 'second description',
};

let obj3 = {
  name: 'testing name',
  category: 'testing category',
  description: 'testing description',
  price: 5,
  inStock: 5,
};

let obj4 = {
  name: 'second name',
  category: 'second category',
  description: 'second description',
  price: 8,
  inStock: 8,
};

describe('Post Methods should work', () => {
  it('Post should work on categories route', async() => {
    let response = await request.post('/api/v1/categories').send(obj1);
    expect(response.status).toEqual(201);
  });
  it('Post should work on products route', async() => {
    let response = await request.post('/api/v1/products').send(obj3);
    expect(response.status).toEqual(201);
  });
});


describe('Get All methods should work', () => {
  it('getAll should work for categories', async() => {
    let response = await request.get('/api/v1/categories');
    expect(response.status).toEqual(200);
  });
  it('getAll should work for products', async() => {
    let response = await request.get('/api/v1/products');
    expect(response.status).toEqual(200);
  });
});

describe('Get One methods should work', () => {
  it('getOne should work for categories', async() => {
    let response = await request.post('/api/v1/categories').send(obj1);
    let id = response.body._id;
    let response1 = await request.get(`/api/v1/categories/${id}`);
    expect(response1.status).toEqual(200);
  });
  it('getOne should work for products', async() => {
    let response = await request.post('/api/v1/products').send(obj3);
    let id = response.body._id;
    let response1 = await request.get(`/api/v1/products/${id}`);
    expect(response1.status).toEqual(200);
  });
});

describe('Put method should work', () => {
  it('Should update categories', async() => {
    let adding = await request.post('/api/v1/categories').send(obj1);
    let id = adding.body._id;
    let updating = await request.put(`/api/v1/categories/${id}`).send(obj2);
    Object.keys(obj2).forEach(key => {
      expect(updating.body[key]).toEqual(obj2[key]);
    });
    expect(updating.status).toEqual(200);
  });
  it('Should update products', async() => {
    let adding = await request.post('/api/v1/products').send(obj3);
    let id = adding.body._id;
    let updating = await request.put(`/api/v1/products/${id}`).send(obj4);
    Object.keys(obj4).forEach(key => {
      expect(updating.body[key]).toEqual(obj4[key]);
    });
    expect(updating.status).toEqual(200);
  });
});

describe('Delete method should work', () => {
  it('Should delete categories', async() => {
    let adding = await request.post('/api/v1/categories').send(obj1);
    let id = adding.body._id;
    let deleting = await request.delete(`/api/v1/categories/${id}`);
    expect(deleting.status).toEqual(200);
  });
  it('Should delete products', async() => {
    let adding = await request.post('/api/v1/products').send(obj3);
    let id = adding.body._id;
    let deleting = await request.delete(`/api/v1/products/${id}`);
    expect(deleting.status).toEqual(200);
  });
});