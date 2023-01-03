const connection = require('../../connectDB');

exports.getAllProducts = async() =>{
    let query = "select * from product";
    const poolPromise = connection.promise();
    let productList = await poolPromise.query(query);
    return productList[0];
}