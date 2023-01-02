const CustomerService = require('../models/CustomerService');
const OrderService = require('../models/OrderService');
const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');

class MeController {
	//[GET] /profile
	showProfileSettings(req, res, next) {
		let message = req.query.message === '' ? '' : req.query.message;
		res.render('me/profile', { user: req.user, message: message });
	}

	//[PUT] /profile
	async updateProfileSettings(req, res, next) {
		let data = req.body;
		data.address = {
			address: req.body.address,
			country: req.body.country,
			city: req.body.city,
			postcode: req.body.postcode,
		};
		if (!data.avatar) {
			data.avatar =
				'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';
		}

		CustomerService.updateOne(req.user._id, data)
			.then(() => {
				res.redirect('/me/profile?message=Profile updated!');
			})
			.catch(next);
	}

	//[GET] /account
	showAccountSettings(req, res, next) {
		let errorMessages = req.flash('error');
		res.render('me/account', {
			user: req.user,
			errorMessages: errorMessages,
			message: req.query.message,
		});
	}

	//[PUT] /account
	async updateAccountSettings(req, res, next) {
		if (!bcrypt.compareSync(req.body.oldPassword, req.user.password)) {
			req.flash('error', 'Old password does not match!');
			res.redirect('/me/account');
		} else if (!req.body.newPassword || req.body.newPassword.length < 6) {
			req.flash('error', 'New password must have at least 6 characters!');
			res.redirect('/me/account');
		} else if (req.body.newPassword != req.body.confirmNewPassword) {
			req.flash('error', 'New password does not match!');
			res.redirect('/me/account');
		} else {
			let customer = new Customer();
			req.user.password = customer.encryptPassword(req.body.newPassword);
			await CustomerService.updateOne(req.user._id, {
				password: customer.encryptPassword(req.body.newPassword),
			});
			res.redirect('/me/account?message=Change Password Successful');
		}
	}

	// [GET] /oder-detail/:id
	async showOrderDetail(req, res, next) {
		let order = await OrderService.getOne('_id', req.params.id);
		res.render('me/order-detail', {
			order,
			totalItems: Object.keys(order.items).length,
		});
	}

	// [GET] /orders
	async showOrders(req, res, next) {
		let orders = await OrderService.get(req.user._id);
		let message = req.query.message;
		res.render('me/orders', {
			orders,
			message,
		});
	}
}

module.exports = new MeController();
