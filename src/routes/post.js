const express = require('express');
const router = express.Router();
const postRouter = require('../app/controllers/PostController');

router.post('/add', postRouter.addPost);
router.get('/list', postRouter.showList);
router.get('/add', postRouter.showAdd);

module.exports = router;