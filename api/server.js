const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./db');

const productRoute = require('./routers/product.route');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log('Database is connected');
  },
  err => {
    console.log('Can not connect to the database' + err);
  }
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/products', productRoute);
let port = process.env.PORT || 4000;

const server = app.listen(() => {
  console.log('Listening on port ' + port);
});
