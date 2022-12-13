const Customer = require('../models/Customer');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
	//[GET] /settings
	showSettings(req, res, next) {
		res.render('me/settings', { user: req.user });
	}

	//[PUT] /settings
	updateSettings(req, res, next) {
		res.render('me/settings', { user: req.user });
	}

	//[GET] /
	showProfile(req, res, next) {
		console.log(req.query);
		let message = req.query.message === '' ? '' : req.query.message;
		res.render('me/index', { user: req.user, message: message });
	}

	//[PUT] /
	updateProfile(req, res, next) {
		Customer.updateOne({ _id: req.user._id }, req.body)
			.then(() => {
				res.redirect('/me?message=Profile updated!');
			})
			.catch(next);
	}
}

module.exports = new MeController();
