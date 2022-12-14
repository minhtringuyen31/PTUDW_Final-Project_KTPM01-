const passport = require('passport');
const LocalStrategy = require('passport-local');
const authService = require('./authServices');


passport.use(new LocalStrategy({ usernameField: 'account' }, async function verify(account, password, cb) {
    console.log(account);
    console.log(password);
    const user = await authService.logIn(account, password);
    console.log(user);
    if (user) {
        console.log("success");
        return cb(null, user[0]);
    }
    else {
        console.log("failure");
        return cb(null, false);
    }
}));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { loginPhone: user.userPhone, loginName: user.userName, loginGender: user.userGender, loginAddress: user.userAddress, loginAvatar: user.avatar, loginRole: user.userRole });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

module.exports = passport; 