const express = require('express');
const router = express.Router();
const accountController = require('./accountController');


router.get('/admin', function (req, res, next) {
  //throw new Error('Unknown error!');
  res.redirect('/admin-login');
  //res.render('admin/admin.hbs', { title: 'admin' });
});
router.post('/admin', function (req, res, next) {
  //throw new Error('Unknown error!');
  res.render('admin/admin', { title: 'admin' });
});
router.get('/login_admin', function (req, res, next) {
  //throw new Error('Unknown error!');
  res.render('admin/accounts/logIn', { layout: false });
});

router.get('/profile', function (req, res) {
  //throw new Error('Unknown error!');
  res.render('admin/accounts/adminProfile', { layout: "layoutAdmin" });
});

router.get('/editAdminProfile', function (req, res) {
  res.render('admin/accounts/editAminProfile', { layout: "layoutAdmin" });
});

router.post('/editAdminProfile', accountController.editAdminProfile);

module.exports = router;