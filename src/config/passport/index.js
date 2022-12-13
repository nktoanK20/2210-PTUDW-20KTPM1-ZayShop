const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Customer = require('../../app/models/Customer');
const { mongooseToObject } = require('../../util/mongoose');

function initialize(passport) {
	// function to authenticate users
	const authenticateUsers = async (email, password, done) => {
		//get users by email
		const user = await Customer.findOne({ email: email });
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
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => {
		Customer.findById(id).then((user) =>
			done(null, mongooseToObject(user)),
		);
	});
}

module.exports = initialize;
