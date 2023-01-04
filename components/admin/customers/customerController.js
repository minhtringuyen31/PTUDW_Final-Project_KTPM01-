const accountService = require('./customerService.js');
const DEFAULT_CUSTOMER_ONE_PAGE = Number(6);


exports.getProductList = async(req,res) =>{
    let orderList = await accountService.getAll();
    
    console.log(orderList);
    res.render('admin/customers/orders',{layout: "layoutAdmin", orderList}); 
}

exports.getCustomerListByPage = async(req, res) =>
{
    const inputPage = Number(req.query.page);
    console.log("page: " + inputPage);
    const listAccounts = await accountService.getCustomers_inPage(inputPage);
    const totalAccount = await accountService.count();
    console.log(totalAccount);
    let pageArray = [];
    const maxPage = Number((totalAccount - (totalAccount % DEFAULT_CUSTOMER_ONE_PAGE)) / DEFAULT_CUSTOMER_ONE_PAGE);
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

    res.json({listAccounts, pageObject});
}

