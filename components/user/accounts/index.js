const express = require('express');
const router = express.Router();
const accountController = require('./accountController');



router.get('/editProfile', function(req, res, next)
{
    res.render('user/accounts/editProfile');
});

// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/index',
//   failureRedirect: '/account/login'
// }));

router.post('/editProfile',accountController.updateProfile);


module.exports=router;