const authService = require('../authServices');

exports.verifyPhoneNumber = async (req, res) => {
    const { userPhone } = req.params;
    const result = await authService.isExistedAccount(userPhone);
    res.json(!result);
};

exports.verifyEmail = async (req, res) => {
    const { userEmail } = req.params;
    const result = await authService.checkExistedAccountByEmail(userEmail);
    res.json(!result);
};