const express = require('express');
const router = express.Router();
var customerController = require('../customers/customerController')
const customerService = require('./customerService')


router.get('/list', function(req, res) {
    res.render('admin/customers/list',{layout: "layoutAdmin"});    
  });
router.get('/orders', customerController.getProductList)

module.exports = router;


