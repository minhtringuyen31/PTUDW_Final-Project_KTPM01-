const passport = require('passport');
const LocalStrategy = require('passport-local');
const authenService = require('./authenServices');


passport.use(new LocalStrategy({usernameField: 'account'}, async function verify(account, password, cb)
{
    console.log(account);
    console.log(password);
    const user = await authenService.logIn(account, password);
    console.log(user);
    if(user)
    {
        console.log("success");
        return cb(null, user[0]);
    }
    else
    {
        console.log("failure");
        return cb(null, false);
    }
} ));

passport.serializeUser(function(user, cb)
{
    process.nextTick(function()
    {
        cb(null, {loginPhone: user.userPhone, loginName: user.userName, loginGender: user.userGender, loginAddress: user.userAddress});
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});

module.exports = passport;