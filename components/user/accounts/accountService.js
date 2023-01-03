const connection = require('../../connectDB');

exports.updateProfile = async (nameEdit, phoneEdit, addressEdit) => {
    console.log("service update");
    try {
        const poolPromise = connection.promise();
        await poolPromise.query('UPDATE useraccount SET useraccount.userName = ?, useraccount.userAddress = ? WHERE useraccount.userPhone = ?', [nameEdit, addressEdit, phoneEdit]);
        console.log("success");
        const [user, fields] = await poolPromise.query(
            "SELECT * from useraccount WHERE useraccount.userPhone = ? LIMIT 1", [phoneEdit]);
        console.log('111111');
        console.log(user);


        return user;


    }
    catch (err) {
        console.log(err);
        return false;
    }
}

exports.updateAvatar = async (currentUser, fileImageName) => {
    console.log("service update");

    try {
        const poolPromise = connection.promise();
        console.log("Query Update profile: " + currentUser + "   Image " + fileImageName);
        await poolPromise.query('UPDATE useraccount SET useraccount.avatar = ? WHERE useraccount.userPhone = ?', [fileImageName, currentUser]);
        console.log("Update Avatar Successfully");
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

exports.getPasswordByPhoneNumber = async (phoneNumber) => {
    const poolPromise = connection.promise();
    try {
        const password = await poolPromise.query(
            "SELECT useraccount.userPassword FROM useraccount WHERE useraccount.userPhone = ? LIMIT 1", [phoneNumber]
        );
        console.log("dfs: " + password);
        let pw = password[0][0].userPassword;
        return pw;
    }
    catch (err) {
        console.log(err);
        return;
    }
}
exports.updatePassword = async (phoneNumber, password) => {
    const poolPromise = connection.promise();
    try {
        await poolPromise.query(
            "UPDATE useraccount SET useraccount.userPassword = ? WHERE useraccount.userPhone = ?", [password, phoneNumber]
        );
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}