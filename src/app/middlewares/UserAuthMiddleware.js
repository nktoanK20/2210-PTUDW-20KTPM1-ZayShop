let Cart = require('../models/Cart');
let CustomerService = require('../models/CustomerService');

module.exports = async function (req, res, next) {
	if (req.user) {
		let user = await CustomerService.getOne(req.user._id, null);
		if (!user.enabled) {
			return req.logout(function (err) {
				if (err) {
					return next(err);
				}
				req.flash(
					'error',
					'Your account has been banned. Please contact admin for more information',
				);
				res.redirect('/auth/login');
			});
		}

		if (!req.session.cart) {
			req.session.cart = req.user.cart;
		}

		req.user.cart = req.session.cart;
		await CustomerService.updateOne(req.user._id, req.user);
		res.locals.user = req.user;
	}
	res.locals.session = req.session;
	next();
};
