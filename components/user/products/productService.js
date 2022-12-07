const connection = require('../../connectDB');
// const { productDetail } = require('./productController');

let DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE = 6;
let maxPage = 0;
let currentPage = 0;
let productList = [];
let currentProductType = '0';



// exports.getProductList = async(_productType, _page) =>{
//     if(_page < 0)
//     {
//         _page = 0;
//     }
//     else if(_page > maxPage)
//     {
//         _page = maxPage
//     }
//     var ListMappingToPage = [];
//     let limit = DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE*(_page + 1);
//     if(limit > productList.length)
//     {
//         limit = productList.length -1;
//     }
//     if(productList.length > 0 && currentProductType == _productType) //don't have to re-query the database
//     {
//         for(let i = _page*DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE; i < limit; i++)
//         {
//             ListMappingToPage.push(productList[i]);
//         }
//     }
//     else
//     {
//         const promisePool = connection.promise();
//         const [rows, fields] = await promisePool.query('SELECT product.idProduct, product.productName, productImage, productPrice FROM product WHERE product.productType = ?', [_productType]);
//         // console.log(await promisePool.query('SELECT product.idProduct, product.productName, productImage, productPrice FROM product WHERE product.productType = ?', [_productType]));
//         console.log(rows);
//         productList = rows;
//         maxPage = (productList.length - (productList.length % DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE)) / DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE;
//         currentProductType = _productType;
//         currentPage = 0;
//         for(let i = _page*DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE; i < limit; i++)
//         {
//             ListMappingToPage.push(productList[i]);
//         }
//     }
//     return ListMappingToPage;
// }

exports.getProductList = async (_productType) => {

};

exports.getAllProductList = async () => {
    const poolPromise = connection.promise();
    const [rows, fields] = await poolPromise.query('SELECT product.idProduct, product.productName, productImage, productType, productPrice FROM product');
    
    productList = rows;
    if (productList === undefined || productList.length == 0) {
        return productList;
    }
    console.log(productList.length)
    maxPage = (productList.length - (productList.length % DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE)) / DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE;
    console.log(maxPage);
    let pageArray = [];
    let productListToShow = [];
    for (let i = 0; i <= maxPage; i++) {
        pageArray.push(i.toString());
    }
    for (let i = 0; i < DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE; i++) {
        productListToShow.push(productList[i]);
    }
    const pageObject = {
        pagearray: pageArray,
        maxpage: maxPage,
        currentpage: currentPage,
        defaultnumberpage: DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE,
    };
    //I change here
    return [pageObject, productList];
};

//Ajax for changing pages /////////////////////////////////////////

exports.getProductCurrentPage = (_page) => {
    if (_page < 0) {
        _page = 0;
    }
    else if (_page > maxPage) {
        _page = maxPage;
    }
    let limit = DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE * (_page + 1);
    let ShowProducts = [];
    if (limit > productList.length) {
        limit = productList.length;
    }
    for (let i = _page * DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE; i < limit; i++) {
        ShowProducts.push(productList[i]);
    }
    currentPage = _page;
    const pageObject = {
        pagearray: pageArray,
        maxpage: maxPage,
        currentpage: currentPage,
        defaultnumberpage: DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE,
    };
    return [pageObject, ShowProducts];

}

///////////////////////////////////////////////////////////////////

exports.getProduct = async (_productID, _productType) => {
    const poolPromise = connection.promise();
    if (productList.length == 0 || currentProductType != _productType) {
        console.log("run here");
        const res = await poolPromise.query('SELECT product.idProduct, product.productName, productImage, productType, productPrice, product.releaseDate, product.rating FROM product WHERE product.productType = ?', [_productType]);
        productList = res[0];
        currentProductType = _productType;
    }
    const [rows, fields] = await poolPromise.query(
        'SELECT product.idProduct, product.productName, product.productType, product.productImage, product.productPrice, product.releaseDate, product.rating FROM relativeproduct JOIN product ON (relativeproduct.idProduct = ? AND relativeproduct.idRelativeProduct = product.idProduct)', [_productID]);
    const relativeProducts = rows; //relative product
    const mainProduct = productList.find((product) => product.idProduct == _productID);
    return [mainProduct, relativeProducts];
}

exports.currentProductType = currentProductType;


exports.filter = async (inputQuery) => {
    let queryPara = [];
    let queryString = "SELECT product.idProduct, product.productName, product.productImage, product.productType, product.productPrice, product.releaseDate, product.rating FROM product";
    _where = " where";
    if (inputQuery.keyword) {
        queryPara.push(`%${inputQuery.keyword}%`);
        queryString = queryString + _where + " product.productName like ?";
        _where = " and ";
    }
    if (inputQuery.type && parseInt(inputQuery.type)!=10) {    
        queryPara.push(inputQuery.type);
        queryString = queryString + _where + " product.productType = ?";
        _where = " and ";
    }
    if (inputQuery.price && parseInt(inputQuery.price)!=10) {
        let _price = "";
        switch (parseInt(inputQuery.price)) {
            case 1:
                {
                    _price = " product.productPrice < 20000";
                    break;
                }
            case 2:  
                {
                    _price = " product.productPrice between 20000 and 30000";
                    break;
                }
            case 3:
                {
                    _price = " product.productPrice between 30000 and 40000";
                    break;
                }

            case 4:
                {
                    _price = " product.productPrice between 40000 and 50000";
                    break;
                }
            case 5:
                {
                    _price = " product.productPrice between 50000 and 60000";
                    break;
                }
            case 6:
                {
                    _price = " product.productPrice > 60000";
                    break;
                }
    
        }
        queryString = queryString + _where + _price;
    }
    
    if(inputQuery.sort)
    {
        let sort_type = "";
        if(inputQuery.sort == "hightolow")
        {
            sort_type = " ORDER BY product.productPrice DESC";
        }
        else if(inputQuery.sort == "lowtohigh")
        {
            sort_type = " ORDER BY product.productPrice ASC";
        } 
        else if(inputQuery.sort == "newest")
        {
            sort_type = " ORDER BY product.releaseDate DESC";
        }
        else if(inputQuery.sort == "bestrating")
        {
            sort_type = " ORDER BY product.rating DESC";
        }
        queryString = queryString + sort_type;
    }

    

    console.log(queryString);
    
    const poolPromise = connection.promise();
    const result = await poolPromise.query(queryString, queryPara);
    const pageObject = {};
    console.log(result[0][0]);

    // for(let i=0; i< result[0].length; i++) 
    // {

    //     let str = result[0][i].toString();
    //     result[0][i].releaseDate = 
    // } 

    return [pageObject, result[0]];
}