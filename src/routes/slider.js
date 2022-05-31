const express = require('express');
const router = express.Router();
const sliderController = require('../app/controllers/SliderController');
const multer = require('multer');
var storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, 'src/public/image/Slide');
    },
    filename : (req, file, callback) => {
        callback(null, file.originalname);
    }
});
const upload = multer({
    storage: storage
});

router.post('/image/:id', upload.single('imageSlide') ,sliderController.addImage);
router.post('/list', sliderController.add);
router.get('/image/:id', sliderController.viewAddImage);
router.get('/list/delete/:id', sliderController.deleteSlider);
router.get('/list', sliderController.slider);

module.exports = router;