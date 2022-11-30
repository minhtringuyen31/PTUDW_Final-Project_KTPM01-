const express = require('express');
const router = express.Router();
const productController = require('./productController');


router.get('/', function(req, res) {
    res.render('user/products/list',  { layout: 'layout.hbs' });
  });

  router.get('/:productID', productController.productDetail);

module.exports = router;


