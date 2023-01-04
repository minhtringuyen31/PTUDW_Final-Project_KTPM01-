const orderService = require('./orderService');

exports.showOrders = async(req, res) =>
{
    const orders = await orderService.getAllOrders(req.user.loginPhone);
    console.log(orders);
    res.render('user/order/order', {layout: 'layout.hbs', orders});
}