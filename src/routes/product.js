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

router.post('/list',upload.single('image') ,productRouter.add);
router.post('/edit/:id', upload.single('image'), productRouter.update);
router.post('/image', upload.single('imageProduct'),productRouter.addImage);
router.get('/edit/:id', productRouter.showProduct);
router.get('/list/delete/:id', productRouter.delete);
router.get('/image', productRouter.viewAddImage);
router.get('/list', productRouter.showList);    

module.exports = router;