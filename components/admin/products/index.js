const express = require('express');
const router = express.Router();
const productController = require('./productController')

  router.get('/list', productController.getAll)
  router.get('/add', function(req, res) {
    //throw new Error('Unknown error!');
    res.render('admin/products/add', {layout: "layoutAdmin"});
  });
  router.post('/add',productController.add)
  router.get('/update/:productId', function(req, res) {
    //throw new Error('Unknown error!');
    res.render('admin/products/list', {layout: "layoutAdmin"});
  });

  module.exports=router;