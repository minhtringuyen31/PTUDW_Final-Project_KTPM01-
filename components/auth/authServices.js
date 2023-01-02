const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const authSchemas = require('./authSchemas');
const authRep = require('./authRepository');
const bcrypt = require('bcryptjs');


const ajv = new Ajv();
addFormats(ajv);

//check the format of log-in 
/** 
 * 
 * @param  reqBody 
 * @return {true|false}
 */
exports.checkLogInFormat = (reqBody) => {
    if (!ajv.validate(authSchemas.logInSchema, reqBody)) {
        return false;
    }
    return true;
}

exports.checkSignUpFormat = (reqBody) => {
    if (!ajv.validate(authSchemas.signUpSchema, reqBody)) {
        return false;
    }
    return true;
}

exports.isExistedAccount = async (userPhone) => {
    const check = await authRep.isExistedPhoneNumber(userPhone);
    if (check) {
        return true;
    }
    else {
        return false;
    }
}

exports.register = async (reqBody) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(reqBody.userPassword, salt);
    const check = await authRep.addNewUser(reqBody.userPhone, hashPassword, reqBody.userName, reqBody.userGender, reqBody.userAddress);
    console.log("register: " + check);
    if (check) {
        return true;
    }
    else {
        return false;
    }
}

exports.logIn = async (inputPhone, inputPassword) => {
    const user = await authRep.getUserAccountByPhone(inputPhone);
    if (!user || user.length == 0) {
        return null;
    }
    else if (await bcrypt.compare(inputPassword, user[0].userPassword)) {
        return user;
    }
    else {
        return null;
    }
}