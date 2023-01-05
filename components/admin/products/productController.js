const productService = require('./productService')
const DEFAULT_PRODUCTS_ONE_PAGE = 5;



exports.getAll = async(req,res)=>{
    // let products = await productSerice.getAllProducts();
    // res.render('admin/products/list', {layout: "layoutAdmin",products});
    if(!req.user)
    {
        res.redirect('/auth/login');
    }
    else
    {
    res.render('admin/products/list', {layout: "layoutAdmin"});
    }
}

exports.getProductByPage = async(req,res)=>
{
    const inputPage = Number(req.query.page);
    console.log("page: " + inputPage);
    const listProducts = await productService.getProductsByPage(inputPage);
    const totalProducts = await productService.count();
    console.log(totalProducts);
    let pageArray = [];
    const maxPage = Number((totalProducts - (totalProducts % DEFAULT_PRODUCTS_ONE_PAGE)) / DEFAULT_PRODUCTS_ONE_PAGE);
    console.log(maxPage);
    if(maxPage>=3){
        if(inputPage>1 && inputPage< maxPage+1)
        for (let i = inputPage-1; i <= inputPage+1; i++) {
            pageArray.push(Number(i));

        }
        else if(inputPage==1) pageArray = [1,2,3];
        else pageArray = [maxPage-1,maxPage,maxPage+1];
    }
    else { 
        for(let i=0;i<=maxPage;i++)
            pageArray.push(Number(i+1));
    }
    console.log(pageArray);
    const pageObject = {
        pagearray: pageArray,
        maxpage: maxPage,
    };

    res.json({listProducts, pageObject});
}

exports.add = async(req,res)=>{
    console.log(req.body)
    
    console.log(req.files)
    let add = await  productService.add(req.body,req.files)
    
    res.redirect("/manageProduct/list")
}
exports.edit = async(req,res)=>{
    if(!req.user)
    {
        res.redirect('/auth/login');
    }
    else
    {
    let product = await productService.getProductById(req.params.idProduct);
    console.log(product)
    res.render('admin/products/editProduct',{layout:'layoutAdmin',product})
    }
}
exports.save = async(req,res)=>{
    
    let product = await productService.update(req.body);
    res.redirect('/manageProduct/list')
}
exports.remove = async(req,res)=>{
    if(!req.user)
    {
        res.redirect('/auth/login');
    }
    else
    {
    productService.remove(req.params.idProduct)
    res.redirect('/manageProduct/list');
    }
}