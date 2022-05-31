const express = require('express');
const router = express.Router();
const cartRouter = require('../app/controllers/CartController.js');

router.get('/cart', cartRouter.showCart);

module.exports = router;