const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const authMiddleware = require('../app/Authentication/Auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.use('/logout', userController.logout);
router.use('/login', userController.showLogin);
router.use('/register', userController.showRegister);
router.get('/admin/user/list', authMiddleware.requireAuth, userController.showList);


module.exports =router;