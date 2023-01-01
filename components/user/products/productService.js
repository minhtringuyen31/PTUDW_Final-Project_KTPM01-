const connection = require('../../connectDB');
// const { productDetail } = require('./productController');

let DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE = Number(6);
let maxPage = Number(0);
let currentPage = Number(1);
let productList = [];
let currentType = undefined;
let currentPrice = undefined;
let currentKeyword = undefined;
let currentSort = undefined;
let currentMode = 0; //filter is not used


exports.getProductList = async (_productType) => {

};

exports.getAllProductList = async (inputQuery) => {

    if(productList.length > 0 && currentMode == 0) // the user want to change other pages
    {
        console.log("get product by old List");
        return getProductOfPage(Number(inputQuery._page));
    }

    //Query a new product list
    const poolPromise = connection.promise();
    const [rows, fields] = await poolPromise.query('SELECT product.idProduct, product.productName, productImage, productType, productPrice FROM product');
    
    productList = rows;

    let pageArray = [];
    let productListToShow = [];
    maxPage = Number((productList.length - (productList.length % DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE)) / DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE);

    if(maxPage>=3){
        if(currentPage>1 && currentPage< maxPage+1)
        for (let i = currentPage-1; i <= currentPage+1; i++) {
            pageArray.push(Number(i));

        }
        else if(currentPage==1) pageArray = [1,2,3];
        else pageArray = [maxPage-1,maxPage,maxPage+1];
    }
    else {
        for(let i=0;i<=maxPage;i++)
            pageArray.push(Number(i+1));
    }
    for (let i = 0; i < DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE; i++) {
        productListToShow.push(productList[i]);
    }

    currentPage = Number(1);
    let nextPage = Number(2);
    let prevPage = Number(1);

    const pageObject = {
        ischangepage: false,
        pagearray: pageArray,
        maxpage: maxPage,
        currentpage: String(currentPage),
        nextpage: String(nextPage),
        prevpage: String(prevPage),
        defaultnumberpage: DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE,
    };

    currentMode = 0;
    currentKeyword = inputQuery.keyword;
    currentPrice = inputQuery.price;
    currentSort = inputQuery.sort;
    currentType = inputQuery.type;

    console.log(pageObject);
    console.log("productList to show" );
    console.log(productListToShow);
    return [pageObject, productListToShow];
};

//Ajax for changing pages /////////////////////////////////////////

/**
 * @param _page
 * @returns {pageObject,ProductList}
 */
getProductOfPage = (_page) => {
    console.log("_page in #" + _page);
    currentPage=_page;
    _page=_page-1;
    if (_page < 0) {
        _page = Number(0);
    }
    else if (_page > maxPage) {
        _page = Number(maxPage);
    }
    let limit = Number(DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE * (_page + 1));
    console.log("limit" + limit);
    let pageArray = []
    let productListToShow = [];
    if (limit > productList.length) {
        limit = Number(productList.length);
    }

    if(maxPage>=3){
        if(currentPage>1 && currentPage< maxPage+1)
        {   
            console.log('current: '+ currentPage)
            for (let i = currentPage-1; i <= currentPage+1; i++) {
                pageArray.push(Number(i));
                
            }
            console.log(pageArray)
        }
        
        else if(currentPage==1) pageArray = [1,2,3];
        else pageArray = [maxPage-1,maxPage,maxPage+1];
        //maxPage = maxPage + 1;
    }
    else {
        for(let i=0;i<=maxPage;i++)
            pageArray.push(Number(i+1));
    }

    for (let i = _page * DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE; i < limit; i++) {
        productListToShow.push(productList[i]);
    }


     
    let nextPage = (currentPage  > maxPage)? maxPage+1: Number(currentPage + 1);
    let prevPage = currentPage - 1 < 1 ? 1 : Number(currentPage - 1);

    const pageObject = {
        ischangepage: true,
        pagearray: pageArray,
        maxpage: maxPage,
        currentpage: String(currentPage),
        nextpage: String(nextPage),
        prevpage: String(prevPage),
        defaultnumberpage: DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE,
    };
   
    console.log(pageObject);
    console.log("productList to show" );
    console.log(productListToShow);

    return [pageObject, productListToShow];
 
}

///////////////////////////////////////////////////////////////////

exports.getProductDetail = async (_productID, _productType) => {
    const poolPromise = connection.promise();
    if (productList.length == 0 || currentType != _productType) {
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



exports.filter = async (inputQuery) => {

    if(productList.length > 0 && (inputQuery.keyword === currentKeyword && inputQuery.type === currentType && inputQuery.price === currentPrice && inputQuery.sort === currentSort)) // the user want to change other pages
    {
        console.log("get filter from old product list");
        return getProductOfPage(Number(inputQuery._page));
    }

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

    
    const poolPromise = connection.promise();
    const result = await poolPromise.query(queryString, queryPara);
    productList = result[0];
    maxPage = (productList.length - (productList.length % DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE)) / DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE;
    let pageArray = [];
    let productListToShow = [];
    
    if(maxPage>=3){
        if(currentPage>1 && currentPage< maxPage+1)
        for (let i = currentPage-1; i <= currentPage+1; i++) {
            pageArray.push(Number(i));

        }
        else if(currentPage==1) pageArray = [1,2,3];
        else pageArray = [maxPage-1,maxPage,maxPage+1];
    }
    else {
        for(let i=0;i<=maxPage;i++)
            pageArray.push(Number(i+1));
    }

    for (let i = 0; i < DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE; i++) {
        productListToShow.push(productList[i]);
    }
    currentPage = 0;
    currentMode = 1;
    currentKeyword = inputQuery.keyword;
    currentPrice = inputQuery.price;
    currentSort = inputQuery.sort;
    currentType = inputQuery.type;

    let nextPage = 2;
    let prevPage = 1;

    const pageObject = {
        ischangepage: false,
        pagearray: pageArray,
        maxpage: maxPage,
        currentpage: String(currentPage),
        nextpage: String(nextPage),
        prevpage: String(prevPage),
        defaultnumberpage: DEFAULT_PRODUCT_IN_LIST_PRODUCT_PAGE,
    };

    console.log(pageObject);
    console.log("productList to show" );
    console.log(productListToShow);

    return [pageObject, productListToShow];
}