const accountService = require('./accountService');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

exports.updateAvatar = async (req, res) => {
    console.log("Update profile: " + req.user.loginName + "   Image " + req.file.filename);
    const user = await accountService.updateAvatar(req.user.loginPhone, req.file.filename);
    if (user) {
        res.locals.user.loginAvatar = req.file.filename;
        res.redirect("/account/editProfile");
        return;
    } else {
        res.render('indexFrontEnd');
        return;
    }

    // if(user)
    // {
    //     res.render('user/accounts/editProfile');   
    //     res.locals.user.loginName = user[0].userName;
    //     res.locals.user.loginAddress = user[0].userAddress;
    //     return user[0];
    // }
    // else
    // {
    //     res.render('/index');
    //     return null;
    // }
}


exports.updateProfile = async (req, res) => {
    console.log("controller");
    const user = await accountService.updateProfile(req.body.nameEdit, req.body.phoneEdit, req.body.addressEdit);
    console.log("acc: ");
    console.log(user[0]);


    if (user) {
        res.render('user/accounts/editProfile');
        res.locals.user.loginAvatar = user[0].avatar;
        res.locals.user.loginName = user[0].userName;
        res.locals.user.loginAddress = user[0].userAddress;
        return user[0];
    }
    else {
        res.render('/index');
        return null;
    }
}

exports.updatePassword = async (req, res) => {
    const { currentPass, newPass } = req.body;
    console.log(req.body);
    const password = await accountService.getPasswordByPhoneNumber(req.user.loginPhone);
    console.log(password);
    console.log("compare" + currentPass);
    const check = await bcrypt.compare(req.body.currentPassword, password);
    if (check == true) {
        console.log("hashnewPass");
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.newPassword, salt);
        const check = await accountService.updatePassword(req.user.loginPhone, hashPassword);
        if (check) {
            console.log("check update new pass");
            res.redirect('/index');
        }
        else {
            res.redirect('/account/editPassword');
        }
    } else {
        res.redirect('/account/editPassword');
    }

}
