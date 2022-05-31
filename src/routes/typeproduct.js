const express = require('express');
const router = express.Router();
const typeproductController = require('../app/controllers/TypeController');

router.post('/list', typeproductController.add);
router.post('/edit/:id', typeproductController.update);
router.use('/edit/:id', typeproductController.viewEdit);
router.use('/list/delete/:id', typeproductController.delete);
router.use('/list', typeproductController.type);

module.exports = router;