const express = require('express');
const router = express.Router();
const orderRouter = require('../app/controllers/OrderController');

router.get('/list', orderRouter.showList);

module.exports = router;