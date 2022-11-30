const productService = require('./productService');


exports.productDetail = (req, res, next) =>{
  const product_ID = req.params.productID;
  console.log(product_ID);
  const product = productService.getProduct(product_ID);
  console.log(product);
  if(product === undefined)
  {
      res.render('error');
  }
  else
  {
      res.render('user/products/detail', product);
  }
}