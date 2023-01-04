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


//check out//////////////////////////////////////////////////////////////

exports.showCheckOut = async(req, res) =>
{
    const data = await cartService.cartDetails(req.user.loginPhone);
    let total = Number(0);
    for(let i=0; i<data.length; ++i)
    {
        total += Number(data[i].total);
    }
    const orderInfor = {
        orderName: req.user.loginName,
        orderAddress: req.user.loginAddress,
        orderPhone: req.user.loginPhone,
        orderEmail: req.user.loginEmail,
        totalPrice: total
    }
    res.render('user/cart/checkout', {layout: false, orderInfor});
}

exports.addOrder = async(req, res) =>
{
    if(req.body)
    {
        
        console.log("addOrder body:");
        console.log(req.body);
        await cartService.addOrder(req.body);
        const orderList = await cartService.getOrderListByPhone(req.body.orderPhone);
        let newestOrder = { //the newest order of a specific customer - according to lastest orderId of that customer
            orderId: 0,
            userPhone: '',
            orderAddress: '',
            orderPrice: 0,
            orderStatus: '',
            paymentMethod: ''
        }
        for(let i=0; i<orderList.length; i++)
        {
            if(newestOrder.orderId < orderList[i].orderId)
            {
                newestOrder = orderList[i];
            }
        }
        console.log("newest Order:");
        console.log(newestOrder);

        await cartService.addListTo_ProductOrder(newestOrder); //add products to `order` table and `orderproduct` table -> remove all current product from `cart` table
        res.redirect('/account/editProfile');
    }
    else
    {
        console.log("NO ADD TO Order");
        res.redirect('/checkout');
    }
}