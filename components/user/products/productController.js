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
  let pagingUrl = req.baseUrl + req.url;
  console.log("input Url: " + originalUrl);
  console.log("input pagingUrl: " + pagingUrl);
  // if (Object.keys(req.query).length != 0) {
  if (req.query.keyword || req.query.type || req.query.price || req.query.sort) {
    originalUrl = originalUrl + "&";
    received = await productService.filter(req.query);
  }
  else { //first time access the product page, the url only includes /list?_page=0
    // originalUrl = originalUrl + "&";
    received = await productService.getAllProductList(req.query);
    let start = originalUrl.indexOf("_page");
    originalUrl = originalUrl.replace(originalUrl.substring(start), "");
    start = pagingUrl.indexOf("_page");
    pagingUrl = pagingUrl.replace(pagingUrl.substring(start), "");
  }

  
  if (originalUrl.includes("sort")) { // the index of sort=... constraint is always smaller than the index of _page=... constraint.
    let start = originalUrl.indexOf("sort");
    originalUrl = originalUrl.replace(originalUrl.substring(start), "");
  }
  if (originalUrl.includes("_page")) { // the index of sort=... constraint is always smaller than the index of _page=... constraint.
    let start = originalUrl.indexOf("_page");
    originalUrl = originalUrl.replace(originalUrl.substring(start), "");
  }

  if(pagingUrl.includes("_page"))
  {
    let start = pagingUrl.indexOf("_page");
    pagingUrl = pagingUrl.replace(pagingUrl.substring(start), "");
  }
  
  const result = {
    pageobject: received[0],
    products: received[1]
  }

  console.log("output Url:" + originalUrl); 
  console.log("output pagingUrl: " + pagingUrl);
  res.render('user/products/list', { result, originalUrl, pagingUrl, layout: 'layout.hbs' });
}


exports.productDetail = async (req, res, next) => {
  const inputQuery = req.query;
  const receiveResult = await productService.getProductDetail(inputQuery.idprod, inputQuery.type);

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


exports.getProductOfPage = (req, res, next) =>
{
  console.log("get product of page");
  console.log(req.query);
  if(req.query._page)
  {
    return productService.getProductOfPage(req.query._page)
  }
  else
  {
    next;
  }
} 