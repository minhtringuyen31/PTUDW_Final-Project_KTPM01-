const orderRepository = require('./orderRepository');



exports.getAllOrders = async(_userPhone) =>
{
    const orders = await orderRepository.getOrdersByPhone(_userPhone);
    if(orders === null)
    {
        return [];
    }
    return orders;
}