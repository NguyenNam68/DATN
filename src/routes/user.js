const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const connection = require('../app/database/connection')
// const authMiddleware = require('../app/controllers/AuthMiddle');
const session = require('express-session');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.use('/login', userController.showLogin);
router.use('/register', userController.showRegister);
// router.use('/logout', authMiddleware.loggedin, userController.logout);
// router.use('/myaccount', userController.showAccount ,authMiddleware.loggedin);

module.exports =router;