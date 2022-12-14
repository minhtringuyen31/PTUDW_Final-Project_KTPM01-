const express = require('express');
const router = express.Router();
const controller = require('./cartController');
const auth = require('../../auth/authController');


router.get('/cart-detail', /**auth.isLogIn */ controller.cartDetail);
router.get('/', controller.showCart);

router.get('/add-to-cart/:idProduct', controller.addToCart)

router.get('/remove/:idProduct', controller.removeFromCart);

router.get('/checkout', controller.showCheckOut)

router.get('/momo', controller.showPaymentWithMomo);

router.post('/checkout', controller.addOrder);

module.exports = router;
