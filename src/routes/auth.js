const express = require('express');
const router = express.Router();
const passport = require('passport');
const initializePassport = require('../config/passport');
const { body, validationResult } = require('express-validator');

const authController = require('../app/controllers/AuthController');

initializePassport(passport);
function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

function checkNotAuthenticated(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

router.get('*', checkNotAuthenticated);
router.post('*', checkNotAuthenticated);

router.get('/register', authController.showRegister);
router.post(
	'/register',
	body('email', 'Email is invalid.').isEmail(),
	body('password', 'Password must contain at least 6 characters').isLength({
		min: 6,
	}),
	passport.authenticate('local.signup', {
		successRedirect: '/',
		failureRedirect: '/auth/register',
		failureFlash: true,
	}),
);
router.get('/forgot-password', authController.showForgotPassword);
router.get('/login', authController.showLogin);
router.post(
	'/login',
	passport.authenticate('local.signin', {
		successRedirect: '/',
		failureRedirect: '/auth/login',
		failureFlash: true,
	}),
);

router.delete('/logout', checkAuthenticated, (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});

module.exports = router;
