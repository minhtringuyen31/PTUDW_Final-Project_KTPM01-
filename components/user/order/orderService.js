const orderRepository = require('./orderRepository');
const productService = require('../products/productService')



exports.getAllOrders = async(_userPhone) =>
{
    const orders = await orderRepository.getOrdersByPhone(_userPhone);
    if(orders === null)
    {
        return [];
    }
    return orders;
} 

exports.getOrderDetail = async(orderId)=>
{
    const res = await orderRepository.getOrderDetail(orderId);
    return res;
}