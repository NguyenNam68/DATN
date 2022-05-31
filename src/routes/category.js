const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/CategoryController');

router.post('/list', categoryController.add);
router.post('/edit/:id', categoryController.update);
router.use('/edit/:id', categoryController.viewEdit);
router.use('/list/delete/:id', categoryController.delete);
router.use('/list', categoryController.category);

module.exports = router;