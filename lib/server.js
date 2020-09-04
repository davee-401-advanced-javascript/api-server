'use strict';

const express = require('express');
const app = express();

const timeStamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');
// const whichDBtoUse = require('./middleware/whichDB.js');
const getById = require('./middleware/getById.js');
const giveNewID = require('./middleware/giveNewID.js');
const giveTargetIndex = require('./middleware/giveTargetIndex.js');
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

let myDatabase = {
  categories: {
    count: 2,
    results: [    
      {
        'id': 1,
        'name': 'Electronics',
        'description': 'electronic stuff',
      },
      {
        'id': 2,
        'name': 'Kitchen',
        'description': 'kitchen stuff',
      }],
  },

  products: {
    count: 2,
    results: [
      {
        'name': 'Samsung TV',
        'category': 'Electronics',
        'description': '80in TV',
        'price': 1299,
        'inStock': 5,
        'id': 1,
      },
      {
        'name': 'Kitchen Towels',
        'category': 'Kitchen',
        'description': 'fancy kitchen towels',
        'price': 10,
        'inStock': 20,
        'id': 2,
      },
    ],
  },
};

app.use(timeStamp);
app.use(logger);
// app.use(whichDBtoUse(myDatabase));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', (req, res) => {
  res.redirect(200).json('https://www.google.com/');
});

app.get('/products', (req, res) => {


  res.status(200).send(myDatabase.products);
});

app.get('/products/:id', getById, (req, res) => {
  res.status(200).send(req.output);
});

app.post('/products', giveNewID, (req, res) => {
  myDatabase[req.collection].results.push(req.body);
  myDatabase[req.collection].count+=1;
  console.log('Posted to Database: ', myDatabase);
  res.status(200).send(req.body);
});

app.put('/products/:id', giveTargetIndex, (req, res) => {
  req.body.id = +req.params.id;
  myDatabase[req.collection].results.splice(req.targetIndex, 1, req.body);
  console.log('Put to Database:', myDatabase);
  res.status(200).send(req.body);
});

app.delete('/products/:id', giveTargetIndex, (req, res) => {
  myDatabase[req.collection].results.splice(req.targetIndex, 1);
  myDatabase[req.collection].count-=1;
  console.log('Deleted from Database: ', myDatabase);
  res.status(200).send(myDatabase);
});











//////////   Categories   /////////////
app.get('/categories', (req, res) => {
  res.status(200).send(req.useThisCollection.results);
});

app.get('/categories/:id', getById, (req, res) => {
  res.status(200).send(req.output);
});

app.post('/categories', giveNewID, (req, res) => {
  myDatabase[req.collection].results.push(req.body);
  myDatabase[req.collection].count+=1;
  console.log('Posted to Database: ', myDatabase);
  res.status(200).send(req.body);
});

app.put('/categories/:id', giveTargetIndex, (req, res) => {
  req.body.id = +req.params.id;
  myDatabase[req.collection].results.splice(req.targetIndex, 1, req.body);
  console.log('Put to Database:', myDatabase);
  res.status(200).send(req.body);
});

app.delete('/categories/:id', giveTargetIndex, (req, res) => {
  myDatabase[req.collection].results.splice(req.targetIndex, 1);
  myDatabase[req.collection].count-=1;
  console.log('Deleted from Database: ', myDatabase);
  res.status(200).send(myDatabase);
});



function start(port) {
  app.listen(port, () => console.log('Server is running on port', port));
}

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = {
  start: start,
  server: app,
};