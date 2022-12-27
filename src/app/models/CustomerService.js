const Customer = require('../models/Customer');
const {
	mongooseToObject,
	multipleMongooseToObject,
} = require('../../util/mongoose');

class CustomerService {
	getOne(_id, email) {
		if (_id) {
			return Customer.findById(_id).then((user) => {
				return mongooseToObject(user);
			});
		} else if (email) {
			return Customer.findOne({ email: email }).then((user) => {
				return mongooseToObject(user);
			});
		}
	}

	save(data) {
		const customer = new Customer(data);
		customer.password = customer.encryptPassword(data.password);
		return customer.save();
	}

	updateOne(_id, data) {
		return Customer.updateOne({ _id: _id }, data);
	}
}

module.exports = new CustomerService();
