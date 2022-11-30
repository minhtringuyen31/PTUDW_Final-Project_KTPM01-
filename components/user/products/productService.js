const {productList} = require('./productDatasource.js')

exports.getProduct = (_productID) =>{
    return productList.find((product) => product.product_ID == _productID);
}