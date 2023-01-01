let Cart = require('../models/Cart');
let CustomerService = require('../models/CustomerService');

module.exports = async function (req, res, next) {
	if (req.user) {
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
