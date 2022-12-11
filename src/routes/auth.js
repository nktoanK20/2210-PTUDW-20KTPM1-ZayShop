const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.get('/register', authController.showRegister);
router.get('/forgot-password', authController.showForgotPassword);
router.get('/login', authController.showLogin);

module.exports = router;
