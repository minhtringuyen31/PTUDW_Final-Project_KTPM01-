
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
    console.log(check);
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
        return;
    }
    await cartRepository.removeProductInCart(_userPhone, _idProduct);
}