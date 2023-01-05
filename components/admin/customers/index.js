const express = require('express');
const router = express.Router();
var customerController = require('../customers/customerController')
const customerService = require('./customerService')


router.get('/list', function(req, res) {
  if(!req.user)
    {
        res.redirect('/auth/login');
    }
    else
    {
    res.render('admin/customers/list',{layout: "layoutAdmin"});    
    }
  });

router.get('/list/infor', customerController.getCustomerListByPage);

router.get('/orders', customerController.getProductList)

module.exports = router;


