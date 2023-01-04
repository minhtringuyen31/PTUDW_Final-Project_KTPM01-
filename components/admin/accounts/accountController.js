const accountService = require('./accountService');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

exports.editAdminProfile = async (req, res) => {
    console.log("controller");
    const user = await accountService.updateProfile(req.body.fullname, req.body.phone, req.body.address);
    console.log("acc: ");
    console.log(user[0]);


    if (user) {
        // res.locals.user.loginAvatar = user[0].avatar;
        res.locals.user.loginName = user[0].userName;
        res.locals.user.loginAddress = user[0].userAddress;
        res.redirect('/adminAccount/editAdminProfile');
        return user[0];
    }
    else {
        res.render('/index');
        return null;
    }
}