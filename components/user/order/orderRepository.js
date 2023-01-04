const connection = require('../../connectDB');



exports.getOrdersByPhone = async(userPhone) =>
{
    try
    {
        const poolPromise = connection.promise();
        const res = await poolPromise.query('SELECT order.orderId, order.orderAddress, order.orderPrice, order.orderStatus, order.paymentMethod \
        FROM `order` WHERE order.userPhone = ?', [userPhone]);
        return res[0];
    }
    catch(e)
    {
        console.log(e);
        return null;
    }
}

exports.getAllProductOfOrder = async(orderId) =>
{
    try
    {
        const poolPromise = connection.promise();
        const res = await poolPromise.query('SELECT * FROM orderproduct WHERE orderproduct.orderId = ?', [orderId]);
        console.log(res[0]);
    } 
    catch(e)
    {
        console.log(e);
        return null;
    }
}

exports.getOrderDetail = async(orderId) =>
{
    try
    {
        const poolPromise = connection.promise();
        const res = await poolPromise.query('SELECT product.idProduct, product.productName , product.productPrice, orderproduct.quantity, product.productImage, product.productPrice*orderproduct.quantity AS "total" FROM orderproduct JOIN product ON (orderproduct.orderId = ? AND orderproduct.idProduct = product.idProduct)', [orderId]);
        console.log(res[0]);
        return res[0]; 
    }
    catch(e)
    {
        console.log(e);
        return new [];
    }
}
