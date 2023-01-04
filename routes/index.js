var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  //throw new Error('Unknown error!');
  console.log("aaaaa");
  console.log(req.user);
  if (req.user != undefined) {
    if (req.user.loginRole == 0) {
      res.redirect('/dashboard');
    }

  }
  res.render('indexFrontEnd');
});

router.post('/', function (req, res, next) {
  //throw new Error('Unknown error!');
  res.render('indexFrontEnd');
});
module.exports = router;