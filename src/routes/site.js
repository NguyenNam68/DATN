const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');
const authMiddleware = require('../app/Authentication/Auth');

router.post('/role', authMiddleware.requireAuth, siteController.roleAdd);
router.get('/admin', authMiddleware.requireAuth, siteController.admin);
router.get('/role', authMiddleware.requireAuth, siteController.role);
router.get('/cart', siteController.showCart);
router.post('/payment', siteController.payment);
router.get('/payment', siteController.showPayment);
router.get('/success', siteController.showSuccess);
router.get('/introduce', siteController.showIntroduce);
router.get('/post/:id', siteController.showPost);
router.get('/blog/search', siteController.showBlogSearch);
router.get('/blog', siteController.showBlog);
router.get('/product-category/search', siteController.showProductSearch);
router.get('/product-category/:id' ,siteController.showProductCategory);
router.get('/detail/:id', siteController.showProductDetail);
router.get('/', siteController.index);

module.exports = router;