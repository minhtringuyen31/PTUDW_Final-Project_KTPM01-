const orderService = require('./orderService');

exports.showOrders = async(req, res) =>
{
    const orders = await orderService.getAllOrders(req.user.loginPhone);
    console.log(orders);
    res.render('user/order/order', {layout: 'layout.hbs', orders});
}


exports.showDetail = async(req, res) =>
{
    console.log("orderId " + req.params.orderId);
    const detail = await orderService.getOrderDetail(req.params.orderId);

    res.render('user/order/orderdetail', {layout: 'layout.hbs', detail});
}