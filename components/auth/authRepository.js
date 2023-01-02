const connection = require('../connectDB');
const DEFAULT_ROLE_OF_NEW_MEMBER = 1;



/**
 * 
 * @param userPhone 
 * @returns {Promise<user|null>}
 */
exports.isExistedPhoneNumber = async(userPhone) =>
{
    const poolPromise = connection.promise();
    
    const [user, fields] = await poolPromise.query("SELECT useraccount.userPhone from useraccount WHERE useraccount.userPhone = ? LIMIT 1", [userPhone]);
    
    return user.length > 0;
}


/**
 * 
 * @param userPhone 
 * @returns {Promise<object|null>} 
 */
exports.getUserAccountByPhone = async(userPhone) =>
{
    const poolPromise = connection.promise();
    const [user, fields] = await poolPromise.query(
        "SELECT * from useraccount WHERE useraccount.userPhone = ? LIMIT 1", [userPhone]);
    
    return user;
}


exports.addNewUser = async(userPhone, userPassword, userName, userGender, userAddress,userEmail) =>
{
    console.log("check regis: "+ userPhone+userEmail)
    const poolPromise = connection.promise();
    try
    {
        await poolPromise.query(
            "INSERT INTO useraccount (userPhone, userPassword, userName, userGender, userAddress, userRole,userEmail) \
                VALUES (?,?,?,?,?,?,?)", [userPhone, userPassword, userName, userGender, userAddress, DEFAULT_ROLE_OF_NEW_MEMBER,userEmail]
        );
        return true;
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
}
