const express = require('express');
const router = express.Router();

const authApiController = require('./authApiController');

router.get('/verify-phone-number/:userPhone', authApiController.verifyPhoneNumber);

module.exports = router;