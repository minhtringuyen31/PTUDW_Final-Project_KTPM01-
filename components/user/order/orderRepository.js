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
