const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const CustomerService = require('../../app/models/CustomerService');

function initialize(passport) {
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
			if (await bcrypt.compare(password, user.password)) {
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
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			authenticateUsers,
		),
	);
	passport.serializeUser((user, done) => done(null, user._id));
	passport.deserializeUser((_id, done) => {
		CustomerService.getOne(_id, null).then((user) => done(null, user));
	});
}

module.exports = initialize;
