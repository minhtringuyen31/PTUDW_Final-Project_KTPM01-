const express = require('express');
const router = express.Router();
const productController = require('./productController');

router.get('/', function(req, res) {
  res.render('user/products/general', {layout: 'layout.hbs'});
})

router.get('/list', productController.allProductList);

router.get('/detail', productController.productDetail);

module.exports = router;


