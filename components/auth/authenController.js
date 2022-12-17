const authenService = require('./authenServices')
const passport = require('./passport');


// exports.login = (req, res) =>{
//     console.log("log in");
//     console.log(req.body);
//     //check format
//     if(authenService.checkLogInFormat(req.body) == false)
//     {
//         res.render('authentication/logIn', {layout: false, error: "Invalid input. Phone number must be 10 characters, password must be more than 8 characters! "});
//         return;
//     }
//     //login and check by passport
    
// }

exports.signup = async(req, res, next) =>
{
    console.log("Sign up:");
    console.log(req.body);
    //check format
    if(authenService.checkSignUpFormat(req.body) === false)
    {
        res.render('authentication/signUp', {layout: false, error: {phone: "Phone number must be 10 characters", pass: "password must be more than 8 characters! "}});
        return;
    }
    //after checking format, check if the phone number has already existed
    const check2 = await authenService.isExistedAccount(req.body);
    if(check2 == true)
    {
        res.render('authentication/signup', {layout: false, error: {phone: "The phone number was registered.", pass: null}});
        return;
    }
    else
    {
        authenService.register(req.body);
        res.redirect("auth/logIn");
    }
    
}

exports.logout = (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/index');
    });
};