const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.use('/admin', siteController.admin);
router.post('/role', siteController.roleAdd);
router.use('/role', siteController.role);
router.use('/product-category/search', siteController.showProductSearch);
router.use('/product-category/:id', siteController.showProductCategory);
router.use('/', siteController.index);

module.exports = router;