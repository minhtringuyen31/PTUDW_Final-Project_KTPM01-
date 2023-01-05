const express = require('express');
const router = express.Router();
const productController = require('./productController')
const multer = require('multer');
const path = require('path');
const e = require('express');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/images/product/')
  },
  filename: (req, file, cb) => {
      console.log(file)
      cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage }).array('files',12);

  router.get('/', productController.getAll);

  router.get('/list', productController.getProductByPage);
  router.get('/add', function(req, res) {
    //throw new Error('Unknown error!');
    res.render('admin/products/add', {layout: "layoutAdmin"});
  });
  router.post('/list',upload,productController.add)
  router.get('/update/:productId', function(req, res) {
    if(!req.user)
    {
        res.redirect('/auth/login');
    }
    else
    {
    res.render('admin/products/list', {layout: "layoutAdmin"});
    }
  });
  
  router.get('/editproduct/:idProduct', productController.edit)
  router.post('/editproduct/:idProduct', productController.save)

  router.get('/remove/:idProduct', productController.remove)


  module.exports=router;