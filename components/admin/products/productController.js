const productSerice = require('./productService')

exports.getAll = async(req,res)=>{
    let products = await productSerice.getAllProducts();
    res.render('admin/products/list', {layout: "layoutAdmin",products});
}
exports.add = async(req,res)=>{
    let products = await productSerice.getAllProducts();
    res.render('admin/products/list', {layout: "layoutAdmin",products});
}