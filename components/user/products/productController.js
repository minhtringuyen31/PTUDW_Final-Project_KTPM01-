const productService = require('./productService');


// exports.allProductList = async (req, res) => {
//   const inputPage = req.query.curpage;
//   const isChangedPage = req.query.ischangepage;
//   if (isChangedPage == '0') {
//     const [pageObject, products] = await productService.getAllProductList();
//     console.log(products);
//     const result = 
//     {
//       pageobject: pageObject,
//       products: products
//     };
//     res.render('user/products/list', {result, layout: 'layout.hbs' });
//   }
//   else if (req.query.changepage == '1') {
//     console.log(inputPage);
//     const received = productService.getProductCurrentPage(inputPage);
//     console.log('current page:');
//     console.log(received[1]);
//     const result = 
//     {
//       pageobject: received[0],
//       products: received[1]
//     };
//     return result;
//   }
//   else
//   {
//     res.render('error');
//   }

// }



exports.allProductList = async (req, res) => {
  
  let received;
  let originalUrl = req.baseUrl + req.url;

  if(Object.keys(req.query).length != 0)
  {
    originalUrl = originalUrl + "&";
    received = await productService.filter(req.query);
  }
  else
  {
    originalUrl = originalUrl + "?";
    received = await productService.getAllProductList();
  }
  const result = {
    pageobject: received[0],
    products: received[1]
  }
  if(originalUrl.includes("sort"))
  {
    let start = originalUrl.indexOf("sort");
    originalUrl = originalUrl.replace(originalUrl.substring(start),"");
  }
  console.log(originalUrl);
  res.render('user/products/list', {result, originalUrl, layout: 'layout.hbs' });
}

exports.productDetail = async (req, res, next) => {
  const inputQuery = req.query;
  const receiveResult = await productService.getProduct(inputQuery.idprod, inputQuery.type);

  const mainProduct = receiveResult[0];
  const relativeProducts = receiveResult[1];
  console.log(mainProduct);
  console.log(relativeProducts);
  if (receiveResult[0] === undefined) {
    res.render('error');
  }
  else {
    res.render('user/products/detail', { mainProduct, relativeProducts, layout: 'layout.hbs' });
  }
}

// exports.getCurrentPageProduct = (req, res) => {
//   const inputPage = req.query.curpage;
//   console.log('curpage:');
//   if (req.query.changepage == '1') {
//     console.log(inputPage);
//     const result = productService.getProductCurrentPage(inputPage);
//     console.log('current page:');
//     console.log(res);
//     return result;
//   }
// }