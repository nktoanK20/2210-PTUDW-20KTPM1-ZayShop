const CustomerService = require('../models/CustomerService');
const bcrypt = require('bcrypt');

class AuthController {
	// [GET] /register
	showRegister(req, res, next) {
		res.render('auth/register', { layout: 'auth' });
	}

	// [POST] /register
	async handleRegister(req, res, next) {
		try {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			req.body.password = hashedPassword;
			await CustomerService.save(req.body);
			res.redirect('/auth/login');
		} catch (err) {
			console.log(err);
			res.redirect('/auth/register');
		}
	}

	// [GET] /forgot-password
	showForgotPassword(req, res, next) {
		res.render('auth/forgot-password', { layout: 'auth' });
	}

	// [GET] /login
	showLogin(req, res, next) {
		res.render('auth/login', { layout: 'auth' });
	}

	// [POST] /login
	// handleLogin(req, res, next) {
	// 	next();
	// }
}

module.exports = new AuthController();
