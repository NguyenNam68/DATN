const express = require('express');
const router = express.Router();
const typeproductController = require('../app/controllers/TypeController');

router.post('/type/list', typeproductController.add);
router.post('/type/edit/:id', typeproductController.update);
router.use('/type/edit/:id', typeproductController.viewEdit);
router.use('/type/list/delete/:id', typeproductController.delete);
router.use('/type/list', typeproductController.type);

module.exports = router;