const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const CustomerService = require('../../app/models/CustomerService');
const { body, validationResult } = require('express-validator');

function initialize(passport) {
	// function to check registration
	const checkRegistration = async (req, email, password, done) => {
		var errors = validationResult(req).errors;
		if (errors.length > 0) {
			var messages = [];
			errors.forEach(function (error) {
				messages.push(error.msg);
			});
			return done(null, false, req.flash('error', messages));
		}

		//get users by email
		const user = await CustomerService.getOne(null, email);
		if (user) {
			return done(null, false, {
				message: 'Email is already in use.',
			});
		}
		try {
			newUser = await CustomerService.save(req.body);
			return done(null, newUser);
		} catch (err) {
			return done(err);
		}
	};

	// function to authenticate users
	const authenticateUsers = async (email, password, done) => {
		//get users by email
		const user = await CustomerService.getOne(null, email);
		if (!user) {
			return done(null, false, {
				message: 'No user found with that email.',
			});
		}
		try {
			if (bcrypt.compareSync(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, { message: 'Password Incorrect.' });
			}
		} catch (error) {
			console.log(error);
			return done(error);
		}
	};

	passport.use(
		'local.signup',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true,
			},
			checkRegistration,
		),
	);

	passport.use(
		'local.signin',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			authenticateUsers,
		),
	);

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});
	passport.deserializeUser((_id, done) => {
		CustomerService.getOne(_id, null).then((user) => {
			done(null, user);
		});
	});
}

module.exports = initialize;
