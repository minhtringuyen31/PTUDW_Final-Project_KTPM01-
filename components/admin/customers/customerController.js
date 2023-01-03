const accountService = require('./customerService.js')

exports.getProductList = async(req,res) =>{
    let orderList = await accountService.getAll();
    
    console.log(orderList);
    res.render('admin/customers/orders',{layout: "layoutAdmin", orderList}); 
}