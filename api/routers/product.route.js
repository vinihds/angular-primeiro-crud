const express = require('express');
const app = express();
const productRoutes = express.Router();

let Product = require('../models/Product');

productRoutes.route('add').post((req, res) => {
  let product = new Product(req.body);

  product
    .save()
    .then(product =>
      res.status(200).json({ Product: 'Product has been added successfully' })
    )
    .catch(err => res.status(400).send('unable to save to database'));
});

productRoutes.route('/').get((req, res) => {
  Product.find((err, products) =>
    err ? console.log(err) : res.json(products)
  );
});

productRoutes.route('/update/:id').post((req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (!product) {
      res.status(400).send('Record not found');
    } else {
      product.ProductName = req.body.ProductName;
      product.ProductDescription = req.body.ProductDescription;
      product.ProductPrice = req.body.ProductPrice;

      product
        .save()
        .then(product => res.json('Update complete'))
        .catch(err => res.status(400).send('Unable to update the database'));
    }
  });
});

productRoutes.route('/delete/:id').get((req, res) => {
  Product.findByIdAndRemove({ _id: req.param.id }, (err, product) =>
    err ? res.json(err) : res.json('Successfully removed')
  );
});

module.exports = productRoutes;
