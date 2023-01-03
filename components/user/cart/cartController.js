const cartService = require('./cartService');

exports.cartDetail = async(req, res) =>
{
    const userPhone = req.user.loginPhone;
    console.log("cartDetail " + userPhone);
    const products = await cartService.cartDetails(userPhone); 
    res.json({detail: products}); 
}

exports.showCart = (req, res) =>
{
    res.render('user/cart/cart', {layout: 'layout.hbs'});
}
 
exports.addToCart = async(req, res) =>
{
    const idProduct = req.params.idProduct; 
    console.log("userPhone: " + req.user.loginPhone);
    console.log("idProduct: " + req.params.idProduct);
    await cartService.addToCart(req.user.loginPhone, idProduct);
}  

exports.removeFromCart = async(req, res) =>
{
    const idProduct = req.params.idProduct;
    console.log("remove ID: " + idProduct);
    await cartService.removeFromCart(req.user.loginPhone, idProduct);
}