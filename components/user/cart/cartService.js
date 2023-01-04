
const productService = require('../products/productService');
const cartRepository = require('./cartRepository');



/*cart structure
= 
    [
        {productID: <value>, quatity: <value>},
        {productID: <value>, quatity: <value>},...
    ],
*/

exports.cartDetails = async(_userPhone) =>
{
    let check = await cartRepository.hasCart(_userPhone);
    if(check === false) 
    {
        return [];
    }
    return await cartRepository.getCartDetail(_userPhone);
}

exports.addToCart = async(_userPhone, _idProduct) =>
{
    const quantity = await cartRepository.hasProduct(_userPhone, _idProduct);
    if(quantity === -1 || quantity === null)
    {
        await cartRepository.addProductToCart(_userPhone, _idProduct);
    }
    else 
    {
        await cartRepository.updateQuantity(_userPhone, _idProduct, quantity + 1)
    }
}

exports.removeFromCart = async(_userPhone, _idProduct) =>
{
    const quantity = await cartRepository.hasProduct(_userPhone, _idProduct);
    if(quantity === -1 || quantity === null)
    {
        console.log("NO PRODUCT IN CART");
        return false;
    }
    await cartRepository.removeProductInCart(_userPhone, _idProduct);
    return true;
}

exports.addOrder = async(reqBody) =>
{
    if(!reqBody.orderAddress || !reqBody.orderPhone)
    {
        return;
    }
    await cartRepository.addOrder(reqBody.orderPhone, reqBody.orderAddress, reqBody.orderPrice, reqBody.paymentMethod);
}

exports.getOrderListByPhone = async(_userPhone) =>
{
    const res = cartRepository.getOrderListByPhone(_userPhone);
    return res;
}

exports.addListTo_ProductOrder = async(newestOrder) =>
{
    const currentProductInCart = await cartRepository.get_ProductInCart_by_Phone(newestOrder.userPhone);
    for(let i=0; i< currentProductInCart.length; i++)
    {
        await cartRepository.addProductOrder(newestOrder.orderId, currentProductInCart[i].idProduct, currentProductInCart[i].quantity);
        await this.removeFromCart(newestOrder.userPhone, currentProductInCart[i].idProduct);
    }
}