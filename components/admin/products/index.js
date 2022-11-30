const express = require('express');
const router = express.Router();

  router.get('/list', function(req, res) {
    //throw new Error('Unknown error!');
    res.render('admin/products/list', {layout: "layoutAdmin"});
  });

  module.exports=router;