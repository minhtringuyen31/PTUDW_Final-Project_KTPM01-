const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    //throw new Error('Unknown error!');
    if(!req.user)
    {
        res.redirect('/auth/login');
    }
    else
    {
    res.render('indexAdmin', {layout: "layoutAdmin"});
    }
  });

  router.post('/', function(req, res, next) {
    //throw new Error('Unknown error!');
    res.render('indexAdmin', {layout: "layoutAdmin"});
    
  });

  module.exports=router;