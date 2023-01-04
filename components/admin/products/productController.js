const productSerice = require('./productService')

exports.getAll = async(req,res)=>{
    let products = await productSerice.getAllProducts();
    res.render('admin/products/list', {layout: "layoutAdmin",products});
}
exports.add = async(req,res)=>{
    console.log(req.body)
    
    console.log(req.files)
    let add = await  productSerice.add(req.body,req.files)
    
   res.redirect("/manageProduct/list")
}
exports.edit = async(req,res)=>{
    let product = await productSerice.getProductById(req.params.idProduct);
    console.log(product)
    res.render('admin/products/editProduct',{layout:'layoutAdmin',product})
}
exports.save = async(req,res)=>{

    let product = await productSerice.update(req.body);
    res.redirect('/manageProduct/list')
}
exports.remove = async(req,res)=>{
    productSerice.remove(req.params.idProduct)
    res.redirect('/manageProduct/list')
}