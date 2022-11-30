const express = require('express');
const router = express.Router();

router.get('/list', function(req, res) {
    res.render('admin/customers/list',{layout: "layoutAdmin"});    
  });

module.exports = router;


