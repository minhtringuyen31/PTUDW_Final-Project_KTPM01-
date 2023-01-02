const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const accountController = require('./accountController');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatar')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router.post('/editAvatar', upload.single("image"), accountController.updateAvatar);
// => {
//     console.log("filename: " + req.file.filename);
//     res.render('indexFrontEnd');
// });

// router.post('/login', passport.authticate('local', {
//   successRedirect: '/index',
//   failureRedirect: '/account/login' 
// }));

router.post('/editProfile', accountController.updateProfile);

// router.post('editAvatar', upload.single("image"), (req, res) => {
//     res.render('indexFrontEnd');
// });


router.get('/editProfile', function (req, res, next) {
    res.render('user/accounts/editProfile');
});

router.get('/editAvatar', function (req, res, next) {
    console.log("edit")
    res.render('user/accounts/editAvatar');
});

router.get('/editPassword', function (req, res, next) {
    res.render('user/accounts/editPassword');
});


module.exports = router;