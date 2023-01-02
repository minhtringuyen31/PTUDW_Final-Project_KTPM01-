const authService = require('./authServices')
const passport = require('./passport');
const nodemailer = require('nodemailer');


// exports.login = (req, res) =>{
//     console.log("log in");
//     console.log(req.body);
//     //check format
//     if(authenService.checkLogInFormat(req.body) == false)
//     {
//         res.render('auth/logIn', {layout: false, error: "Invalid input. Phone number must be 10 characters, password must be more than 8 characters! "});
//         return;
//     }
//     //login and check by passport

// }


exports.signup = async (req, res, next) => {
    console.log("Sign up:");
    console.log(req.body);
    const reqBody = req.body;
    //check format
    if (authService.checkSignUpFormat(req.body) === false) {

        res.render('auth/signUp', { layout: false, error: { phone: "Phone number must be 10 characters", pass: "password must be more than 8 characters! " } });
        return;
    }
    //after checking format, check if the phone number has already existed
    const check2 = await authService.isExistedAccount(req.body.userPhone);
    if (check2 == true) {

        res.render('auth/signup', { layout: false, error: { phone: "The phone number was registered.", pass: null } });
        return;
    }
    else {

        authService.register(req.body);
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: "coldbrew.thebestcoffee@gmail.com",
                pass: "123456@#"
            }
        });

        const options = {
            from: "coldbrew.thebestcoffee@gmail.com",
            to: "minhtri.nguyenvo31@gmail.com",
            subject: "Active account",
            text: "Sign up successfully!!!"
        };

        transporter.sendMail(options, function (err, info) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Sent: " + info.response);
        })

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