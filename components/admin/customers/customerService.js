const connection = require('../../connectDB');

exports.getAll = async(req,res)=>{
    let query = 'SELECT * FROM `order`'
    const poolPromise = connection.promise();
    let orderList = await poolPromise.query(query);
    return orderList[0];
};



