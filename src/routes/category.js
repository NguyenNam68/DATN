const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/CategoryController');

router.post('/category/list', categoryController.add);
router.post('/category/edit/:id', categoryController.update);
router.use('/category/edit/:id', categoryController.viewEdit);
router.use('/category/list/delete/:id', categoryController.delete);
router.use('/category/list', categoryController.category);

module.exports = router;