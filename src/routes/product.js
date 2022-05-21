const express = require('express');
const router = express.Router();
const productRouter = require('../app/controllers/ProductController');
const multer = require('multer');
var storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, 'src/public/image/Product');
    },
    filename : (req, file, callback) => {
        callback(null, file.originalname);
    }
});
const upload = multer({
    storage: storage
});

router.post('/product/list',upload.single('image') ,productRouter.add);
router.get('/product/list/delete/:id', productRouter.delete);
router.get('/product/list', productRouter.showList);

module.exports = router;