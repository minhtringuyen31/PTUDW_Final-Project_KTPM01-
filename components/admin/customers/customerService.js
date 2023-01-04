const connection = require('../../connectDB');
const DEFAULT_CUSTOMER_ONE_PAGE = Number(6);

exports.getAll = async(req,res)=>{
    let query = 'SELECT * FROM `order`'
    const poolPromise = connection.promise();
    let orderList = await poolPromise.query(query);
    return orderList[0];
};


exports.getCustomers_inPage = async(_page) =>
{
    try
    {
        const poolPromise = connection.promise();
        const res = await poolPromise.query(`SELECT * FROM useraccount WHERE useraccount.userRole = 1 LIMIT ${DEFAULT_CUSTOMER_ONE_PAGE} offset ${(_page - 1) * DEFAULT_CUSTOMER_ONE_PAGE}`);
        console.log(res[0]);
        return res[0];
    }
    catch(e)
    {
        console.log(e);
        return [];
    }
}

exports.count = async() =>
{
    try
    {
        const poolPromise = connection.promise();
        const res = await poolPromise.query('SELECT count(*) as `number` FROM useraccount WHERE useraccount.userRole = 1');
        console.log("number: " + res[0][0].number);
        return res[0][0].number;
    }
    catch(e)
    {
        console.log(e);
        return null;
    }
}

exports.DEFAULT_CUSTOMER_ONE_PAGE;