var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //throw new Error('Unknown error!');
  res.render('indexFrontEnd');
});

router.post('/', function(req, res, next) {
  //throw new Error('Unknown error!');
  res.render('indexFrontEnd');
});
module.exports = router;
