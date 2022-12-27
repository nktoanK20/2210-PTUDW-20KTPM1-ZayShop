const CustomerService = require('../models/CustomerService');

class AuthController {
	// [GET] /register
	showRegister(req, res, next) {
		var messages = req.flash('error');
		res.render('auth/register', {
			layout: 'auth',
			messages: messages,
			hasErrors: messages.length > 0,
		});
	}

	// [GET] /forgot-password
	showForgotPassword(req, res, next) {
		res.render('auth/forgot-password', { layout: 'auth' });
	}

	// [GET] /login
	showLogin(req, res, next) {
		var messages = req.flash('error');
		res.render('auth/login', {
			layout: 'auth',
			messages: messages,
			hasErrors: messages.length > 0,
		});
	}
}

module.exports = new AuthController();
