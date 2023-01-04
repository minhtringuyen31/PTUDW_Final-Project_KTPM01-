const express = require('express');
const router = express.Router();
const orderController = require('./orderController');


router.get('/', orderController.showOrders);

router.get('/:orderId', orderController.showDetail)

module.exports = router;