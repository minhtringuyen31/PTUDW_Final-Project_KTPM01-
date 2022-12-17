const express = require('express');
const router = express.Router();
const authenController = require('./authenController');
const passport = require('./passport');


// router.get('/', function(req, res, next) {
//     //throw new Error('Unknown error!');
//     res.redirect('user/logIn')
//   });

router.post('/login', passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/account/login'
}));

router.get('/login', function (req, res) {
  //throw new Error('Unknown error!');
  res.render('authentication/logIn', { layout: false });
});

router.get('/signup', function (req, res, next) {
  //throw new Error('Unknown error!');
  res.render('authentication/signUp', { layout: false });
});

router.post('/signup', authenController.signup);

router.get('/logout', authenController.logout);

module.exports = router;