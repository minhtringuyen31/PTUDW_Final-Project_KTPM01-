const authService = require('../authServices');

exports.verifyPhoneNumber = async (req, res) => {
    const { userPhone } = req.params;
    const result = await authService.isExistedAccount(userPhone);
    res.json(!result);
};