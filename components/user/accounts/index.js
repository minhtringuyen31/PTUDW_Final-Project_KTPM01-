const express = require('express');
const router = express.Router();


router.get('/admin', function(req, res, next) {
    //throw new Error('Unknown error!');
    res.redirect('/admin-login');
    //res.render('admin/admin.hbs', { title: 'admin' });
  });
  router.post('/admin', function(req, res, next) {
    //throw new Error('Unknown error!');
    res.render('admin/admin', { title: 'admin' });
  });
  router.get('/login_admin', function(req, res, next) {
    //throw new Error('Unknown error!');
    res.render('admin/accounts/logIn', {layout: false});
  });

  router.get('/profile', function(req, res) {
    //throw new Error('Unknown error!');
    res.render('admin/accounts/adminProfile', {layout: "layoutAdmin"});
  });


  module.exports=router;