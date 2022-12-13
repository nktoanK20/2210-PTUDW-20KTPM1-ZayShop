const express = require('express');
const router = express.Router();
const passport = require('passport');
const initializePassport = require('../config/passport');

const authController = require('../app/controllers/AuthController');
const checkAuthenticatedMiddleware = require('../app/middlewares/CheckAuthenticatedMiddleware');

initializePassport(passport);

router.get('*', checkAuthenticatedMiddleware);
router.post('*', checkAuthenticatedMiddleware);

router.get('/register', authController.showRegister);
router.post('/register', authController.handleRegister);
router.get('/forgot-password', authController.showForgotPassword);
router.get('/login', authController.showLogin);
router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/auth/login',
		failureFlash: true,
	}),
);

router.delete('/logout', (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});

module.exports = router;
