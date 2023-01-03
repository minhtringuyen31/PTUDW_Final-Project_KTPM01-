const connection = require('../../connectDB');


/**
 * 
 * @param {userPhone} 
 * @returns {Promise<true|false|undefined>}
 */
exports.hasCart = async(userPhone) =>
{
    try
    {
        const poolPromise = connection.promise();
        const res = await poolPromise.query('SELECT product_in_cart.quantity FROM product_in_cart WHERE product_in_cart.idCart = ? LIMIT 1',[userPhone], function(err)
        {
            if(err)
            {
                return null;
            }
        });
        if(res[0].length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    catch(e)
    {
        console.log(e);
        return null;
    }
    
}

exports.createCart = async(userPhone) =>
{
    try
    {
        const poolPromise = connection.promise();
        await poolPromise.query('INSERT INTO cart (idCart) VALUES (?);',[userPhone], function(err)
        {
            if(err)
            {
                console.log("Error in createCart 1")
                return null;
            }
        });
    }
    catch(e)
    {
        console.log("Error in createCart 2")
        return null;
    }
}

exports.addProductToCart = async(userPhone, idProduct) =>
{
    try
    {
        const poolPromise = connection.promise();
        await poolPromise.query('INSERT INTO product_in_cart (idCart, idProduct, quantity) VALUES (?,?,1)', [userPhone, idProduct], function(err)
        {
            if(err)
            {
                return false;
            }
        });
        return true;
    }
    catch(e)
    { 
        return false;
    }  
}

exports.hasProduct = async(userPhone, idProduct) =>
{
    try
    {
        const poolPromise = connection.promise();
        const res = await poolPromise.query('SELECT product_in_cart.quantity FROM product_in_cart WHERE product_in_cart.idCart = ? AND product_in_cart.idProduct = ? LIMIT 1',[userPhone, idProduct], function(err)
        {
            if(err)
            {
                return null;
            }
        })
        if(res[0].length > 0)
        {   
            return res[0][0].quantity;
        }
        else
        {
            return -1;
        }
    }
    catch(e)
    {
        return null;
    }
}

exports.updateQuantity = async(userPhone, idProduct, newQuantity) => 
{
    try
    {
        const poolPromise = connection.promise();
        await poolPromise.query('UPDATE product_in_cart SET product_in_cart.quantity = ? WHERE product_in_cart.idCart = ? AND product_in_cart.idProduct = ?',[newQuantity, userPhone, idProduct], function(err)
        {
            if(err)
            {
                return false;
            }
        })
        return true;
    }
    catch(e)
    {
        return false;
        
    }
}

exports.removeCart = async(userPhone) =>
{
    try
    {
        const poolPromise = connection.promise();
        await poolPromise.query('DELETE FROM cart WHERE cart.idCart = ?',[userPhone], function(err)
        {
            if(err)
            {
                return false;
            }
        });
        return true;
    }
    catch(e)
    {
        return false;
    }
}

exports.removeProductInCart = async(userPhone, idProduct) =>
{
    try
    {
        const poolPromise = connection.promise();
        await poolPromise.query('DELETE FROM product_in_cart WHERE product_in_cart.idCart = ? AND product_in_cart.idProduct = ?',[userPhone, idProduct], function(err)
        {
            if(err)
            {
                return false;
            }
        });
        return true;
    }
    catch(e)
    {
        console.log(e);
        return false;
    }
}


exports.getCartDetail = async(usePhone) =>
{
    try
    {
        const poolPromise = connection.promise();
        const res = await poolPromise.query('SELECT product.idProduct, product.productName , productPrice, quantity, product.productImage, productPrice*quantity AS "total"\
        FROM useraccount JOIN product_in_cart ON (useraccount.userPhone = product_in_cart.idCart)\
        JOIN product ON (product_in_cart.idProduct = product.idProduct)')
        return res[0];
    }
    catch(e)
    {
        console.log(e)
    }
}