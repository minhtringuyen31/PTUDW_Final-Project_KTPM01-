const { stringify } = require('ajv');
const connection = require('../../connectDB');

exports.getAllProducts = async() =>{
    let query = "select * from product";
    const poolPromise = connection.promise();
    let productList = await poolPromise.query(query);
    return productList[0];
}
exports.add = async(body,files) =>{
    let query = 'select count(*) as `cc` from product';
    
    const poolPromise = connection.promise();
    let count =await poolPromise.query(query);
     count=count[0][0].cc+30;
    let id ='00'+count.valueOf() ;
    
    if(files && files!=null && files.length>0){
        console.log(files[0])
    let p = files[0].path.replace("public",'');
    let addQuery = "insert into product (idProduct,productName,productType,productImage,productPrice,releaseDate) values (?,?,?,?,?,?)";
    console.log(p)
    let date = new Date();
    let addNew = await poolPromise.query(addQuery, [id,body.productName,'0',p,body.productPrice,date]);
    }
    else{
    
    let addQuery = "insert into product (idProduct,productName,productType,productPrice,releaseDate) values (?,?,?,?,?)";
    
    let date = new Date();
    let addNew = await poolPromise.query(addQuery, [id,body.productName,'0',body.productPrice,date]);
    }
    
}
exports.getProductById = async(idProduct) =>{
    let id = '';
    if(idProduct.length ==1){
        id= '000'+idProduct
    }
    else {
        id = '00'+idProduct;
    }
    let query = 'select * from product where idProduct ='+id;
    const poolPromise = connection.promise()
    let product = await poolPromise.query(query);
    return product[0][0];
}

exports.update = async(body) =>{
    let id = '';
    console.log(body)
    if(body.idProduct.length ==1){
        id= '000'+body.idProduct
    }
    else {
        id = '00'+body.idProduct;
    }
    let query = 'update product SET productName = ?, productPrice = ? where idProduct = ?'
    const poolPromise = connection.promise()
    let product = await poolPromise.query(query,[body.productName,body.productPrice,body.idProduct]);
    console.log("update")
    console.log(product)
    return product[0][0];
}
exports.remove = async(idProduct) =>{
    let id = '';
    
    if(idProduct.length ==1){
        id= '000'+idProduct;
    }
    else {
        id = '00'+idProduct;
    }
    console.log(id)
    let query = 'DELETE FROM product WHERE idProduct = ?';
    const poolPromise = connection.promise()
    let product = await poolPromise.query(query,[id]);
}