const connection = require('../connectDB');
const DEFAULT_ROLE_OF_NEW_MEMBER = 1;



/**
 * 
 * @param userPhone 
 * @returns {Promise<user|null>}
 */
exports.isExistedPhoneNumber = async (userPhone) => {
    const poolPromise = connection.promise();

    const [user, fields] = await poolPromise.query("SELECT useraccount.userPhone from useraccount WHERE useraccount.userPhone = ? LIMIT 1", [userPhone]);

    return user.length > 0;
}


exports.isExistedEmail = async (email) => {
    console.log("check email");
    try {
        const poolPromise = connection.promise();

        const [user, fields] = await poolPromise.query("SELECT useraccount.userEmail from useraccount WHERE useraccount.userEmail = ? LIMIT 1", [email]);
        console.log("User check by email: " + user);
        return user.length > 0;

    } catch (error) {
        console.log(error);
    }

}

/**
 * 
 * @param userPhone 
 * @returns {Promise<object|null>} 
 */
exports.getUserAccountByPhone = async (userPhone) => {
    const poolPromise = connection.promise();
    const [user, fields] = await poolPromise.query(
        "SELECT * from useraccount WHERE useraccount.userPhone = ? LIMIT 1", [userPhone]);

    return user;
}


exports.addNewUser = async (userPhone, userPassword, userName, userGender, userAddress, userEmail) => {
    console.log("check regis: " + userPhone + userEmail)
    const poolPromise = connection.promise();
    try {
        await poolPromise.query(
            "INSERT INTO useraccount (userPhone, userPassword, userName, userGender, userAddress, userRole,userEmail) \
                VALUES (?,?,?,?,?,?,?)", [userPhone, userPassword, userName, userGender, userAddress, DEFAULT_ROLE_OF_NEW_MEMBER, userEmail]
        );
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

exports.updatePassword = async (email, password) => {
    console.log("check regis: " + email);
    const poolPromise = connection.promise();
    try {
        await poolPromise.query(
            "UPDATE useraccount SET useraccount.userPassword = ? WHERE useraccount.userEmail like ?", [password, email]
        );
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}