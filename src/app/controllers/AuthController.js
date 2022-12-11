const Product = require('../models/Product');
const {
	mongooseToObject,
	multipleMongooseToObject,
} = require('../../util/mongoose');
const { response } = require('express');

class AuthController {
	// [GET] /register
	showRegister(req, res, next) {
		res.render('auth/register', { layout: 'auth' });
	}

	// [GET] /forgot-password
	showForgotPassword(req, res, next) {
		res.render('auth/forgot-password', { layout: 'auth' });
	}

	// [GET] /login
	showLogin(req, res, next) {
		res.render('auth/login', { layout: 'auth' });
	}
}

module.exports = new AuthController();
