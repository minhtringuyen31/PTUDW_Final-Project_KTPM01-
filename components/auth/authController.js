const authService = require('./authServices')
const authRep = require('./authRepository');
const passport = require('./passport');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
require('dotenv').config();


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
            service: "hotmail",
            auth: {
                user: "coldbrew.thebestcoffee@outlook.com",
                pass: "coldbrewcoffee"
            }
        })

        const options = {
            from: "coldbrew.thebestcoffee@outlook.com",
            to: req.body.userEmail,
            subject: "Active account",
            text: "Sign up successfully!!!"
        }

        transporter.sendMail(options, function (err, info) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Sent: " + info.response);
        })

        res.redirect('/auth/logIn');
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

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log("Email Forgot: " + email);
    if (!email) {
        res.redirect('/auth/forgotPassword');
        return;
    }
    const check = await authService.checkExistedAccountByEmail(email);
    console.log("Check Email Existed: " + check);
    if (!check) {
        res.redirect('/auth/forgotPassword');
        return;
    } else {
        const hashedEmail = await bcrypt.hash(email, parseInt(process.env.BRCYPT_SALT_ROUND));
        console.log("Hashed Email: " + hashedEmail);
        const transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
                user: "coldbrew.thebestcoffee@outlook.com",
                pass: "coldbrewcoffee"
            }
        })

        // const options = {
        //     from: "coldbrew.thebestcoffee@outlook.com",
        //     to: email,
        //     subject: "Reset Password",
        //     text: `<a href="${process.env.APP_URL}/password/reset/${email}?token=${hashedEmail}"> Reset Password </a>`
        // }
        // transporter.sendMail(options, function (err, info) {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //     console.log("Sent: " + info.response);
        console.log(`${process.env.APP_URL}/auth/forgotPassword/${email}?token=${hashedEmail}`);
        // })
        res.redirect('/auth/forgotPassword?status=success');
    }
}


exports.showResetPasswordForm = (req, res) => {
    if (!req.params.email || !req.query.token) {
        res.redirect('/auth/forgotPassword');
    } else {
        console.log("email: req.params.email, token: req.query.token " + req.params.email + req.query.token);
        res.render('auth/resetPassword', { email: req.params.email, token: req.query.token });
    }
}

exports.resetPassword = async (req, res) => {
    console.log("controller resest");
    const { email, token, password } = req.body;
    console.log(email, token, password);
    if (!email || !token || !password) {
        res.redirect('/auth/forgotPassword');
    } else {
        console.log("vo day");
        const checkEmail = await bcrypt.compare(email, token);
        console.log(checkEmail);
        if (checkEmail == true) {
            console.log("vo day roi");
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const check = await authRep.updatePassword(email, hashPassword);
            console.log("register: " + check);
            if (check) {
                res.redirect('/auth/login');
            }
            else {
                res.redirect('/auth/forgotPassword');
            }
        } else {
            res.redirect('/auth/forgotPassword');
        }
    }
}