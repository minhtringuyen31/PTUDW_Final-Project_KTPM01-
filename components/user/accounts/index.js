const express = require('express');
const router = express.Router();


// router.get('/', function(req, res, next) {
//     //throw new Error('Unknown error!');
//     res.redirect('user/logIn')
//   });
  router.post('/', function(req, res, next) {
    //throw new Error('Unknown error!');
    res.render('indexFrontEnd');
  });

  router.get('/login', function(req, res, next) {
    //throw new Error('Unknown error!');
    res.render('user/accounts/logIn', { layout: false });
  });
  router.get('/signup', function(req, res, next) {
    //throw new Error('Unknown error!');
    res.render('user/accounts/signUp', { layout: false });
  });

  module.exports = router;