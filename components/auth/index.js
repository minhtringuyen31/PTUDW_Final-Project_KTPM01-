const express = require('express');
const router = express.Router();
const authController = require('./authController');
const passport = require('./passport');


// router.get('/', function(req, res, next) {
//     //throw new Error('Unknown error!');
//     res.redirect('user/logIn')
//   });

router.post('/login', passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/auth/login'
}));

router.get('/login', function (req, res) {
  //throw new Error('Unknown error!');
  res.render('auth/logIn', { layout: false });
});

router.get('/signup', function (req, res, next) {
  //throw new Error('Unknown error!');
  res.render('auth/signUp', { layout: false });
});

router.post('/signup', authController.signup);

router.get('/logout', authController.logout);

// router.get('/forgotPassword', function(req, res){
//   res.render('auth/fogotPassword',{layout: false});
// });

module.exports = router;